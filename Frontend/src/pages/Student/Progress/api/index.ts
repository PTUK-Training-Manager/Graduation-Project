import axiosInstance from 'src/api';
import {
  SubmitEvaluationBody,
  RejectedEvaluationstionBody,
  editEvaluationBody,
} from './request.dto';
import {
  SubmitEvaluationResponse,
  TrainingRunningIDResponse,
  RejectedEvaluationResponse,
  EditEvaluationResponse,
} from './response.dto';

export const submitEvaluation = (body: SubmitEvaluationBody) => {
  const url = '/evaluation/evaluation';
  return axiosInstance
    .post<SubmitEvaluationResponse>(url, body)
    .then((res) => res.data);
};

export const editEvaluationForm = (body: editEvaluationBody) => {
  const url = '/evaluation/evaluation';
  return axiosInstance
    .patch<EditEvaluationResponse>(url, body)
    .then((res) => res.data);
};

// export const getTrainingIdForRunnigTraining =
//   async (): Promise<TrainingRunningIDResponse> => {
//     const url = '/training/studentsRunningTraining';
//     const response = await axiosInstance.get<TrainingRunningIDResponse>(url);
//     return response.data;
//   };

export const getTrainingIdForRunnigTraining = async () => {
  const url = '/training/studentsRunningTraining';
  return axiosInstance
    .get<TrainingRunningIDResponse>(url)
    .then((res) => res.data);
};
export const getRejectedEvaluations = (body: RejectedEvaluationstionBody) => {
  const url = '/evaluation/rejectedEvaluations';
  return axiosInstance
    .post<RejectedEvaluationResponse>(url, body)
    .then((res) => res.data);
};

export const getPendingEvaluations = (body: RejectedEvaluationstionBody) => {
  const url = 'evaluation/studentPendingEvaluations';
  return axiosInstance
    .post<RejectedEvaluationResponse>(url, body)
    .then((res) => res.data);
};
