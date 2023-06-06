import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    id: Yup.string().required('Trainer ID is required'),
    name: Yup.string().required('Trainer Name ID is required'),
    email: Yup.string().required('Email is required'),
    fieldId: Yup.string().required('Field is required'),
    phoneNumber: Yup.string().required('Phone NUmber is required'),

});