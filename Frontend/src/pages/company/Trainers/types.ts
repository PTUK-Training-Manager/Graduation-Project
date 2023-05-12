import { BaseResponse } from 'src/types';

export interface FieldOption {
  map(arg0: (field: any) => { id: any; field: any }): unknown;
  id: string;
  fieldId: string;
  companyId: string;
  Field: {
    id: string;
    field: string;
  };
}

export interface DeleteTrainerBody {
  id: string;
}

export interface DeleteTrainerData {
  id: string;
}

export interface DeleteTrainerResponse extends BaseResponse {
  data: DeleteTrainerData;
}

export interface UpdateFieldforTrainerBody {
  id: string;
  fieldId: string;
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
export interface AddTrainerRequestBody {
    id: string;
    name: string;
    email: string;
    fieldId: string;
    phoneNumber: string;
}
export interface AddTrainerData {
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
  
  export interface AddTrainerResponse extends BaseResponse {
    data: AddTrainerData;
  }