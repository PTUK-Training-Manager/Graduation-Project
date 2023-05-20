import {Cell, ColumnDef, Row} from "@tanstack/react-table";

export interface DataGridProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
    totalPages?: number; // total number of pages
    onPageChange?: (page: number) => void; //for exposing the current page value to the outside of the table as a callback function.
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

export interface StyledTableRowProps {
    isClickable?: boolean;
    striped?: boolean;
}