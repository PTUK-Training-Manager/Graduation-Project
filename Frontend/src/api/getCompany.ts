import axiosInstance from "src/api";
import {BaseResponse} from "src/types";

export interface GetCompanyData {
  map(arg0: (company: any) => { id: any; name: any; }): unknown;
  id: string;
  name: string;
  phoneNumber: string;
  managerName: string;
  userId: string;
  User: {
    email: string;
  };
}

export interface GetCompanyResponse extends BaseResponse {
  data: GetCompanyData[];
}

export const getCompany = async () => {
    const url = "/company/company";
    return axiosInstance.get<GetCompanyResponse>(url).then(res => res.data);
};

