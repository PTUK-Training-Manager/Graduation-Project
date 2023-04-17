import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required').min(3, 'Password must be at least 3 characters long')
});