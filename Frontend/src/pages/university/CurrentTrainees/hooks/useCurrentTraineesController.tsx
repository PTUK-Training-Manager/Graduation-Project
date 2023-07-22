import { useQuery } from '@tanstack/react-query';
import { getCurrentTrainees } from '../api';
import UsersDataGrid from 'src/pages/DataGridPaginatedPlayground/definition';
import { useState } from 'react';
import { DataGridFetchQuery } from 'src/components/DataGridTanstack/types';

const useCurrentTrainees = () => {
  const { pageSize: initialPageSize } = UsersDataGrid.configs;
  const [pagination, setPagination] = useState<DataGridFetchQuery>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  const { pageIndex, pageSize } = pagination;

  const { data, isLoading, isFetching } = useQuery(
    ['CurrentTrainees', pageIndex, pageSize],
    () => getCurrentTrainees({ pageIndex, pageSize }),
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

export default useCurrentTrainees;
