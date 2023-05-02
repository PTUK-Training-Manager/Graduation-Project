import axiosInstance from "src/api";
import {BaseResponse} from "src/types";

export interface GetFieldData {
 field: string;
}

export interface GetFieldesponse extends BaseResponse {
  data: GetFieldData[];
}

export const getField = async () => {
    const url = "/company/fields";
    return axiosInstance.get<GetFieldesponse>(url).then(res => res.data);
};

