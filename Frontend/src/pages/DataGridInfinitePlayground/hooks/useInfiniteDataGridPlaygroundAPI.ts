import { useState, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsersInfinite } from "../API";
import { generateRandomDate } from "src/components/DataGridTanstack/utils";
import { UseInfiniteDataGridPlaygroundAPIProps } from "../types";

const useInfiniteDataGridPlaygroundAPI = ({ query }: UseInfiniteDataGridPlaygroundAPIProps) => {
  const [totalRows, setTotalRows] = useState<number>(0);

  const { data, error, isFetching, fetchNextPage, isError, isSuccess } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: ({ pageParam = 0 }) => {
      return fetchUsersInfinite({
        pageIndex: pageParam ?? 0,
        pageSize: query?.pageSize ?? 20,
      }).then(res => {
        setTotalRows(res?.headers["x-total-count"] ?? 0);
        // return res?.data ?? [];
        const dataWithDates = res?.data?.map(user => ({
          ...user,
          birthDate: generateRandomDate("2000-01-01", "2023-12-31"),
        }));
        return dataWithDates ?? [];
      });
    },
    getNextPageParam: (lastPage, allPages) => allPages?.length ?? 0, // because first page is 0, not 1
    keepPreviousData: true, //for a smooth transition between the pages in the table.
  });

  const allRows = useMemo(() => data?.pages?.flatMap(page => page) ?? [], [data]);

  return {
    allRows,
    isFetching,
    isError,
    error,
    isSuccess,
    totalRows,
    fetchNextPage,
  };
};

export default useInfiniteDataGridPlaygroundAPI;
