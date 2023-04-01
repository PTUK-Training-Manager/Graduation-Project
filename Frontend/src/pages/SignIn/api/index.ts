import axiosInstance from "src/api";
import {SignInRequestBody, SignInResponse} from "../types";

export const signIn = async (body: SignInRequestBody) => {
    const url = "/auth/signin";
    return  axiosInstance.post<SignInResponse>(url, body).then(res => res.data);
};