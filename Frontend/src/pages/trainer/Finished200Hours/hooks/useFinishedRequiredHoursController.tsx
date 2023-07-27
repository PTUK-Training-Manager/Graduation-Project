import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getTraineesFinishedRequiredHours } from '../api';
import { UseInfiniteDataGridPlaygroundAPIProps } from '../types';

const useFinishedRequiredHoursController = ({
  query,
}: UseInfiniteDataGridPlaygroundAPIProps) => {
  const { data, error, isFetching, fetchNextPage, isError, isSuccess } =
    useInfiniteQuery({
      queryKey: ['FinidhedRequiredHours'],
      queryFn: ({ pageParam = 0 }) => {
        return getTraineesFinishedRequiredHours({
          pageIndex: pageParam ?? 0,
          pageSize: query?.pageSize ?? 20,
        });
      },
      getNextPageParam: (lastPage, allPages) => allPages?.length ?? 0, // because first page is 0, not 1
      keepPreviousData: true, //for a smooth transition between the pages in the table.
    });
  console.log(data);
  const allRows = useMemo(
    () => data?.pages?.flatMap((page) => page.items) ?? [],
    [data]
  );

  console.log(allRows);
  return {
    allRows,
    isFetching,
    isError,
    error,
    isSuccess,
    fetchNextPage,
  };
};

export default useFinishedRequiredHoursController;
