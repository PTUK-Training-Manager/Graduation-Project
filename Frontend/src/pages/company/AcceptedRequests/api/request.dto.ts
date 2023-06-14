export interface AssignTrainerRequestBody {
    trainingId: string;
    trainerId: string;
    startDate?: Date;
}
export interface FetchUsersParams {
    page?: number; // page number
    size?: number; // page size
    name?: string;
  }