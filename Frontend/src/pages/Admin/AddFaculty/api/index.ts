import axiosInstance from "src/api";
import {AploadExcelFileBody, AddFacultyBody} from "./request.dto";
import {AploadExcelFileResponse, AddFieldResponse} from "./response.dto";



export const addFaculty = async (body: AddFacultyBody) => {
    const url = "/user/user";
    return axiosInstance.post<AddFieldResponse>(url, body).then(res => res.data);
};

export const aploadExcelFile = async (file: File) => {
    const url = "/admin/upload";
    const formData = new FormData();
    formData.set("files" , file);
    return axiosInstance.post<AploadExcelFileResponse>(url, formData).then(res => res.data);
  };
  
  
  