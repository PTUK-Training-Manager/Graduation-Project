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
  
  export interface GetTrainersResponse extends BaseResponse {
    data: TrainersData[];
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