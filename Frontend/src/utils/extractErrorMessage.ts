import {AxiosError} from "axios";
import {BaseResponse} from "src/types";

const extractErrorMessage = (error: AxiosError<BaseResponse>) => {
    if (error?.response?.data?.message) {
        return error?.response?.data?.message;
    }

    return "Something Went Wrong!";
}

export default extractErrorMessage;