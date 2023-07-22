import axiosInstance from "src/api";
import {BaseResponse} from "src/types";

export interface CompaniesData {
  id: string;
  name: string;
  phoneNumber: string;
  managerName: string;
  userId: string;
  User: {
    email: string;
  };
}

export interface GetCompanyResponse  {
  items: CompaniesData[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export const getCompany = async () => {
    const url = "/company/company";
    return axiosInstance.get<GetCompanyResponse>(url).then(res => res.data);
};

