export interface FetchUsersPaginatedParams {
  pageIndex: number; // page number
  pageSize: number; // page size
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  body: string;
  postId: number;
  birthDate: string;
}
