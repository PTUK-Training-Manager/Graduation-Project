import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
     name: Yup.string().required('Name of Faculty is required'),
     email:  Yup.string().required('Email of Faculty is required')
});