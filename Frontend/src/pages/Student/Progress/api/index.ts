import axiosInstance from "src/api";
import { SubmitEvaluationBody } from "./request.dto";
import { SubmitEvaluationResponse } from "./response.dto";


export const submitEvaluation = (body: SubmitEvaluationBody) => {
    const url = "/evaluation/evaluation";
    return axiosInstance
      .post<SubmitEvaluationResponse>(url, body)
      .then((res) => res.data);
  };