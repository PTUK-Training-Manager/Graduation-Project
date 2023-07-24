import axios from "axios";
import { UserData, FetchUsersPaginatedParams } from "./types";

export const fetchUsersPaginated = async (params: FetchUsersPaginatedParams) => {
  console.log(params);
  return axios.get<UserData[]>("https://jsonplaceholder.typicode.com/comments", {
    params: {
      _start: (params.pageIndex ?? 0) * params.pageSize,
      _limit: params.pageSize,
    },
  });
  // .then(res => res.data);
};
