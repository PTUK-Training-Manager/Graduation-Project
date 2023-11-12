import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { validationSchema } from '../schema';
import { INITIAL_FORM_STATE } from '../constants';
import useSnackbar from 'src/hooks/useSnackbar';
import { AxiosBaseError } from 'src/types';
import extractErrorMessage from 'src/utils/extractErrorMessage';
import { Row } from '../types';
import { getCompanies, addCompany } from '../api';
import { useQuery } from '@tanstack/react-query';
import UsersDataGrid from 'src/pages/DataGridPaginatedPlayground/definition';
import { useState } from 'react';
import { DataGridFetchQuery } from 'src/components/DataGridTanstack/types';

const AddCompanyQueryKey = ['addCompany'];

const useAddCompanyFormController = () => {
  const { showSnackbar } = useSnackbar();
  const [updatedata, setUpdateData] = useState<Row[]>([]);
  const queryClient = useQueryClient();

  const formikProps = useFormik({
    initialValues: INITIAL_FORM_STATE,
    onSubmit: (values, { resetForm }) => {
      mutate(values);
      resetForm();
    },
    validationSchema,
    validateOnMount: true,
  });

  const { mutate, isLoading } = useMutation(AddCompanyQueryKey, addCompany, {
    onSuccess: async (data) => {
      console.log(data.data);
      if (data.success === true) {
        showSnackbar({ severity: 'success', message: data.message });
        getCompanies({ pageIndex, pageSize })
          .then((result) => {
            setUpdateData((prevData) => [data.data, ...prevData]);
            queryClient.invalidateQueries(["Companies"]);
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
  });

  const { pageSize: initialPageSize } = UsersDataGrid.configs;
  const [pagination, setPagination] = useState<DataGridFetchQuery>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  const { pageIndex, pageSize } = pagination;

  const { data, isLoading: loading, isFetching } = useQuery(
    ['Companies', pageIndex, pageSize],
    () => getCompanies({ pageIndex, pageSize }),
    {}
  );

  const onGetDataGrid = (query: DataGridFetchQuery) => setPagination(query);

  return {
    formikProps,
    mutate,
    isLoading,
    updatedata,
    rows: data?.items ?? [],
    totalRows: data?.totalItems ?? -1,
    onGetDataGrid,
    isFetching: isFetching || loading,
  };
};

export default useAddCompanyFormController;
