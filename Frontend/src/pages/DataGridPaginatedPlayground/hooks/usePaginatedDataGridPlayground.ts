import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsersPaginated } from "../API";
import { generateRandomDate } from "src/components/DataGridTanstack/utils";
import { UsePaginatedDataGridPlaygroundAPIProps } from "../types";

const usePaginatedDataGridPlaygroundAPI = ({ query }: UsePaginatedDataGridPlaygroundAPIProps) => {
  const [totalRows, setTotalRows] = useState<number>(0);

  const { pageIndex, pageSize } = query;

  const { data, isFetching, isError, error, isSuccess } = useQuery(
    ["users", pageIndex, pageSize],
    () =>
      fetchUsersPaginated({ pageIndex: pageIndex ?? 0, pageSize }).then(res => {
        setTotalRows(res?.headers["x-total-count"] ?? 0);
        // return res?.data ?? [];
        const dataWithDates = res?.data?.map(user => ({
          ...user,
          birthDate: generateRandomDate("2000-01-01", "2023-12-31"),
        }));
        return dataWithDates ?? [];
      }),
    {
      keepPreviousData: true, //for a smooth transition between the pages in the table.
    }
  );

  return {
    rows: data ?? [],
    isFetching,
    isError,
    error,
    isSuccess,
    totalRows,
  };
};

export default usePaginatedDataGridPlaygroundAPI;
