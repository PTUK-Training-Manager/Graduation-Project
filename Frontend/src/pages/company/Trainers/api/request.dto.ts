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