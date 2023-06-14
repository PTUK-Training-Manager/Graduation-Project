import axiosInstance from 'src/api';
import { BaseResponse } from 'src/types';

export interface AccessTokenData {
  id: string;
}
export interface forggetResponse extends BaseResponse {
  data: AccessTokenData;
}
export interface SubmitResetBody {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
export const submitResetPassword = (body: SubmitResetBody) => {
  const url = '/auth/resetPassword';
  return axiosInstance.post<forggetResponse>(url, body).then((res) => res.data);
};
