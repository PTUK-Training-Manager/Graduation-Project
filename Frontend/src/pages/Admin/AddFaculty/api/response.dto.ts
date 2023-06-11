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