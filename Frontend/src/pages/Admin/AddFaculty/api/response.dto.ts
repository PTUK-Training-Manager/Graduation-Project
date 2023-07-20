import {BaseResponse} from "src/types";

export interface AploadExcelFileData {
    id: string;
    type: string;
    semester: string;
    status: string;
    studentId: string;
    companyBranchId: string;
  }

  export interface AploadExcelFileResponse extends BaseResponse {
    tokenData: AploadExcelFileData;
  }

  export interface AddFieldData {
    id: string;
    type: string;
    semester: string;
    status: string;
    studentId: string;
    companyBranchId: string;
  }

  export interface AddFieldResponse extends BaseResponse {
    tokenData: AddFieldData;
  }
  export interface UploadFileData {  
    studentId: string;
  }

  export interface UploadFileResponse extends BaseResponse {
    tokenData: UploadFileData;
  }