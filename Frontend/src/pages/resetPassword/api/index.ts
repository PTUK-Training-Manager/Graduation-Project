import axiosInstance from "src/api";
import { ResetPasswordBody, ResetPasswordResponse } from "./types";

export const resetMyPassword = (body: ResetPasswordBody) => {
  const url = "/auth/resetPassword";
  return axiosInstance.post<ResetPasswordResponse>(url, body).then(res => res.data);
};
