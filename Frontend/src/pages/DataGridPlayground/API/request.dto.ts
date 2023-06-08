export interface FetchUsersParams {
    _start?: number; // page number
    _limit?: number; // page size
}

export interface FetchMoreUsersParams {
    pageIndex: number;
}