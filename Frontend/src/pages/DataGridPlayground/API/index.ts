import axios from "axios";
import {UserData} from "./response.dto";
import {FetchUsersParams} from "./request.dto";

export const fetchUsers = async (params: FetchUsersParams) => {
    return axios.get<UserData[]>(
        "https://jsonplaceholder.typicode.com/comments", {
            params: {
                _start: (params._start ?? 0) * (params._limit ?? 10),
                _limit: params._limit,
                ...(params.name && {name: params.name}),
            }
        }
    )
        // .then(res => res.data);
}
