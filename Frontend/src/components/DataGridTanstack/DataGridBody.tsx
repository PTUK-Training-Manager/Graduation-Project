import {CreateDataGridConfig, DataGridBodyProps} from "./types";
import React, {useContext} from "react";
import TableBody from "@mui/material/TableBody";
import theme from "src/styling/customTheme";
import {StyledTableRow} from "src/components/DataGridTanstack/styled";
import TableCell from "@mui/material/TableCell";
import {flexRender} from "@tanstack/react-table";
import TableBodySkeleton from "src/components/DataGridTanstack/TableBodySkeleton";

export function makeDataGridBody<T extends object>(configs: CreateDataGridConfig<T>) {

    const DataGridBody = <T extends any>(props: DataGridBodyProps<T>) => {
        const {onRowClick, skeletonRowCount = 10, skeletonRowHeight = 28} = props;

        const {
            table,
            striped,
            isRowClickable,
            isFetching,
        } = useContext(configs.Context);

        const {getRowModel, getAllColumns} = table

        const columnCount = getAllColumns().length;

        const isRowClickableBoolean = isRowClickable ?? Boolean(onRowClick);


        if (isFetching) return (
            <TableBodySkeleton
                columnCount={columnCount}
                skeletonRowCount={skeletonRowCount}
                skeletonRowHeight={skeletonRowHeight}
            />
        )

        return (
            <TableBody sx={{
                display: "block",
                overflow: "auto",
                // height: `calc(100% - 33px)`,
                height: "100%",
                // overflowY: "scroll",
                ...theme.mixins.niceScroll(),
            }}>
                {getRowModel().rows.map((row) => (
                    <StyledTableRow
                        key={row.id}
                        striped={striped}
                        isClickable={isRowClickableBoolean}
                        sx={{
                            width: "100%",
                            tableLayout: "fixed",
                            display: "flex",
                        }}
                    >
                        {row.getVisibleCells().map((cell) => (
                            <TableCell
                                key={cell.id}
                                onClick={() => onRowClick?.(cell, row)}
                                sx={{
                                    width: cell.column.getSize(),
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                }}

                            >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                        ))}
                    </StyledTableRow>
                ))}
            </TableBody>
        )
    }

    DataGridBody.displayName = `${configs.name}.Body`;

    return DataGridBody;
}
