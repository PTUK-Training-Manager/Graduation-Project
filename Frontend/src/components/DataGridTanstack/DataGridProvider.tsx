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
import {DataGridContextValues, CompoundGridReturn, PageChangeParams, DataGridProviderProps} from "./types";
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
import {fuzzyFilter, dateBetweenFilter} from "src/components/DataGridTanstack/utils";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {CreateDataGridConfigWithDefaults} from "./types";

export function makeDataGridProvider<T extends object>(configs: CreateDataGridConfigWithDefaults<T>) {
    const {
        name,
        // children,
        Context,
        columns,
        pageSize,
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

        const [pagination, setPagination] = useState<PageChangeParams>({pageIndex: 0, pageSize});
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
                dateBetween: dateBetweenFilter,
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
            // autoResetPageIndex: false,
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
            page: number,
        ) => {
            // console.log({page});
            console.log(getState().pagination);
            const p = page === 0 ? 1 : page;
            setPageIndex(page); // This is from tanstack react-table
            // onPaginationChange?.({pageIndex: page, pageSize: getState().pagination.pageSize});
            onFetch?.({pageIndex: page, pageSize: getState().pagination.pageSize});
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
                // pageIndex: getState().pagination.pageIndex,
                pageIndex: 0,
                pageSize: parseInt(event.target.value)
            });
            // setPageIndex(getState().pagination.pageIndex);
            setPageIndex(0);
            setPageSize(parseInt(event.target.value)); // This is from tanstack react-table
            // setCurrentPage(0);
        };

        // const onHandleGlobalSearch = (e: ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value);

        const mapSortDirectionToIcon: Record<SortDirection, ReactNode> = {
            asc: <ArrowUpwardIcon sx={{fontSize: 18, color: "rgba(0,0,0,0.6)"}}/>,
            desc: <ArrowDownwardIcon sx={{fontSize: 18, color: "rgba(0,0,0,0.6)"}}/>,
        }

        React.useEffect(() => {
            console.log("USE EFFECT PAGE SIZE");
            setPageSize(pageSize);
        }, [pageSize]);

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

