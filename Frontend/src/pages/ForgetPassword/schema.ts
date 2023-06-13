import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    newPassword: Yup.string().required('New Password is required'),
});