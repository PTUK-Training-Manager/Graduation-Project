import React, {
    FC,
    ChangeEvent,
    Context,
    MouseEvent,
    ReactNode,
    useMemo,
    useState,
    PropsWithChildren,
    Dispatch
} from "react";
import {DataGridContextValues, PageChangeParams} from "./types";
import {
    Cell,
    ColumnFiltersState,
    FilterFn,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Row,
    SortDirection,
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
    // onPaginationChange?: (params: PageChangeParams) => void; //for exposing the current page value to the outside of the table as a callback function.
    onFetch?: (params: PageChangeParams) => void; //for exposing the current page value to the outside of the table as a callback function.
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
            // onPaginationChange,
            onFetch,
            striped,
            isFetching,
            skeletonRowCount,
            skeletonRowHeight,
            headerComponent,
            // onRowClick,
            // searchPlaceholder,
            ...rest
        } = props;

        const dataMemoized = useMemo(() => data, [data]);

        const columnsMemoized = useMemo(() => columns, [columns]);

        const headerComponentMemoized = useMemo(
            () => headerComponent,
            [headerComponent]
        );

        const [pagination, setPagination] = useState<PageChangeParams>({pageIndex: 0, pageSize: 10});

        // const [currentPage, setCurrentPage] = useState(1);

        const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

        const [globalFilter, setGlobalFilter] = useState<string>("");

        const [isOpenFiltersModal, setIsOpenFiltersModal] = useState<boolean>(false);

        // ---
        // const onSetCurrentPage = (currentPage: number) => setCurrentPage(currentPage);

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
            setPageIndex(selectedPage); // This is from tanstack react-table
            // onPaginationChange?.({pageIndex: selectedPage, pageSize: getState().pagination.pageSize});
            onFetch?.({pageIndex: selectedPage, pageSize: getState().pagination.pageSize});
        };

        const handleFetchMore = () => {
            setPageIndex(getState().pagination.pageIndex + 1); // This is from tanstack react-table
            onFetch?.({
                ...getState().pagination,
                pageIndex: getState().pagination.pageIndex + 1,
            });
        };

        const handleChangeRowsPerPage = (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
            // onPaginationChange?.({
            //     pageIndex: getState().pagination.pageIndex,
            //     pageSize: parseInt(event.target.value, 10)
            // });
            onFetch?.({
                pageIndex: getState().pagination.pageIndex,
                pageSize: parseInt(event.target.value, 10)
            });
            setPageSize(parseInt(event.target.value, 10)); // This is from tanstack react-table
            // setCurrentPage(0);
        };

        // const onHandleGlobalSearch = (e: ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value);

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
            // currentPage,
            // onSetCurrentPage,
            columnFilters,
            globalFilter,
            isOpenFiltersModal,
            onSetColumnFilters: setColumnFilters,
            onSetGlobalFilter,
            onSetIsOpenFiltersModal,
            columnCount,
            handleChangePage,
            handleFetchMore,
            // onPaginationChange,
            onFetch,
            handleChangeRowsPerPage,
            // onHandleGlobalSearch,
            mapSortDirectionToIcon,
            totalRows,
            totalPages,
            isFetching,
            skeletonRowCount,
            skeletonRowHeight,
            striped
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

