import axios from "axios";
import { UserData, FetchUsersInfiniteParams } from "./types";

export const fetchUsersInfinite = async (params: FetchUsersInfiniteParams) => {
  return axios.get<UserData[]>("https://jsonplaceholder.typicode.com/comments", {
    params: {
      _start: params.pageIndex * params.pageSize,
      _limit: params.pageSize,
    },
  });
};
