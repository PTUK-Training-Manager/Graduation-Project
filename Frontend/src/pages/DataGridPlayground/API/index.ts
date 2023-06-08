import axios from "axios";
import {UserData} from "./response.dto";
import {FetchMoreUsersParams, FetchUsersParams} from "./request.dto";

export const fetchUsers = async (params: FetchUsersParams) => {
    return axios.get<UserData[]>(
        "https://jsonplaceholder.typicode.com/comments", {
            params: {
                _start: (params._start ?? 0) * (params._limit ?? 10),
                _limit: params._limit,
            }
        }
    )
        // .then(res => res.data);
}

export const fetchMoreUsers = async (params: FetchMoreUsersParams) => {
    return axios.get<UserData[]>(
        "https://jsonplaceholder.typicode.com/comments", {
            params: {
                // _start: (params._start ?? 0) * (params._limit ?? 10),
                _limit: (params.pageIndex + 1) * 20,
            }
        }
    )
}
