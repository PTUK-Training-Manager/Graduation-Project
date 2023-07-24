import { useQuery } from "@tanstack/react-query";
import { getAcceptedTrainings } from "../api";
import UsersDataGrid from "src/pages/DataGridPaginatedPlayground/definition";
import { useState } from "react";
import { DataGridFetchQuery } from "src/components/DataGridTanstack/types";

const useAcceptedRequestsController = () => {
  const { pageSize: initialPageSize } = UsersDataGrid.configs;
  const [pagination, setPagination] = useState<DataGridFetchQuery>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  const { pageIndex, pageSize } = pagination;

  const { data, isLoading, isFetching } = useQuery(
    ["AcceptedTrainings", pageIndex, pageSize],
    () => getAcceptedTrainings({ pageIndex, pageSize }),
    {}
  );

  const onGetDataGrid = (query: DataGridFetchQuery) => setPagination(query);

  return {
    rows: data?.items ?? [],
    totalRows: data?.totalItems ?? -1,
    onGetDataGrid,
    isFetching: isFetching || isLoading,
  };
};

export default useAcceptedRequestsController;
