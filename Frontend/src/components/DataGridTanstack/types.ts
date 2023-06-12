import React, {
    Context,
    Dispatch,
    SetStateAction,
    ChangeEvent,
    InputHTMLAttributes,
    MouseEvent,
    PropsWithChildren, FC
} from "react";
import {Cell, ColumnDef, ColumnFiltersState, Row, Table, SortDirection, Column} from "@tanstack/react-table";
import {BoxProps} from "@mui/material/Box";
import {GridProps} from "@mui/material/Grid";
import { TableBodyProps } from "@mui/material/TableBody";
import {TableContainerProps, TableHeadProps, TableProps} from "@mui/material";

export type OnRowClick<T> = (cell: Cell<T, unknown>, row: Row<T>) => void;

export interface CompoundGridProps<T> extends FC<DataGridProviderProps<T>>, CompoundGridReturn<T> {}

export interface DataGridProviderProps<T> extends PropsWithChildren {
    data: T[];
    totalPages?: number; // total number of pages
    totalRows?: number; // total number of rows (needed for MUI TablePagination)
    // onPaginationChange?: (params: PageChangeParams) => void; //for exposing the current page value to the outside of the table as a callback function.
    onFetch?: (query: DataGridFetchQuery) => void; //for exposing the current page value to the outside of the table as a callback function.
    // onRowClick?: (cell: Cell<T, unknown>, row: Row<T>) => void;
    // searchPlaceholder?: string;
    headerComponent?: JSX.Element;
    isFetching?: boolean;
    skeletonRowCount?: number;
    skeletonRowHeight?: number;
    striped?: boolean;
}

export interface DataGridTableProps<T> extends PropsWithChildren {
    // totalPages?: number; // total number of pages
    // totalRows?: number; // total number of rows (needed for MUI TablePagination)
    // onRowClick?: OnRowClick<T>;
    // isRowClickable?: boolean;
    // searchPlaceholder?: string;
    isFetching?: boolean;
    skeletonRowCount?: number;
    skeletonRowHeight?: number;
    striped?: boolean;
    TableContainerProps?: TableContainerProps;
    TableProps?: TableProps;
}

export interface DataGridHeadProps<T> extends TableHeadProps {
}

export interface DataGridContainerProps<T> extends PropsWithChildren {}

export interface DataGridBodyProps<T> extends TableBodyProps {
    onRowClick?: OnRowClick<T>;
    isRowClickable?: boolean;
    skeletonRowHeight?: number;
    skeletonRowCount?: number;
}

export interface TableBodySkeletonProps {
    rowsCount?: number;
    skeletonRowHeight?: number;
}

export interface PageChangeParams {
    pageIndex: number;
    pageSize: number;
}

export interface DataGridFetchQuery {
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
    // isRowClickable?: boolean;
    // currentPage: number;
    // onSetCurrentPage: (page: number) => void;
    columnFilters: ColumnFiltersState;
    globalFilter: string;
    isOpenFiltersModal: boolean;
    // onSetColumnFilters: (columnFiltersState: ColumnFiltersState) => void;
    onSetColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
    onSetGlobalFilter: (globalFilter: string) => void;
    onSetIsOpenFiltersModal: (isOpenFiltersModal: boolean) => void;
    columnCount: number;
    handleChangePage: (event: MouseEvent<HTMLButtonElement> | null, selectedPage: number) => void;
    handleFetchMore: () => void;
    // onPaginationChange?: (params: PageChangeParams) => void;
    onFetch?: (params: PageChangeParams) => void;
    handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    // onHandleGlobalSearch: (e: ChangeEvent<HTMLInputElement>) => void;
    mapSortDirectionToIcon: Record<SortDirection, React.ReactNode>;
    totalPages?: number,
    totalRows?: number,
    isFetching?: boolean,
    skeletonRowCount?: number,
    skeletonRowHeight?: number,
    striped?: boolean, // for adding striped effect to the table
}


export interface CreateDataGridOptions<T> {
    name: string;
    columns: ColumnDef<T>[];
    shouldFlexGrowCells?: boolean;
    pagination?: "on" | "off"; // when `off`, infinite scroll will be used
    pageSize?: number; // page size
}

export interface CreateDataGridConfig<T> extends CreateDataGridOptions<T> {
    Context: Context<DataGridContextValues<T>>;
}

export interface CreateDataGridConfigWithDefaults<T> extends Required<CreateDataGridOptions<T>> {
    Context: Context<DataGridContextValues<T>>;
}

export interface SearchBoxProps {
    searchPlaceholder?: string;
}

export interface ToolbarLayoutProps extends FC<BoxProps> {
    Start: FC<BoxProps>;
    End: FC<BoxProps>;
}

export interface FooterSkeletonProps extends FC<GridProps> {
    Start: FC<BoxProps>;
    End: FC<BoxProps>;
}

export interface DataGridInfiniteFooterProps {}

export interface DataGridPaginatedFooterProps {}

export interface CompoundGridReturn<T> {
    Provider: FC<DataGridProviderProps<T>>;
    Context: Context<DataGridContextValues<T>>;
    Container: FC<DataGridContainerProps<T>>;
    Head: FC<DataGridHeadProps<T>>;
    Table: FC<DataGridTableProps<T>>;
    Body: FC<DataGridBodyProps<T>>;
    Placeholder: FC<TableBodySkeletonProps>;
    Footer: FC;
    Filters: FC<FiltersModalProps<T>>;
    SearchBox: FC<SearchBoxProps>;
    Toolbar: ToolbarLayoutProps;
    TableStateTree: FC;
    configs: Required<CreateDataGridOptions<T>> & { Context: Context<DataGridContextValues<T>> };
}

export interface ColumnFilterProps<T> {
    // table: Table<T>;
    // column: Column<T>;
    columnId: string;
    index: number;
}

export interface ColumnFilterTextProps<T> {
    // column: Column<T>;
    columnId: string;
    index: number;
}

export interface ColumnFilterTextMultipleProps<T> {
    // column: Column<T>;
    columnId: string;
    index: number;
}

export interface ColumnFilterNumericProps<T> {
    // column: Column<T>;
    columnId: string;
    index: number;
}

export interface FiltersModalProps<T> {
}

export interface AutocompleteColumnOption {
    id: string;
    header: string;
}

