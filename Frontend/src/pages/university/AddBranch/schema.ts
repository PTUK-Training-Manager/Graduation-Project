import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    id: Yup.string().required('Branch Id is required'),
    location: Yup.string().required('Location is required').min(3, 'Password must be at least 3 characters long')
});