import axiosInstance from "src/api";
import { deleteRequestResponse } from "./response.dto";

export const deleteRquest = (id: string) => {
  const url = `/request/request/${id}`;
  return axiosInstance.delete<deleteRequestResponse>(url).then(res => res.data);
};
