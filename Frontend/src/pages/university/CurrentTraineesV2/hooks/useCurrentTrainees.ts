import {useQuery} from "@tanstack/react-query";
import {getCurrentTrainees} from "../API";
import UsersDataGrid from "src/pages/DataGridPaginatedPlayground/definition";
import {useState} from "react";
import {DataGridFetchQuery} from "src/components/DataGridTanstack/types";

const useCurrentTrainees = () => {

    const {pageSize: initialPageSize} = UsersDataGrid.configs;
    const [pagination, setPagination] = useState<DataGridFetchQuery>({pageIndex: 0, pageSize: initialPageSize});
    const {pageIndex, pageSize} = pagination;

    const {data} = useQuery(
        ["CurrentTrainees", pageIndex, pageSize],
        () => getCurrentTrainees({pageIndex: (pageIndex ?? 0), pageSize}), {}
    );


    return {
        rows: data ?? [],
    };
};

export default useCurrentTrainees;
