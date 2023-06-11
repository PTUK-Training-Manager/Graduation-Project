import {Chip, IconButton} from "@mui/material";
import {ColumnDef} from "@tanstack/react-table";
import { RunningTraineesData } from "./api/response.dto"; 
import {createDataGrid} from "src/components/DataGridTanstack";
import {Feed} from "@mui/icons-material";


export const columns: ColumnDef<RunningTraineesData, any>[] = [
    {
        accessorKey: "studentId",
        header: "Student Number",
        filterFn: "includesString",
        size: 372,
    },
    {
        accessorKey: "name",
        header: "Student Name",
        size: 372,
        filterFn: "arrIncludesSome",
    },
    {
        accessorKey: "name",
        header: "Company Name",
        size: 372,
    },
    {
        accessorKey: "progressForm",
        header: "Progress Form",
        size: 372,
        cell: (row) => {
            return (
                <IconButton sx={{ml: 3.5}} aria-label="progress form" 
                >
                    <Feed
                    color="warning"
                        sx={{
                            borderRadius: '5px',
                            className: "manage-icon"
                        }}
                    />
                </IconButton>
            );
        },
    },
];

const UsersDataGrid = createDataGrid<RunningTraineesData>({
    name: "DataGridRunningTrainees",
    columns,
});

export default UsersDataGrid;