import axiosInstance from "src/api";
import {AploadExcelFileBody, AddFacultyBody} from "./request.dto";
import {AploadExcelFileResponse, AddFieldResponse} from "./response.dto";

// export const aploadExcelFile = async (body: AploadExcelFileBody) => {
//     const url = "/admin/upload";
//     return axiosInstance.post<AploadExcelFileResponse>(url, body).then(res => res.data);
// };

export const addFaculty = async (body: AddFacultyBody) => {
    const url = "/user/user";
    return axiosInstance.post<AddFieldResponse>(url, body).then(res => res.data);
};

export const aploadExcelFile = async (body: AploadExcelFileBody) => {
    const url = "/admin/upload";
    const formData = new FormData();
    formData.append("file", body.file); // Append the file to the FormData object
  
    return axiosInstance.post<AploadExcelFileResponse>(url, formData).then(res => res.data);
  };
  