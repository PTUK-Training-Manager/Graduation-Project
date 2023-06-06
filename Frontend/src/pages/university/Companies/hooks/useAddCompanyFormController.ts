import { useMutation } from '@tanstack/react-query';
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
import { getCompany } from 'src/api/getCompany'; // Import the getCompany function
import { IconButton } from '@mui/material';

interface useAddCompanyAPIProps {}

const AddCompanyQueryKey = ['addCompany'];

const useAddCompanyFormController = () => {
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
        getCompany()
        .then((result) => {
          setUpdateData((prevData) => [data.data, ...prevData]);
        console.log(result.data);
        })
        .catch((error) => console.log(error));

        console.log(data.data);
      } else if (data.success === false) {
        showSnackbar({ severity: 'warning', message: data.message });
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


  
  return { formikProps, mutate, isLoading,updatedata};
};

export default useAddCompanyFormController;
