import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    id: Yup.string().required('Company ID is required'),
    name: Yup.string().required('Company Name is required'),
    phoneNumber:Yup.string().required('Phone Number is required'),
    email: Yup.string().required('Email is required'),
    location: Yup.string().required('Location is required'),
    managerName: Yup.string().required('Manager Name is required')
});