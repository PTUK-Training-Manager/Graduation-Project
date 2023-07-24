export interface FetchUsersInfiniteParams {
  pageIndex: number;
  pageSize: number;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  body: string;
  postId: number;
  birthDate: string;
}
