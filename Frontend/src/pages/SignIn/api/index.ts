import axiosInstance from "src/api";
import {SignInRequestBody, SignInResponse,AccessTokenData} from "../types";
import { useState } from "react";

export const signIn = async (body: SignInRequestBody) => {
    const url = "/auth/signin";
    return await axiosInstance.post<SignInResponse>(url, body,{
        withCredentials:false,}
        ).then(res => res.data);

       
};

