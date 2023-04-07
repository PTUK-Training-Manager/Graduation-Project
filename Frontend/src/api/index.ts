import axios, {AxiosRequestConfig} from 'axios';

const defaultAxiosSettings: AxiosRequestConfig = {
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
};

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    ...defaultAxiosSettings,
});

export default axiosInstance;