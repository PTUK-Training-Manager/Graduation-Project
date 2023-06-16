import axiosInstance from 'src/api';
import {SetNewPasswordBody} from "./types";
import {ForgetPasswordResponse} from "src/pages/Login/api/response.dto";

export const setNewPassword = (body: SetNewPasswordBody) => {
  const url = "/user/resetForgottenPassword";
  return axiosInstance
      .post<ForgetPasswordResponse>(url, body)
      .then((res) => res.data);
};



