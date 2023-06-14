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
export interface FetchUsersParams {
  page?: number; // page number
  size?: number; // page size
  name?: string;
}