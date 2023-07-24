import { BaseResponse } from "src/types";

interface ResetPasswordResponseData {
  id: string;
}

export interface ResetPasswordResponse extends BaseResponse {
  data: ResetPasswordResponseData;
}

export interface ResetPasswordBody {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
