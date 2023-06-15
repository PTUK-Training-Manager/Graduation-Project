import React, {useEffect, useState, SyntheticEvent} from "react";
import {useQuery} from "@tanstack/react-query";
import {PageChangeParams} from "src/components/DataGridTanstack/types";
import { getPendingRequests } from "../api";

export interface UseDataGridPlaygroundAPIProps {
    pagination?: PageChangeParams;
}

const usePendingRequestsController = ({pagination}: UseDataGridPlaygroundAPIProps) => {
                  
    const [totalRows, setTotalRows] = useState<number>(0);

    const {data}
        = useQuery(
        ["pendingRequests"],
        () => getPendingRequests({page: pagination?.pageIndex, size: pagination?.pageSize}).then(res => {
            setTotalRows(res?.headers["x-total-count"] ?? 0);
            return res?.data.items ?? [];
        })
        , {
            keepPreviousData: true, //for a smooth transition between the pages in the table.
        }
    );
     return {
      
            rows: data ?? [],
    };
};
export default usePendingRequestsController;




