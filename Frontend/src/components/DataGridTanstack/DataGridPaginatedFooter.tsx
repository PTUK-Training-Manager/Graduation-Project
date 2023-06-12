import React, {FC, useContext} from "react";
import {CreateDataGridConfigWithDefaults, DataGridPaginatedFooterProps} from "./types";
import {makeDataGridFooterSkeleton} from "./DataGridFooterSkeleton";
import TablePagination from "@mui/material/TablePagination";

export function makeDataGridPaginatedFooter<T extends object>(configs: CreateDataGridConfigWithDefaults<T>) {

    const Footer = makeDataGridFooterSkeleton<T>(configs);

    const DataGridPaginatedFooter: FC<DataGridPaginatedFooterProps> = () => {
        const {
            table,
            totalRows,
            handleChangePage,
            handleChangeRowsPerPage,
        } = useContext(configs.Context);

        const {getState} = table;
        const {pageIndex, pageSize} = getState().pagination;

        const getRowsPerPageOptions = () => {
            let defaultArr = [5, 10, 15, 20, 25, 50, 100];
            return defaultArr.includes(configs.pageSize) ? defaultArr : [configs.pageSize].concat(defaultArr).sort((a, b) => a - b);
        };

        const rowsPerPage = getRowsPerPageOptions();

        return (
            <Footer>
                <Footer.Start/>
                <Footer.End>
                    <TablePagination
                        size="small"
                        component="div"
                        count={totalRows ?? -1} //The total number of rows.
                        page={pageIndex}
                        rowsPerPage={pageSize}
                        onPageChange={handleChangePage!}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="page size"
                        rowsPerPageOptions={rowsPerPage}
                        showFirstButton
                        showLastButton
                    />
                </Footer.End>
            </Footer>
        )
    };

    DataGridPaginatedFooter.displayName = `${configs.name}.InfiniteFooter`;

    return DataGridPaginatedFooter;
}