import React, { useEffect, useState, SyntheticEvent } from 'react';
import { getTrainers, getField } from '../api';
import { IconButton } from '@mui/material';
import { Feed } from '@mui/icons-material';
import { progressForm } from 'src/api/progress';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
import { useFormik } from 'formik';
import { INITIAL_FORM_STATE } from '../constants';
import { validationSchema } from '../schema';
import useSnackbar from 'src/hooks/useSnackbar';
import { AxiosBaseError } from 'src/types';
import extractErrorMessage from 'src/utils/extractErrorMessage';
import { FieldData, TrainersData } from '../api/response.dto';
import { addTrainerRequest } from '../api';

const AddTrainerQueryKey = ['addTrainerRequest'];

export interface UseDataGridPlaygroundAPIProps {
  pagination?: PageChangeParams;
}

const useAllTrainersController = ({
  pagination,
}: UseDataGridPlaygroundAPIProps) => {
  const [totalRows, setTotalRows] = useState<number>(0);
  const [fieldOptions, setFieldOptions] = useState<FieldData[]>([]);
  const { showSnackbar } = useSnackbar();

  const formikProps = useFormik({
    initialValues: INITIAL_FORM_STATE,
    onSubmit: (values, { resetForm }) => {
      mutate(values);
      resetForm();
    },
    validationSchema,
    validateOnMount: true,
  });
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(AddTrainerQueryKey, addTrainerRequest, {
    onSuccess: async (data) => {
      console.log(data.data);
      if (data.success === true) {
        showSnackbar({ severity: 'success', message: data.message });
        getTrainers({page: pagination?.pageIndex, size: pagination?.pageSize})
          .then((result) => {
            const res= queryClient.getQueryData( ['trainers']) as TrainersData[] ;
            queryClient.setQueryData( ['trainers'],res);            console.log(result.data);
          })
          .catch((error) => console.log(error));

        console.log(data.data);
      } else if (data.success === false) {
        showSnackbar({
          severity: 'warning',
          message:
            'The Traier has been added successfully. Login credentials have been sent to the provided email.',
        });
      }
    },
    onError: (error: AxiosBaseError) => {
      const errorMessage = extractErrorMessage(error);
      showSnackbar({
        severity: 'error',
        message: errorMessage ?? 'Error in Adding Company',
      });
    },
  });
  useEffect(() => {
    getField().then((res) => {
      if (res.success) {
        console.log(res.data);
        const options = res.data.map((field) => ({
          id: field.id,
          fieldId: field.Field.id,
          companyId: field.Field.field,
          Field: field.Field,
        })) as FieldData[];
        setFieldOptions(options);
        console.log(fieldOptions);
      }
    });
  }, []);
  const { data } = useQuery(
    ['trainers'],
    () =>
      getTrainers({
        page: pagination?.pageIndex,
        size: pagination?.pageSize,
      }).then((res) => {
        setTotalRows(res?.headers['x-total-count'] ?? 0);
        return res?.data.items ?? [];
      }),
    {
      keepPreviousData: true, //for a smooth transition between the pages in the table.
    }
  );
  return {
    trainerRows: data ?? [],
    fieldOptions,
    formikProps,
    isLoading,
  };
};
export default useAllTrainersController;
