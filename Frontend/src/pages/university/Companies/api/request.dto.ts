export interface AddCompanyRequestBody {
    id: string;
    name: string;
    email: string;
    location: string;
    phoneNumber: string;
    managerName: string;
  }

  export interface AddBranchRequestBody {
    id: string;
    location: string;
}
export interface FetchUsersParams {
  page?: number; // page number
  size?: number; // page size
  name?: string;
}