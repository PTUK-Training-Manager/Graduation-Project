import { useQuery } from '@tanstack/react-query';
import { getAllTrainings } from '../api';
import UsersDataGrid from 'src/pages/DataGridPaginatedPlayground/definition';
import { useState } from 'react';
import { DataGridFetchQuery } from 'src/components/DataGridTanstack/types';

const useAllTrainingsController = () => {
  const { data, isLoading, isFetching } = useQuery(
    ['AllTrainings'],
    () => getAllTrainings({ pageIndex: 0, pageSize: 999 }),
    {}
  );

  return {
    rows: data?.items ?? [],
    totalRows: data?.totalItems ?? -1,
    isFetching: isFetching || isLoading,
  };
};
export default useAllTrainingsController;
