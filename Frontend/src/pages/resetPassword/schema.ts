import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string().required('New Password is required'),
    confirmNewPassword:Yup.string().required('Confirm New Password is required'),
});