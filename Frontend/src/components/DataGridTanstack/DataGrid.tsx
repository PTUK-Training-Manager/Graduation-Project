import React, {useState, useMemo, memo, ChangeEvent, MouseEvent, ReactNode} from 'react';
import Box from "@mui/material/Box";
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

const DataGrid = <T extends any>(props: DataGridProps<T>) => {
    const {
        data,
        columns,
        totalPages,
        totalRows,
        onPageChange,
        onSearch,
        onRowClick,
        searchPlaceholder = "Search",
        headerComponent,
        isFetching,
        skeletonRowCount = 4,
        skeletonRowHeight = 28,
        striped = false, // for adding striped effect to the table
    } = props;

    const classes = useStyles();

    const memoizedData = useMemo(() => data, [data]);
    const memoizedColumns = useMemo(() => columns, [columns]);
    const memoizedHeaderComponent = useMemo(
        () => headerComponent,
        [headerComponent]
    );

    const isRowClickable = props.isRowClickable ?? Boolean(props.onRowClick);

    const [currentPage, setCurrentPage] = useState(1);

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const [globalFilter, setGlobalFilter] = useState<string>("");

    const fuzzyFilter: FilterFn<T> = (row, columnId, value, addMeta) => {
        // Rank the item
        const itemRank = rankItem(row.getValue(columnId), value)

        // Store the itemRank info
        addMeta({
            itemRank,
        })

        // Return if the item should be filtered in/out
        return itemRank.passed
    }

    const {
        getHeaderGroups,
        getRowModel,
        getPrePaginationRowModel,
        setPageSize,
        setPageIndex,
        getAllColumns,
        getState,
        getCenterTotalSize,
    } = useReactTable({
        data: memoizedData,
        columns: memoizedColumns,
        columnResizeMode: "onChange",
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        globalFilterFn: fuzzyFilter,
        state: {
            columnFilters,
            globalFilter,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        // getCoreRowModel: getCoreRowModel(),
        getCoreRowModel: getCoreRowModel<T>(),
        getFilteredRowModel: getFilteredRowModel<T>(),
        getSortedRowModel: getSortedRowModel<T>(),
        getPaginationRowModel: getPaginationRowModel<T>(),
        getFacetedRowModel: getFacetedRowModel<T>(),
        getFacetedUniqueValues: getFacetedUniqueValues<T>(),
        getFacetedMinMaxValues: getFacetedMinMaxValues<T>(),
        manualPagination: true,
        pageCount: totalPages,
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
    });

    const columnCount = getAllColumns().length;

    const handleChangePage = (event: ChangeEvent<unknown>, selectedPage: number) => {
        // setCurrentPage(selectedPage);
        setPageIndex(selectedPage - 1);
        onPageChange?.({pageIndex: (selectedPage - 1), pageSize: getState().pagination.pageSize});
    };

    const handleChangePage2 = (
        event: MouseEvent<HTMLButtonElement> | null,
        selectedPage: number,
    ) => {
        const p = selectedPage === 0 ? 1 : selectedPage;
        // setCurrentPage(selectedPage);
        setPageIndex(selectedPage);
        onPageChange?.({pageIndex: selectedPage, pageSize: getState().pagination.pageSize});
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        onPageChange?.({pageIndex: getState().pagination.pageIndex, pageSize: parseInt(event.target.value, 10)});
        setPageSize(parseInt(event.target.value, 10));
        // setCurrentPage(0);
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        onSearch && onSearch?.(event.target.value);
    }

    const mapSortDirToIcon: Record<SortDirection, ReactNode> = {
        asc: <ArrowUpwardIcon sx={{fontSize: 18, color: "rgba(0,0,0,0.6)"}}/>,
        desc: <ArrowDownwardIcon sx={{fontSize: 18, color: "rgba(0,0,0,0.6)"}}/>,
    }

    return (
        <Stack
            sx={{
                height: "100%",
                position: "relative",
            }}
            // sx={{height: "100%", position: "relative", overflow: "auto", ...theme.mixins.niceScroll()}}
        >
            {/*<Box sx={{*/}
            {/*    pb: 1,*/}
            {/*}}>*/}
            {/*    {memoizedHeaderComponent && <Box>{memoizedHeaderComponent}</Box>}*/}
            {/*    {onSearch && (*/}
            {/*        <TextField*/}
            {/*            sx={{*/}
            {/*                m: 0,*/}
            {/*                "& .MuiInputBase-root": {height: 34,}*/}
            {/*            }}*/}
            {/*            onChange={debounce(handleSearchChange, 1000)}*/}
            {/*            size="small"*/}
            {/*            placeholder={searchPlaceholder}*/}
            {/*            margin="normal"*/}
            {/*            InputProps={{*/}
            {/*                startAdornment: (*/}
            {/*                    <InputAdornment position="start"><SearchIcon color="disabled"/></InputAdornment>*/}
            {/*                ),*/}
            {/*            }}*/}
            {/*        />*/}
            {/*    )}*/}
            {/*</Box>*/}
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
                    width: getCenterTotalSize()
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
                                                        {header.column.getCanFilter() && !header.column.getIsSorted() && (
                                                            <ArrowUpwardIcon
                                                                id="sortable-indicator"
                                                                color="disabled"
                                                                sx={{
                                                                    transition: "0.5s all",
                                                                    fontSize: 18,
                                                                    opacity: 0,
                                                                }}/>
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
                                    isClickable={isRowClickable}
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
                {totalPages && onPageChange && (
                    <TablePagination
                        size="small"
                        component="div"
                        count={totalRows ?? -1} //The total number of rows.
                        page={getState().pagination.pageIndex}
                        onPageChange={handleChangePage2}
                        rowsPerPage={getState().pagination.pageSize}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="page size"
                        showFirstButton
                        showLastButton
                    />
                )}
            </Grid>
            {/*<pre>{JSON.stringify(getState(), null, 2)}</pre>*/}
        </Stack>
    )
};

export default memo(DataGrid) as typeof DataGrid;