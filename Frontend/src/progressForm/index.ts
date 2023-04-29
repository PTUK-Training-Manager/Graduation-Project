import axiosInstance from "src/api";
import {progressFormRequestBody} from "./request.dto";
import {progressFormResponse} from "./response.dto";

export const progressForm = (body: progressFormRequestBody) => {
    const url = "/evaluation/progressForm";
    return axiosInstance.post<progressFormResponse>(url, body).then(res => res.data);
};