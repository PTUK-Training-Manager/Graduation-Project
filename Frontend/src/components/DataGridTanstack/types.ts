import React, {
    Context,
    Dispatch,
    SetStateAction,
    ChangeEvent,
    InputHTMLAttributes,
    MouseEvent,
    PropsWithChildren
} from "react";
import {Cell, ColumnDef, ColumnFiltersState, Row, Table, SortDirection} from "@tanstack/react-table";

export interface DataGridProps<T> {
    totalPages?: number; // total number of pages
    totalRows?: number; // total number of rows (needed for MUI TablePagination)
    onRowClick?: (cell: Cell<T, unknown>, row: Row<T>) => void;
    searchPlaceholder?: string;
    isFetching?: boolean;
    skeletonRowCount?: number;
    skeletonRowHeight?: number;
    isRowClickable?: boolean;
    striped?: boolean;
}

export interface PageChangeParams {
    pageIndex: number;
    pageSize: number;
}

export interface StyledTableRowProps {
    isClickable?: boolean;
    striped?: boolean;
}

export interface DebouncedInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
}

export interface DataGridContextValues<T> {
    table: Table<any>;
    dataMemoized: T[];
    columnsMemoized: ColumnDef<T, unknown>[];
    headerComponentMemoized?: JSX.Element;
    isRowClickable?: boolean;
    currentPage: number;
    columnFilters: ColumnFiltersState;
    globalFilter: string;
    isOpenFiltersModal: boolean;
    onSetCurrentPage: (page: number) => void;
    onSetColumnFilters: (columnFiltersState: ColumnFiltersState) => void;
    onSetGlobalFilter: (globalFilter: string) => void;
    onSetIsOpenFiltersModal: (isOpenFiltersModal: boolean) => void;
    columnCount: number;
    handleChangePage?: (event: MouseEvent<HTMLButtonElement> | null, selectedPage: number) => void;
    handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onHandleGlobalSearch: (e: ChangeEvent<HTMLInputElement>) => void;
    mapSortDirectionToIcon: Record<SortDirection, React.ReactNode>;
}


export interface CreateDataGridOptions<T> {
    name: string;
    // data: T[];
    columns: ColumnDef<T>[];
    // totalPages?: number; // total number of pages
    // totalRows?: number; // total number of rows (needed for MUI TablePagination)
    // onPageChange?: (params: PageChangeParams) => void; //for exposing the current page value to the outside of the table as a callback function.
    // onRowClick?: (cell: Cell<T, unknown>, row: Row<T>) => void;
    // searchPlaceholder?: string;
    // headerComponent?: JSX.Element;
    // isFetching?: boolean;
    // skeletonRowCount?: number;
    // skeletonRowHeight?: number;
    // isRowClickable?: boolean;
    // striped?: boolean;
}

export interface CreateDataGridConfig<T> extends CreateDataGridOptions<T>, PropsWithChildren {
    Context: Context<DataGridContextValues<T>>;
}

