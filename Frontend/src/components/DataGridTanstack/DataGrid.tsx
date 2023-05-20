import React, {useState, useMemo, memo, ChangeEvent} from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableBodySkeleton from "./TableBodySkeleton";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {debounce} from "debounce";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from "@mui/material/InputAdornment";
import {DataGridProps} from "./types";
import {StyledPagination, StyledTableRow} from "./styled";

const DataGrid = <T extends any>(props: DataGridProps<T>) => {
    const {
        data,
        columns,
        totalPages,
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

    const memoizedData = useMemo(() => data, [data]);
    const memoizedColumns = useMemo(() => columns, [columns]);
    const memoizedHeaderComponent = useMemo(
        () => headerComponent,
        [headerComponent]
    );

    const isRowClickable = props.isRowClickable ?? Boolean(props.onRowClick);

    const [currentPage, setCurrentPage] = useState(1);

    const {getHeaderGroups, getRowModel, getAllColumns} = useReactTable({
        data: memoizedData,
        columns: memoizedColumns,
        // getCoreRowModel: getCoreRowModel(),
        getCoreRowModel: getCoreRowModel<T>(),
        manualPagination: true,
        pageCount: totalPages,
    });


    const columnCount = getAllColumns().length;

    const handlePageChange = (event: ChangeEvent<unknown>, selectedPage: number) => {
        const p = selectedPage === 0 ? 1 : selectedPage;
        setCurrentPage(p);
        onPageChange?.(p);
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        onSearch && onSearch?.(event.target.value);
    }


    return (
        <Paper elevation={2} style={{padding: "1rem 0px"}}>
            <Box paddingX="1rem">
                {memoizedHeaderComponent && <Box>{memoizedHeaderComponent}</Box>}
                {onSearch && (
                    <TextField
                        onChange={debounce(handleSearchChange, 1000)}
                        size="small"
                        placeholder={searchPlaceholder}
                        margin="normal"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start"><SearchIcon color="disabled"/></InputAdornment>
                            )
                        }}
                    />
                )}
            </Box>
            <Box style={{overflowX: "auto"}}>
                <MuiTable>
                    {!isFetching && (
                        <TableHead>
                            {getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableCell key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableCell>
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
                        <TableBody>
                            {getRowModel().rows.map((row) => (
                                <StyledTableRow key={row.id} striped={striped} isClickable={isRowClickable}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            onClick={() => onRowClick?.(cell, row)}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    )}
                </MuiTable>
            </Box>
            {totalPages && onPageChange && (
                <StyledPagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    showFirstButton
                    showLastButton
                />
            )}
        </Paper>
    );
};

export default memo(DataGrid) as typeof DataGrid;
