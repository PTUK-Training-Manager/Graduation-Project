import {useState} from "react";
import {getTrainingRequests} from "../api";
import {useQuery} from "@tanstack/react-query";
import {PageChangeParams, DataGridFetchQuery} from "src/components/DataGridTanstack/types";

export interface UseDataGridPlaygroundAPIProps {
    pagination?: DataGridFetchQuery;
}

const useTrainingRequestsController = ({pagination}: UseDataGridPlaygroundAPIProps) => {
                  
    const [totalRows, setTotalRows] = useState<number>(0);

    const {data}
        = useQuery(
        ["trainingRequests"],
        () => getTrainingRequests({page: pagination?.pageIndex, size: pagination?.pageSize}).then(res => {
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
export default useTrainingRequestsController;




