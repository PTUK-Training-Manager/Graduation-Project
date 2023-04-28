import axiosInstance from "src/api";
import {LoginRequestBody} from "./request.dto";
import {LoginResponse} from "./response.dto";

export const login = async (body: LoginRequestBody) => {
    const url = "/auth/login";
    return axiosInstance.post<LoginResponse>(url, body).then(res => res.data);
};