import React, {FC, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DataGrid from "src/components/DataGridTanstack";
import {columns} from "./definition";
import {UserData} from "./API/response.dto";
import useDataGridPlaygroundAPI from "./hooks/useDataGridPlaygroundAPI";

const DataGridPlayground: FC = () => {
    const [currentPage, setCurrentPage] = useState<number | undefined>(1);
    const [search, setSearch] = useState<string | undefined>("");

    const {users, isFetching} = useDataGridPlaygroundAPI({search, currentPage});

    const Header = (
        <Box display="flex" justifyContent="space-between" sx={{pb: 1}}>
            <Typography variant="h4" alignItems="center">
                User Table
            </Typography>
            <Button>Action Button</Button>
        </Box>
    );

    return (
        <Box padding={3}>
            {Header}
            <DataGrid<UserData>
                isFetching={isFetching}
                data={users ?? []}
                columns={columns}
                totalPages={6}
                skeletonRowCount={10}
                onPageChange={(page) => setCurrentPage(page)}
                onSearch={(search) => setSearch(search)}
                onRowClick={(cell, row) => console.log({cell, row})}
            />
        </Box>
    );
};

export default DataGridPlayground;
