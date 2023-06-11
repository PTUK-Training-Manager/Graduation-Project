import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
     file: Yup.string().required('Location of Company is required'),
});