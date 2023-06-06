import {FC} from 'react';
import {TablePaginationProps} from "@mui/material/TablePagination";
import {gridPageCountSelector, useGridApiContext, useGridSelector} from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";

interface PaginationProps extends Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'> {

}

const Pagination: FC<PaginationProps> = ({
                                             page,
                                             onPageChange,
                                             className,
                                         }) => {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <MuiPagination
            color="primary"
            className={className}
            count={pageCount}
            page={page + 1}
            onChange={(event, newPage) => {
                onPageChange(event as any, newPage - 1);
            }}
        />
    );
}

export default Pagination;
