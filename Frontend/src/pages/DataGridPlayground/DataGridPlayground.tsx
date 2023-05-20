import React, {FC, useState} from 'react';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DataGrid from "src/components/DataGridTanstack";
import {columns} from "./definition";
import {UserData} from "./API/response.dto";
import useDataGridPlaygroundAPI from "./hooks/useDataGridPlaygroundAPI";
import {PageChangeParams} from "src/components/DataGridTanstack/types";

const DataGridPlayground: FC = () => {
    const [pagination, setPagination] = useState<PageChangeParams>({pageIndex: 0, pageSize: 10});
    const [search, setSearch] = useState<string | undefined>("");

    const {users, totalRows, isFetching} = useDataGridPlaygroundAPI({search, pagination});

    const Header = (
        <Box display="flex" justifyContent="space-between">
            <Typography variant="h4" alignItems="center">
                User Table
            </Typography>
            <Button>Action Button</Button>
        </Box>
    );


    return (
        <Stack gap={1} sx={{p: 3, pb: 0}}>
            {Header}
            <Box sx={{height: `calc(100vh - 48px - 26px)`}}>
                <DataGrid<UserData>
                    isFetching={isFetching}
                    data={users ?? []}
                    columns={columns}
                    totalPages={Math.floor(totalRows / pagination.pageSize)}
                    totalRows={totalRows}
                    skeletonRowCount={10}
                    onPageChange={(pagination) => setPagination(pagination)}
                    onSearch={(search) => setSearch(search)}
                    onRowClick={(cell, row) => console.log({cell, row})}
                />
            </Box>
        </Stack>
    );
};

export default DataGridPlayground;
