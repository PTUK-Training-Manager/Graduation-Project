import React, {
  Context,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  InputHTMLAttributes,
  MouseEvent,
  PropsWithChildren,
  FC,
  ReactNode,
} from "react";
import {
  Cell,
  ColumnDef,
  ColumnFiltersState,
  Row,
  Table,
  SortDirection,
  CellContext,
} from "@tanstack/react-table";
import { BoxProps } from "@mui/material/Box";
import { GridProps } from "@mui/material/Grid";
import { TableBodyProps } from "@mui/material/TableBody";
import { TableContainerProps, TableHeadProps, TableProps } from "@mui/material";
import { RowData } from "@tanstack/table-core/src/types";

export type OnRowClick<T> = (cell: Cell<T, unknown>, row: Row<T>) => void;

export interface CompoundGridProps<T> extends FC<DataGridProviderProps<T>>, CompoundGridReturn<T> {}

export interface DataGridProviderProps<T> extends PropsWithChildren {
  data: T[];
  totalPages?: number; // total number of pages
  totalRows?: number; // total number of rows (needed for MUI TablePagination)
  onFetch?: (query: DataGridFetchQuery) => void; //for exposing the current page value to the outside of the table as a callback function.
  headerComponent?: JSX.Element;
  isFetching?: boolean;
  skeletonRowCount?: number;
  skeletonRowHeight?: number;
  striped?: boolean;
}

export interface DataGridTableProps extends PropsWithChildren {
  isFetching?: boolean;
  skeletonRowCount?: number;
  skeletonRowHeight?: number;
  striped?: boolean;
  TableContainerProps?: TableContainerProps;
  TableProps?: TableProps;
}

export interface DataGridHeadProps extends TableHeadProps {}

export interface DataGridContainerProps extends PropsWithChildren {}

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

export interface DebouncedInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
}

export interface DataGridContextValues<T> {
  table: Table<T>;
  dataMemoized: T[];
  columnsMemoized: ColumnDef<T>[];
  headerComponentMemoized?: JSX.Element;
  columnFilters: ColumnFiltersState;
  globalFilter: string;
  isOpenFiltersModal: boolean;
  onSetColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
  onSetGlobalFilter: (globalFilter: string) => void;
  onSetIsOpenFiltersModal: (isOpenFiltersModal: boolean) => void;
  columnCount: number;
  handleChangePage: (event: MouseEvent<HTMLButtonElement> | null, selectedPage: number) => void;
  handleFetchMore: () => void;
  onFetch?: (params: PageChangeParams) => void;
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  mapSortDirectionToIcon: Record<SortDirection, React.ReactNode>;
  totalPages?: number;
  totalRows?: number;
  isFetching?: boolean;
  skeletonRowCount?: number;
  skeletonRowHeight?: number;
  striped?: boolean; // for adding striped effect to the table
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
  Container: FC<DataGridContainerProps>;
  Head: FC<DataGridHeadProps>;
  Table: FC<DataGridTableProps>;
  Body: FC<DataGridBodyProps<T>>;
  Placeholder: FC<TableBodySkeletonProps>;
  Footer: FC;
  Filters: FC<FiltersModalProps>;
  SearchBox: FC<SearchBoxProps>;
  Toolbar: ToolbarLayoutProps;
  TableStateTree: FC;
  configs: Required<CreateDataGridOptions<T>> & { Context: Context<DataGridContextValues<T>> };
}

export interface ColumnFilterProps {
  columnId: string;
  index: number;
}

export interface ColumnFilterTextProps {
  columnId: string;
  index: number;
}

export interface ColumnFilterTextMultipleProps {
  columnId: string;
  index: number;
}

export interface ColumnFilterNumericProps {
  columnId: string;
  index: number;
}

export interface FiltersModalProps {}

export interface AutocompleteColumnOption {
  id: string;
  header: string;
}

export interface DataGridCellProps<TData extends RowData, TValue>
  extends CellContext<TData, TValue> {}

export interface EmptyBodyProps {
  message?: ReactNode;
}
