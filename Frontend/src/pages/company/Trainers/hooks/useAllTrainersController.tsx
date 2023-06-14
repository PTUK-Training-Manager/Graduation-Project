import React, { useEffect, useState, SyntheticEvent } from 'react';
import { getTrainers, addTrainerRequest, getField } from '../api';
import { IconButton } from '@mui/material';
import { Feed } from '@mui/icons-material';
import { progressForm } from 'src/api/progress';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
import { useFormik } from 'formik';
import { INITIAL_FORM_STATE } from '../constants';
import { validationSchema } from '../schema';
import useSnackbar from 'src/hooks/useSnackbar';
import { AxiosBaseError } from 'src/types';
import extractErrorMessage from 'src/utils/extractErrorMessage';
import { FieldData, TrainersData } from '../api/response.dto';

export interface UseDataGridPlaygroundAPIProps {
  pagination?: PageChangeParams;
}

const useAllTrainersController = ({
  pagination,
}: UseDataGridPlaygroundAPIProps) => {
  const [totalRows, setTotalRows] = useState<number>(0);
  const [fieldOptions, setFieldOptions] = useState<FieldData[]>([]);

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
    ['users', pagination],
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
    rows: data ?? [],
    fieldOptions,
  };
};
export default useAllTrainersController;
