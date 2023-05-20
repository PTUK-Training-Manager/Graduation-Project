import {useQuery} from "@tanstack/react-query";
import {fetchUsers} from "../API";

export interface UseDataGridPlaygroundAPIProps {
    currentPage?: number;
    search?: string;
}

const useDataGridPlaygroundAPI = ({currentPage, search}: UseDataGridPlaygroundAPIProps) => {

    const {data: users, isFetching, isError, error, isSuccess}
        = useQuery(
        ["users", currentPage, search],
        () => fetchUsers({page: currentPage, name: search}), {
            keepPreviousData: true, //for a smooth transition between the pages in the table.
        }
    );

    return {users, isFetching, isError, error, isSuccess};
};

export default useDataGridPlaygroundAPI;
