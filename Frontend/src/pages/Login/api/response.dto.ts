import { BaseResponse, User } from "src/types";

export interface AccessTokenData extends User {}

export interface LoginResponse extends BaseResponse {
  data: AccessTokenData;
  accessToken: string;
}

export interface ForgetPasswordResponse extends BaseResponse {
  data: AccessTokenData;
}
