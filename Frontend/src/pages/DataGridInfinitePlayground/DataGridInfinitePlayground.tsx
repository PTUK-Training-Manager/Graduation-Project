import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { UserData } from "./API/types";
import useInfiniteDataGridPlaygroundAPI from "./hooks/useInfiniteDataGridPlaygroundAPI";
import { PageChangeParams } from "src/components/DataGridTanstack/types";
import UsersDataGrid from "./definition";
import { OnRowClick } from "src/components/DataGridTanstack/types";

const DataGridPlayground: FC = () => {
  const { pageSize } = UsersDataGrid.configs;

  const [query] = useState<PageChangeParams>({ pageIndex: 0, pageSize });

  const { allRows, totalRows, isFetching, fetchNextPage } = useInfiniteDataGridPlaygroundAPI({
    query,
  });

  const handleOnRowClick: OnRowClick<UserData> = (cell, row) => console.log({ cell, row });

  return (
    <Stack gap={1} sx={{ p: 3, pb: 0 }}>
      <Box sx={{ height: `calc(100vh - 24px)` }}>
        <UsersDataGrid.Provider
          data={allRows}
          isFetching={isFetching}
          totalRows={+totalRows}
          // totalPages={Math.floor(totalRows / pagination.pageSize)}
          // onFetch={(pagination) => setPagination(pagination)}
          onFetch={() => fetchNextPage()}
        >
          <UsersDataGrid.Container>
            <UsersDataGrid.Toolbar>
              <UsersDataGrid.Toolbar.Start>
                <UsersDataGrid.SearchBox />
              </UsersDataGrid.Toolbar.Start>
              <UsersDataGrid.Toolbar.End>
                <UsersDataGrid.Filters />
              </UsersDataGrid.Toolbar.End>
            </UsersDataGrid.Toolbar>
            <UsersDataGrid.Table>
              <UsersDataGrid.Head />
              <UsersDataGrid.Body onRowClick={handleOnRowClick} />
              {/*<UsersDataGrid.Placeholder/>*/}
            </UsersDataGrid.Table>
            <UsersDataGrid.Footer />
          </UsersDataGrid.Container>
          {/*<UsersDataGrid.TableStateTree/>*/}
        </UsersDataGrid.Provider>
      </Box>
    </Stack>
  );
};

export default DataGridPlayground;
