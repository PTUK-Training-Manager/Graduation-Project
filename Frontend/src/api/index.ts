import axios, {AxiosRequestConfig} from 'axios';
import {isProduction} from '../utils';

const defaultAxiosSettings: AxiosRequestConfig = {
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("access-token") ?? "",
    },
};

const axiosInstance = axios.create({
    baseURL: isProduction
        ? import.meta.env.VITE_API_URL_PROD
        : import.meta.env.VITE_API_URL,
    ...defaultAxiosSettings,
});

export default axiosInstance;