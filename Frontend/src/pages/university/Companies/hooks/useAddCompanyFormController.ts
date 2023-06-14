import { useMutation, useQuery } from '@tanstack/react-query';
import { addCompany } from '../api';
import { useFormik } from 'formik';
import { validationSchema } from '../schema';
import { INITIAL_FORM_STATE } from '../constants';
import useSnackbar from 'src/hooks/useSnackbar';
import { AxiosBaseError } from 'src/types';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import extractErrorMessage from 'src/utils/extractErrorMessage';
import { Row } from '../types';
import { useEffect, useState } from 'react';
import { getCompany } from '../api'; // Import the getCompany function
import { IconButton } from '@mui/material';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';

interface useAddCompanyAPIProps {}
export interface UseDataGridPlaygroundAPIProps {
  pagination?: PageChangeParams;
}
const AddCompanyQueryKey = ['addCompany'];

const useAddCompanyFormController = ({
  pagination,
}: UseDataGridPlaygroundAPIProps) => {
  const { showSnackbar } = useSnackbar();
  const [updatedata, setUpdateData] = useState<Row[]>([]);

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
        getCompany({page: pagination?.pageIndex, size: pagination?.pageSize})
          .then((result) => {
            setUpdateData((prevData) => [data.data, ...prevData]);
            console.log(result.data);
          })
          .catch((error) => console.log(error));

        console.log(data.data);
      } else if (data.success === false) {
        showSnackbar({
          severity: 'warning',
          message:
            'The company has been added successfully. Login credentials have been sent to the provided email.',
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
  const [totalRows, setTotalRows] = useState<number>(0);

    const {data}
        = useQuery(
        ["users", pagination],
        () => getCompany({page: pagination?.pageIndex, size: pagination?.pageSize}).then(res => {
            setTotalRows(res?.headers["x-total-count"] ?? 0);
            return res?.data.items ?? [];
        })
        , {
            keepPreviousData: true, //for a smooth transition between the pages in the table.
        }
    );

  return { formikProps, mutate, isLoading, updatedata, rows: data ?? [] };
};

export default useAddCompanyFormController;
