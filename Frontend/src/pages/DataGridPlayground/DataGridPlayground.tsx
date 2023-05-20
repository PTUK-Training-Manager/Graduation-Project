import React, {FC, useState} from 'react';
import {Box} from "@mui/material";
import DataGrid from "src/components/DataGridTanstack";
import {columns} from "./definition";
import {UserData} from "./API/response.dto";
import useDataGridPlaygroundAPI from "./hooks/useDataGridPlaygroundAPI";

const DataGridPlayground: FC = () => {
    const [currentPage, setCurrentPage] = useState<number | undefined>(1);
    const [search, setSearch] = useState<string | undefined>("");

    const {users, isFetching} = useDataGridPlaygroundAPI({search, currentPage});

    return (
        <Box padding={6}>
            <DataGrid<UserData>
                isFetching={isFetching}
                data={users ?? []}
                columns={columns}
                pageCount={6}
                onPageChange={(page) => setCurrentPage(page)}
                onSearch={(search) => setSearch(search)}
                onRowClick={(cell, row) => console.log({cell, row})}
            />
        </Box>
    );
};

export default DataGridPlayground;
