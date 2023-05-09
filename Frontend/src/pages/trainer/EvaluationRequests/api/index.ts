import axiosInstance from "src/api";
import { PendenigProgressResponse } from "./response";

export const getPendingEvaluations = async (): Promise<PendenigProgressResponse> => {
    const url = "/evaluation/pendingEvaluations";
    const response = await axiosInstance.get<PendenigProgressResponse>(url);
    return response.data;
  };
  