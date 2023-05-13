import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    startTime: Yup.string().required('Start time for Training is required'),
    endTime: Yup.string().required('End time for Training is required'),
    startTimeType: Yup.string().required('Start time type for Training is required'),
    endTimeType: Yup.string().required('End time type for Training is required'),
    date: Yup.date().required('Date is required'),
    skills: Yup.string().required('Your Skills are required'),
    trainingId: Yup.string().required('TrainingID is required'),
});