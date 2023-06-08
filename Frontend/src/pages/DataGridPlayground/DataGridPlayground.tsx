import React, {FC, useState} from 'react';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {UserData} from "./API/response.dto";
import useDataGridPlaygroundAPI from "./hooks/useDataGridPlaygroundAPI";
import {PageChangeParams} from "src/components/DataGridTanstack/types";
import UsersDataGrid from "./definition";
import {OnRowClick} from "src/components/DataGridTanstack/types";

const DataGridPlayground: FC = () => {
    const [pagination, setPagination] = useState<PageChangeParams>({pageIndex: 0, pageSize: 10});

    const {users, totalRows, isFetching} = useDataGridPlaygroundAPI({pagination});

    const handleOnRowClick: OnRowClick<UserData> = (cell, row) => console.log({cell, row})

    return (
        <Stack gap={1} sx={{p: 3, pb: 0}}>
            <Box sx={{height: `calc(100vh - 48px - 26px)`}}>
                <UsersDataGrid.Provider
                    data={users ?? []}
                    isFetching={isFetching}
                    totalRows={+totalRows}
                    // totalPages={Math.floor(totalRows / pagination.pageSize)}
                    onFetch={(pagination) => setPagination(pagination)}
                >
                    <UsersDataGrid.Toolbar>
                        <UsersDataGrid.Toolbar.Start>
                            <UsersDataGrid.SearchBox/>
                        </UsersDataGrid.Toolbar.Start>
                        <UsersDataGrid.Toolbar.End>
                            <UsersDataGrid.Filters/>
                        </UsersDataGrid.Toolbar.End>
                    </UsersDataGrid.Toolbar>
                    {/*<UsersDataGrid.Head/>*/}
                    <UsersDataGrid.Table onRowClick={handleOnRowClick}/>
                </UsersDataGrid.Provider>
            </Box>
        </Stack>
    )
};

export default DataGridPlayground;
