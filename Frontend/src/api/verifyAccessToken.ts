import axiosInstance from "src/api/index";
import {SignInResponse} from "src/pages/Login/api/response.dto";

const verifyAccessToken = async () => {
    const url = "/auth/verifyAccessToken";
    return axiosInstance.get<SignInResponse>(url).then(res => res.data);
};

export default verifyAccessToken;