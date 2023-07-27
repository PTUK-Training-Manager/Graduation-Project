import axiosInstance from "src/api";
import { SubmitRequestBody } from "./request.dto";
import { GetCompaniesParams, GetCompaniesResponse, SubmitRequestResponse } from "./response.dto";

export const submitRequest = async (body: SubmitRequestBody) => {
  const url = "/request/request";
  return axiosInstance.post<SubmitRequestResponse>(url, body).then(res => res.data);
};

export const getCompanies = async (params: GetCompaniesParams) => {
  const { pageIndex, pageSize } = params;

  return axiosInstance
    .get<GetCompaniesResponse>("/company/company", {
      params: {
        page: pageIndex,
        size: pageSize,
      },
    })
    .then(response => response.data);
};
