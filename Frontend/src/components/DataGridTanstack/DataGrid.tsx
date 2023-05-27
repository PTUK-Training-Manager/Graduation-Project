import React, {useState, useMemo, memo, ChangeEvent, MouseEvent, ReactNode, useContext} from 'react';
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from '@mui/material/TablePagination';
import TableBodySkeleton from "./TableBodySkeleton";
import TextField from "@mui/material/TextField";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    useReactTable,
    ColumnFiltersState,
    FilterFn,
    SortDirection,
    ColumnDef,
} from "@tanstack/react-table";
import {
    RankingInfo,
    rankItem,
    compareItems,
} from '@tanstack/match-sorter-utils';
import {debounce} from "debounce";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from "@mui/material/InputAdornment";
import {DataGridProps} from "./types";
import {StyledPagination, StyledTableRow} from "./styled";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import theme from "src/styling/customTheme";
import Tooltip from "@mui/material/Tooltip";
import useStyles from "./styles";
import ColumnFilter from "./ColumnFilter";
import FilterListIcon from '@mui/icons-material/FilterList';
import {CreateDataGridConfig} from "./types";

export function makeDataGridTable<T extends object>(configs: CreateDataGridConfig<T>) {

    const {
        Context,
    } = configs;

    const DataGrid = <T extends any>(props: DataGridProps<T>) => {
        const {
            children,
            onRowClick,
            isFetching,
            skeletonRowCount = 4,
            skeletonRowHeight = 28,
            striped = false, // for adding striped effect to the table
        } = props;

        const {
            table,
            handleChangePage,
            handleChangeRowsPerPage,
            headerComponentMemoized,
            onPaginationChange,
            totalPages,
            totalRows,
            onSetGlobalFilter,
            onSetIsOpenFiltersModal,
            isOpenFiltersModal,
            isRowClickable,
        } = useContext(configs.Context);

        const classes = useStyles();

        const isRowClickableBoolean = isRowClickable ?? Boolean(props.onRowClick);

        const {
            getHeaderGroups,
            getRowModel,
            getPreFilteredRowModel,
            getPrePaginationRowModel,
            setPageSize,
            setPageIndex,
            getAllColumns,
            getState,
            getCenterTotalSize,
            resetColumnFilters,
        } = table;

        const columnCount = getAllColumns().length;

        // console.log({
        //     getAllColumns: getAllColumns(),
        // })

        // const handleGlobalSearch = (e: ChangeEvent<HTMLInputElement>) => onSetGlobalFilter(e.target.value);

        const mapSortDirToIcon: Record<SortDirection, ReactNode> = {
            asc: <ArrowUpwardIcon sx={{fontSize: 18, color: "rgba(0,0,0,0.6)"}}/>,
            desc: <ArrowDownwardIcon sx={{fontSize: 18, color: "rgba(0,0,0,0.6)"}}/>,
        }

        const fun = () => {
            table.setColumnFilters([
                {
                    id: "name",
                    // value: ["alias", "omnis"],
                    value: "alias"
                },
                // {
                //     id: "email",
                //     value: "Nikita"
                // },

            ]);
        }

        return (
            <>
                <Stack sx={{height: "100%", position: "relative"}}>
                    {/*<button onClick={() => resetColumnFilters()}>Reset Filters</button>*/}
                    <button onClick={fun}>setColumnFilters</button>
                    {/*<Stack direction="row" sx={{pb: 2}}>*/}
                    {/*    /!*    {memoizedHeaderComponent && <Box>{memoizedHeaderComponent}</Box>}*!/*/}
                    {/*    <Box>*/}
                    {/*        <TextField*/}
                    {/*            sx={{*/}
                    {/*                m: 0,*/}
                    {/*                "& .MuiInputBase-root": {height: 34,}*/}
                    {/*            }}*/}
                    {/*            // onChange={debounce(handleSearchChange, 1000)}*/}
                    {/*            onChange={handleGlobalSearch}*/}
                    {/*            size="small"*/}
                    {/*            placeholder={searchPlaceholder}*/}
                    {/*            margin="normal"*/}
                    {/*            InputProps={{*/}
                    {/*                startAdornment: (*/}
                    {/*                    <InputAdornment position="start"><SearchIcon color="disabled"/></InputAdornment>*/}
                    {/*                ),*/}
                    {/*            }}*/}
                    {/*        />*/}
                    {/*    </Box>*/}
                    {/*    <Stack direction="row" sx={{flexGrow: 1, justifyContent: "flex-end", alignItems: "center"}}>*/}
                    {/*        /!*<Chip icon={<FilterListIcon/>} label="Filter" variant="outlined" clickable*!/*/}
                    {/*        /!*      onClick={() => onSetIsOpenFiltersModal(true)}/>*!/*/}
                    {/*    </Stack>*/}
                    {/*</Stack>*/}
                    <Paper
                        sx={{
                            height: "100%",
                            overflow: "auto",
                            position: "relative",
                            ...theme.mixins.niceScroll(),
                        }}
                    >
                        <MuiTable sx={{
                            borderRadius: 0,
                            position: "relative",
                            height: "100%",
                            minWidth: "100%",
                            width: getCenterTotalSize(),
                        }}>
                            {!isFetching && (
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
                                                            {header.column.getCanFilter() && (
                                                                <ColumnFilter
                                                                    key={header.id}
                                                                    table={table}
                                                                    column={header.column}
                                                                />
                                                            )}
                                                        </TableCell>
                                                    )}
                                                </>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableHead>
                            )}
                            {isFetching && (
                                <TableBodySkeleton
                                    columnCount={columnCount}
                                    skeletonRowCount={skeletonRowCount}
                                    skeletonRowHeight={skeletonRowHeight}
                                />
                            )}
                            {!isFetching && (
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
                            )}
                        </MuiTable>
                    </Paper>
                    <Grid container sx={{
                        alignItems: "center",
                        bgcolor: theme.palette.grey[100],
                        position: "sticky",
                        left: 0,
                        bottom: 0,
                        borderTop: `1px solid ${theme.palette.grey[300]}`,
                        justifyContent: "flex-end",
                    }}>
                        {/*{totalPages && onPageChange && (*/}
                        {/*    <StyledPagination*/}
                        {/*        count={totalPages} //The total number of pages.*/}
                        {/*        // page={currentPage}*/}
                        {/*        page={getState().pagination.pageIndex + 1}*/}
                        {/*        onChange={handleChangePage}*/}
                        {/*        color="primary"*/}
                        {/*        showFirstButton*/}
                        {/*        showLastButton*/}
                        {/*    />*/}
                        {/*)}*/}
                        {totalPages && onPaginationChange && (
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
                {/*<FiltersModal table={table} isOpen={isOpenFiltersModal} onSetIsOpen={onSetIsOpenFiltersModal}/>*/}
                <pre>{JSON.stringify(getState(), null, 2)}</pre>
            </>
        )
    };

    DataGrid.displayName = `${configs.name}.AllParts`;

    return DataGrid;
}

