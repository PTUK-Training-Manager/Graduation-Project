import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { validationSchema } from '../schema';
import { INITIAL_FORM_STATE } from '../constants';
import useSnackbar from 'src/hooks/useSnackbar';
import { AxiosBaseError } from 'src/types';
import extractErrorMessage from 'src/utils/extractErrorMessage';
import {submitNewForgettenPassword} from 'src/api/forgetPassword';

const ForgetPasswordQueryKey = ['forgetPassword'];

const useForgetController = () => {
  const { showSnackbar } = useSnackbar();

  const formikProps = useFormik({
    initialValues: INITIAL_FORM_STATE,
    onSubmit: (values, { resetForm }) => {
      mutate(values);
      resetForm();
      formikProps.setFieldValue('companyId', null);
      formikProps.setFieldValue('companyBranchId', null);
    },
    validationSchema,
    validateOnMount: true,
  });

  const { mutate, isLoading } = useMutation(
    ForgetPasswordQueryKey,
    submitNewForgettenPassword,
    {
      onSuccess: (data) => {
        console.log(data.data);
        if (data.success == true) {
          showSnackbar({ severity: 'success', message: data.message });
        } else if (data.success == false)
          showSnackbar({ severity: 'warning', message: data.message });
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

  return { formikProps, mutate, isLoading };
};

export default useForgetController;
