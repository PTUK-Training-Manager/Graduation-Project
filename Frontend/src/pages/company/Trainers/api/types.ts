import { BaseResponse } from "src/types";

export interface TrainersData {
  id: string;
  companyId: string;
  fieldId: string;
  Field: {
    id: string;
    field: string;
  };
  name: string;
  status: string;
  userId: string;
}

export interface GetTrainersParams {
  pageIndex: number; // page number
  pageSize: number; // page size
}

export interface GetTrainerssResponse {
  items: TrainersData[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface DeleteTrainerBody {
  id: string;
}

export interface UpdateFieldforTrainerBody {
  id: string;
  fieldId: string;
}

export interface AddTrainerRequestBody {
  id: string;
  name: string;
  email: string;
  fieldId: string;
  phoneNumber: string;
}

export interface FieldData {
  map(arg0: (field: any) => { id: any; field: any; }): unknown;
    id: string;
    fieldId: string;
    companyId: string;
    Field: {
      id: string;
      field: string;
    };
}

export interface GetFieldResponse extends BaseResponse {
  data: FieldData[];
}

export interface DeleteTrainerData {
  id: string;
}

export interface DeleteTrainerResponse extends BaseResponse {
  data: DeleteTrainerData;
}

export interface UpdateFieldForTrainerData {
  id: string;
  companyId: string;
  fieldId: string;
  Field: {
    id: string;
    field: string;
  };
  name: string;
  status: string;
  userId: string;
}

export interface UpdateFieldForTrainerResponse extends BaseResponse {
  data: UpdateFieldForTrainerData;
}

export interface AddTrainerData {
id: string;
companyId: string;
fieldId: string ;
Field: {
  id: string;
  field: string;
};
name: string;
status: string;
userId: string;
}

export interface AddTrainerResponse extends BaseResponse {
data: AddTrainerData;
}