import React, {useEffect, useState, SyntheticEvent} from "react";
import {getTraineesFinishedRequiredHours} from "../api";
import {IconButton} from "@mui/material";
import {Feed} from "@mui/icons-material";
import { progressForm } from "src/api/progress";
import {useQuery} from "@tanstack/react-query";
import {PageChangeParams} from "src/components/DataGridTanstack/types";

export interface UseDataGridPlaygroundAPIProps {
    pagination?: PageChangeParams;
}

const useFinishedRequiredHoursController = ({pagination}: UseDataGridPlaygroundAPIProps) => {
                  
    const [totalRows, setTotalRows] = useState<number>(0);

    const {data}
        = useQuery(
        ["users", pagination],
        () => getTraineesFinishedRequiredHours({page: pagination?.pageIndex, size: pagination?.pageSize}).then(res => {
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
export default useFinishedRequiredHoursController;




