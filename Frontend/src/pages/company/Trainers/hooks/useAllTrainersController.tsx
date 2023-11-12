import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { INITIAL_FORM_STATE } from '../constants';
import { validationSchema } from '../schema';
import useSnackbar from 'src/hooks/useSnackbar';
import { AxiosBaseError } from 'src/types';
import extractErrorMessage from 'src/utils/extractErrorMessage';
import { FieldData, TrainersData } from '../api/types';
import { useQuery } from '@tanstack/react-query';
import { getTrainers, getField, addTrainerRequest } from '../api/index';
import UsersDataGrid from 'src/pages/DataGridPaginatedPlayground/definition';
import { useState } from 'react';
import { DataGridFetchQuery } from 'src/components/DataGridTanstack/types';
const AddTrainerQueryKey = ['addTrainerRequest'];

const useAllTrainersController = () => {
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

  const { mutate, isLoading } = useMutation(
    AddTrainerQueryKey,
    addTrainerRequest,
    {
      onSuccess: async (data) => {
        console.log(data.data);
        if (data.success === true) {
          showSnackbar({ severity: 'success', message: data.message });
          getTrainers({ pageIndex, pageSize })
            .then((result) => {
              const res = queryClient.getQueryData([
                'Trainers',
              ]) as TrainersData[];
              queryClient.setQueryData(['Trainers'], res);
              queryClient.invalidateQueries(["Trainers"]);
              console.log(result.items);
            })
            .catch((error) => console.log(error));

          console.log(data.data);
        } else if (data.success === false) {
          showSnackbar({
            severity: 'warning',
            message: data.message,
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
    }
  );
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

  const { pageSize: initialPageSize } = UsersDataGrid.configs;
  const [pagination, setPagination] = useState<DataGridFetchQuery>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  const { pageIndex, pageSize } = pagination;

  const { data, isLoading: loading , isFetching } = useQuery(
    ['Trainers', pageIndex, pageSize],
    () => getTrainers({ pageIndex, pageSize }),
    {}
  );

  const onGetDataGrid = (query: DataGridFetchQuery) => setPagination(query);

  return {
    fieldOptions,
    formikProps,
    isLoading,
    rows: data?.items ?? [],
    totalRows: data?.totalItems ?? -1,
    onGetDataGrid,
    isFetching: isFetching || loading,
  };
};
export default useAllTrainersController;
