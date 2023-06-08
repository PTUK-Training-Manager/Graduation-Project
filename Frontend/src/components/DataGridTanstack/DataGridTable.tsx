import React, {ReactNode, useContext} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from '@mui/material/TablePagination';
import Tooltip from '@mui/material/Tooltip';
import TableBodySkeleton from "./TableBodySkeleton";
import {
    flexRender,
    SortDirection,
} from "@tanstack/react-table";
import {DataGridProps} from "./types";
import {StyledPagination, StyledTableRow} from "./styled";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import theme from "src/styling/customTheme";
import useStyles from "./styles";
import {CreateDataGridConfig} from "./types";
import {mapSortDirToIcon} from "src/components/DataGridTanstack/constants";

export function makeDataGridTable<T extends object>(configs: CreateDataGridConfig<T>) {

    const {
        Context,
        shouldFlexGrowCells
    } = configs;

    const DataGrid = <T extends any>(props: DataGridProps<T>) => {
        const {
            children,
            onRowClick,
            // isFetching,
            // skeletonRowCount = 4,
            // skeletonRowHeight = 28,
            // striped = false, // for adding striped effect to the table
        } = props;

        const {
            table,
            handleChangePage,
            handleChangeRowsPerPage,
            handleFetchMore,
            // onPaginationChange,
            onFetch,
            totalPages,
            totalRows = 99999,
            isRowClickable,
            isFetching,
            skeletonRowCount,
            skeletonRowHeight,
            striped
        } = useContext(configs.Context);

        const classes = useStyles();

        const isRowClickableBoolean = isRowClickable ?? Boolean(props.onRowClick);

        const {
            getHeaderGroups,
            getRowModel,
            getAllColumns,
            getState,
            getCenterTotalSize,
            getTotalSize,
        } = table;

        const ss = getRowModel()?.rows[0]?.getVisibleCells()?.map((cell) => {
            console.log(cell.column.getSize());
        });

        console.log(getRowModel().rows.length);

        const columnCount = getAllColumns().length;

        return (
            <>
                <Stack sx={{height: "100%", position: "relative"}}>
                    <TableContainer
                        component={Paper}
                        sx={{
                            height: "100%",
                            // overflow: "auto",
                            position: "relative",
                            borderRadius: "4px 4px 0 0",
                            ...theme.mixins.niceScroll(),
                        }}
                    >
                        <MuiTable sx={{
                            // borderRadius: 0,
                            position: "relative",
                            height: "100%",
                            minWidth: "100%",
                            width: getTotalSize(),
                        }}>
                            <TableHead sx={{width: "100%"}}>
                                {getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id} sx={{display: "flex"}}>
                                        {headerGroup.headers.map((header) => (
                                            <>
                                                {header.isPlaceholder ? null : (
                                                    <TableCell
                                                        key={header.id}
                                                        colSpan={header.colSpan}
                                                        sx={{
                                                            width: header.getSize(),
                                                            py: 0.5,
                                                            position: "sticky",
                                                            bgcolor: theme.palette.background.paper,
                                                            top: 0,
                                                            ...(header.column.getCanSort() && {
                                                                cursor: "pointer",
                                                                userSelect: "none",
                                                            }),
                                                            "&:hover": {
                                                                bgcolor: theme.palette.grey[100],
                                                            },
                                                            ":is(:hover) :is(#sortable-indicator, #resizer)": {
                                                                opacity: 1,
                                                            }
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: 0.5,
                                                                height: "32px"
                                                            }}
                                                            onClick={header.column.getToggleSortingHandler()}
                                                        >
                                                            {flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}
                                                            {mapSortDirToIcon[header.column.getIsSorted() as SortDirection] ?? null}
                                                            {header.column.getCanSort() && !header.column.getIsSorted() && (
                                                                <ArrowUpwardIcon
                                                                    id="sortable-indicator"
                                                                    color="disabled"
                                                                    sx={{
                                                                        transition: "0.5s all",
                                                                        fontSize: 18,
                                                                        opacity: 0,
                                                                    }}
                                                                />
                                                            )}
                                                        </Box>
                                                        <Box
                                                            id="resizer"
                                                            sx={{opacity: 0}}
                                                            onMouseDown={header.getResizeHandler()}
                                                            onTouchStart={header.getResizeHandler()}
                                                            className={classes.resizer}
                                                        />
                                                    </TableCell>
                                                )}
                                            </>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHead>
                            {isFetching && (
                                <TableBodySkeleton
                                    columnCount={columnCount}
                                    skeletonRowCount={skeletonRowCount}
                                    skeletonRowHeight={skeletonRowHeight}
                                />
                            )}

                            <TableBody
                                id="scrollableTableBody"
                                sx={{
                                    display: "block",
                                    // overflow: "auto",
                                    // height: `calc(100% - 33px)`,
                                    height: "100%",
                                    // overflowY: "scroll",
                                    ...theme.mixins.niceScroll(),
                                }}
                            >
                                <InfiniteScroll
                                    scrollableTarget="scrollableTableBody"
                                    dataLength={getRowModel().rows.length}
                                    next={handleFetchMore}
                                    hasMore={getRowModel().rows.length < totalRows}
                                    loader={<CircularProgress/>}
                                    endMessage={<p>Yay! You have seen it all</p>}
                                    style={{overflow: "hidden"}}
                                >
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
                                                        width: shouldFlexGrowCells ? "150px" : cell.column.getSize(),
                                                        // width: cell.column.getSize(),
                                                        whiteSpace: "nowrap",
                                                        textOverflow: "ellipsis",
                                                        overflow: "hidden",
                                                        flexGrow: shouldFlexGrowCells ? 1 : 0,
                                                    }}
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </StyledTableRow>
                                    ))}
                                </InfiniteScroll>
                            </TableBody>
                        </MuiTable>
                    </TableContainer>
                    <Grid container
                          sx={{
                              alignItems: "center",
                              bgcolor: theme.palette.grey[100],
                              position: "sticky",
                              left: 0,
                              bottom: 0,
                              borderTop: `1px solid ${theme.palette.grey[300]}`,
                              justifyContent: "flex-end",
                              boxShadow: 2,
                          }}
                    >
                        {onFetch && (
                            <TablePagination
                                size="small"
                                component="div"
                                count={totalRows ?? -1} //The total number of rows.
                                page={getState().pagination.pageIndex}
                                onPageChange={handleChangePage as any}
                                rowsPerPage={getState().pagination.pageSize}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                labelRowsPerPage="page size"
                                showFirstButton
                                showLastButton
                            />
                        )}
                    </Grid>
                </Stack>
                <pre>{JSON.stringify(getState(), null, 2)}</pre>
            </>
        )
    };

    DataGrid.displayName = `${configs.name}.AllParts`;

    return DataGrid;
}

