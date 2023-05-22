import { FC } from 'react';
import Pagination from "./Pagination";
import {GridPagination} from "@mui/x-data-grid";

interface DataGridPaginationProps {}

const DataGridPagination: FC<DataGridPaginationProps> = (props) => {

    return (
        <GridPagination ActionsComponent={Pagination} {...props} />
    );
};

export default DataGridPagination;
