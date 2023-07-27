import axiosInstance from "src/api";
import { LoginRequestBody, ForgetPasswordRequestBody } from "./request.dto";
import { LoginResponse } from "./response.dto";

export const login = async (body: LoginRequestBody) => {
  const url = "/auth/login";
  return axiosInstance.post<LoginResponse>(url, body).then(res => res.data);
};

export const sendResetPasswordRequest = (body: ForgetPasswordRequestBody) => {
  const url = "/user/sendResetPassword";
  return axiosInstance.post<void>(url, body).then(res => res.data);
};
