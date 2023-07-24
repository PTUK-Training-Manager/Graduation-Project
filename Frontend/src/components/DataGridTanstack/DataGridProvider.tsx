import React, { FC, MouseEvent, ReactNode, useMemo, useState } from "react";
import { DataGridContextValues, DataGridProviderProps } from "./types";
import {
  ColumnFiltersState,
  FilterFn,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortDirection,
  useReactTable,
} from "@tanstack/react-table";
import { fuzzyFilter, dateBetweenFilter } from "src/components/DataGridTanstack/utils";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { CreateDataGridConfigWithDefaults } from "./types";

export function makeDataGridProvider<T extends object>(
  configs: CreateDataGridConfigWithDefaults<T>
) {
  const { name, Context, columns, pageSize } = configs;

  const DataGridProvider: FC<DataGridProviderProps<T>> = props => {
    const {
      children,
      data,
      totalPages,
      totalRows,
      onFetch,
      striped,
      isFetching,
      skeletonRowCount,
      skeletonRowHeight,
      headerComponent,
    } = props;

    const dataMemoized = useMemo(() => data, [data]);

    const columnsMemoized = useMemo(() => columns, [columns]);

    const headerComponentMemoized = useMemo(() => headerComponent, [headerComponent]);

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const [globalFilter, setGlobalFilter] = useState<string>("");

    const [isOpenFiltersModal, setIsOpenFiltersModal] = useState<boolean>(false);

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
      onColumnFiltersChange: updaterOrValue => setColumnFilters(updaterOrValue),
      onGlobalFilterChange: updaterOrValue => setGlobalFilter(updaterOrValue),
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

    const { setPageSize, setPageIndex, getAllColumns, getState } = table;

    const columnCount = getAllColumns().length;

    const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, page: number) => {
      setPageIndex(page); // This is from tanstack react-table
      onFetch?.({ pageIndex: page, pageSize: getState().pagination.pageSize });
    };

    const handleFetchMore = () => {
      setPageIndex(getState().pagination.pageIndex + 1); // This is from tanstack react-table
      onFetch?.({
        ...getState().pagination,
        pageIndex: getState().pagination.pageIndex + 1,
      });
    };

    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      onFetch?.({
        pageIndex: 0,
        pageSize: parseInt(event.target.value),
      });
      setPageIndex(0);
      setPageSize(parseInt(event.target.value)); // This is from tanstack react-table
    };

    const mapSortDirectionToIcon: Record<SortDirection, ReactNode> = {
      asc: <ArrowUpwardIcon sx={{ fontSize: 18, color: "rgba(0,0,0,0.6)" }} />,
      desc: <ArrowDownwardIcon sx={{ fontSize: 18, color: "rgba(0,0,0,0.6)" }} />,
    };

    React.useEffect(() => {
      console.log("USE EFFECT PAGE SIZE");
      setPageSize(pageSize);
    }, [pageSize]);

    const contextValues: DataGridContextValues<T> = {
      table,
      dataMemoized,
      columnsMemoized,
      headerComponentMemoized,
      columnFilters,
      globalFilter,
      isOpenFiltersModal,
      onSetColumnFilters: setColumnFilters,
      onSetGlobalFilter,
      onSetIsOpenFiltersModal,
      columnCount,
      handleChangePage,
      handleFetchMore,
      onFetch,
      handleChangeRowsPerPage,
      mapSortDirectionToIcon,
      totalRows,
      totalPages,
      isFetching,
      skeletonRowCount,
      skeletonRowHeight,
      striped,
    };

    return <Context.Provider value={contextValues}>{children}</Context.Provider>;
  };

  DataGridProvider.displayName = `${name}.Provider`;
  return DataGridProvider;
}
