import {AxiosResponse} from "axios";

export interface UserData {
    id: number;
}

export interface FetchUsersResponse extends AxiosResponse<UserData[]> {
}