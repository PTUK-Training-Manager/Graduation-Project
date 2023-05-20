import axios from "axios";
import {UserData} from "./response.dto";
import {FetchUsersParams} from "./request.dto";

export const fetchUsers = async (params: FetchUsersParams) => {
    return axios.get<UserData[]>(
        "https://gorest.co.in/public/v2/users", {
            params
        }
    ).then(res => res.data);
}
