import axiosInstance from "src/api";

export const forgget = (body: forggetBody) => {
  const url = "/user/sendResetPassword";
  return axiosInstance
    .post<forggetResponse>(url, body)
    .then((res) => res.data);
};
export interface forggetBody {
    username: string;
}
import {BaseResponse} from "src/types";

export interface AccessTokenData {
    id: string;
}

export interface forggetResponse extends BaseResponse {
    data: AccessTokenData;
}
export interface SubmitforggetBody {
    newPassword: string;
    confirmNewPassword: string;

}
export const submitNewForgettenPassword = (body: SubmitforggetBody) => {
    const url = "/user/resetForgottenPassword";
    return axiosInstance
      .post<forggetResponse>(url, body)
      .then((res) => res.data);
  };
