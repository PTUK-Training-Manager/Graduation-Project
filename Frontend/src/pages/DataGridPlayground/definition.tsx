import {Chip} from "@mui/material";
import {ColumnDef} from "@tanstack/react-table";
import {UserData} from "./API/response.dto";
import {createDataGrid} from "src/components/DataGridTanstack";

export const columns: ColumnDef<UserData, any>[] = [
    {
        accessorKey: "id",
        header: "ID",
        // maxSize: 40,
        // filterFn: "includesString",
        size: 50,
    },
    {
        accessorKey: "name",
        header: "Name",
        size: 300,
        filterFn: "arrIncludesSome",
    },
    {
        accessorKey: "email",
        header: "Email",
        size: 250,
    },
    {
        accessorKey: "body",
        header: "Body",
        minSize: 400,
        // size: "auto",
    },
    {
        accessorKey: "postId",
        header: "Post ID",
        // filterFn: "includesString",
        cell: (row) => {

            return (
                <Chip
                    label={row.getValue()}
                    size="small"
                    color={row.getValue() > 1 ? "primary" : "default"}
                />
            );
        },
    },
];

const UsersDataGrid = createDataGrid<UserData>({
    name: "DataGridPlayground",
    columns,
    // shouldFlexGrowCells: true,
});

export default UsersDataGrid;