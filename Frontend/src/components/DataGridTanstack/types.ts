import {Cell, ColumnDef, Row} from "@tanstack/react-table";

export interface DataGridProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
    totalPages?: number; // total number of pages
    totalRows?: number; // total number of rows (needed for MUI TablePagination)
    onPageChange?: (params: PageChangeParams) => void; //for exposing the current page value to the outside of the table as a callback function.
    onSearch?: (search: string) => void;
    onRowClick?: (cell: Cell<T, unknown>, row: Row<T>) => void;
    searchPlaceholder?: string;
    headerComponent?: JSX.Element;
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