import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchUsers} from "../API";
import {PageChangeParams} from "src/components/DataGridTanstack/types";

export interface UseDataGridPlaygroundAPIProps {
    pagination?: PageChangeParams;
    search?: string;
}

const useDataGridPlaygroundAPI = ({pagination, search}: UseDataGridPlaygroundAPIProps) => {

    const [totalRows, setTotalRows] = useState<number>(0);

    const {data: users, isFetching, isError, error, isSuccess}
        = useQuery(
        ["users", pagination, search],
        () => fetchUsers({_start: pagination?.pageIndex, _limit: pagination?.pageSize, name: search}).then(res => {
            console.log(res.headers);
            setTotalRows(res?.headers["x-total-count"] ?? 0);
            return res?.data ?? [];
        })
        , {
            keepPreviousData: true, //for a smooth transition between the pages in the table.
        }
    );

    return {
        users, isFetching, isError, error, isSuccess,
        totalRows,
    };
};

export default useDataGridPlaygroundAPI;