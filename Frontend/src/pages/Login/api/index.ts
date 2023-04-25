import axiosInstance from "src/api";
import {SignInRequestBody} from "./request.dto";
import {SignInResponse} from "./response.dto";

export const signIn = async (body: SignInRequestBody) => {
    const url = "/auth/signin";
    return axiosInstance.post<SignInResponse>(url, body).then(res => res.data);
};