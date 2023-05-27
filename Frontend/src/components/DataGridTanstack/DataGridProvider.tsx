import React, {FC, ChangeEvent, Context, MouseEvent, ReactNode, useMemo, useState, PropsWithChildren} from "react";
import {DataGridContextValues, PageChangeParams} from "./types";
import {
    Cell,
    ColumnFiltersState,
    FilterFn,
    getCoreRowModel, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues,
    getFilteredRowModel, getPaginationRowModel,
    getSortedRowModel, Row, SortDirection,
    useReactTable
} from "@tanstack/react-table";
import {fuzzyFilter} from "src/components/DataGridTanstack/utils";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {CreateDataGridConfig} from "./types";

export interface DataGridProviderProps<T> extends PropsWithChildren {
    data: T[];
    totalPages?: number; // total number of pages
    totalRows?: number; // total number of rows (needed for MUI TablePagination)
    onPaginationChange?: (params: PageChangeParams) => void; //for exposing the current page value to the outside of the table as a callback function.
    // onRowClick?: (cell: Cell<T, unknown>, row: Row<T>) => void;
    // searchPlaceholder?: string;
    headerComponent?: JSX.Element;
    isFetching?: boolean;
    skeletonRowCount?: number;
    skeletonRowHeight?: number;
    striped?: boolean;
}


export function makeDataGridProvider<T extends object>(configs: CreateDataGridConfig<T>) {
    const {
        name,
        // children,
        Context,
        columns,
    } = configs;

    const DataGridProvider: FC<DataGridProviderProps<T>> = (props) => {
        const {
            children,
            data,
            totalPages,
            totalRows,
            onPaginationChange,
            striped,
            isFetching,
            skeletonRowCount,
            skeletonRowHeight,
            headerComponent,
            // onRowClick,
            // searchPlaceholder,
            ...rest
        } = props;
        console.log(props);
        console.log({
            totalPages,
            totalRows,
        });

        const dataMemoized = useMemo(() => data, [data]);

        const columnsMemoized = useMemo(() => columns, [columns]);

        const headerComponentMemoized = useMemo(
            () => headerComponent,
            [headerComponent]
        );

        const [currentPage, setCurrentPage] = useState(1);

        const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

        const [globalFilter, setGlobalFilter] = useState<string>("");

        const [isOpenFiltersModal, setIsOpenFiltersModal] = useState<boolean>(false);

        // ---
        const onSetCurrentPage = (currentPage: number) => setCurrentPage(currentPage);

        const onSetColumnFilters = (columnFilters: ColumnFiltersState) => setColumnFilters(columnFilters);

        const onSetGlobalFilter = (globalFilter: string) => setGlobalFilter(globalFilter);

        const onSetIsOpenFiltersModal = (isOpen: boolean) => setIsOpenFiltersModal(isOpen);

        const table = useReactTable({
            data: dataMemoized,
            columns: columnsMemoized,
            columnResizeMode: "onChange",
            filterFns: {
                fuzzy: fuzzyFilter,
            },
            globalFilterFn: fuzzyFilter as FilterFn<T>,
            state: {
                columnFilters,
                globalFilter,
            },
            onColumnFiltersChange: (updaterOrValue) => setColumnFilters(updaterOrValue),
            onGlobalFilterChange: (updaterOrValue) => setGlobalFilter(updaterOrValue),
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

        const handleChangePage = (
            event: MouseEvent<HTMLButtonElement> | null,
            selectedPage: number,
        ) => {
            console.log({selectedPage});
            const p = selectedPage === 0 ? 1 : selectedPage;
            // setCurrentPage(selectedPage);
            setPageIndex(selectedPage);
            onPaginationChange?.({pageIndex: selectedPage, pageSize: getState().pagination.pageSize});
        };

        const handleChangeRowsPerPage = (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
            onPaginationChange?.({
                pageIndex: getState().pagination.pageIndex,
                pageSize: parseInt(event.target.value, 10)
            });
            setPageSize(parseInt(event.target.value, 10));
            // setCurrentPage(0);
        };

        const onHandleGlobalSearch = (e: ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value);

        const mapSortDirectionToIcon: Record<SortDirection, ReactNode> = {
            asc: <ArrowUpwardIcon sx={{fontSize: 18, color: "rgba(0,0,0,0.6)"}}/>,
            desc: <ArrowDownwardIcon sx={{fontSize: 18, color: "rgba(0,0,0,0.6)"}}/>,
        }

        const contextValues: DataGridContextValues<T> = {
            table,
            dataMemoized,
            columnsMemoized,
            headerComponentMemoized,
            // isRowClickable,
            currentPage,
            columnFilters,
            globalFilter,
            isOpenFiltersModal,
            onSetCurrentPage,
            onSetColumnFilters,
            onSetGlobalFilter,
            onSetIsOpenFiltersModal,
            columnCount,
            handleChangePage,
            onPaginationChange,
            handleChangeRowsPerPage,
            onHandleGlobalSearch,
            mapSortDirectionToIcon,
            totalRows,
            totalPages,
        }

        return (
            <Context.Provider value={contextValues}>
                {children}
            </Context.Provider>
        )
    }

    DataGridProvider.displayName = `${name}.Provider`;
    return DataGridProvider;
}

