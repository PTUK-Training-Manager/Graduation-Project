import Chip from "@mui/material/Chip";
import {ColumnDef} from "@tanstack/react-table";
import {UserData} from "./API/types";
import {createDataGrid} from "src/components/DataGridTanstack";

export const columns: ColumnDef<UserData, any>[] = [
    {
        accessorKey: "id",
        header: "ID",
        // maxSize: 40,
        // filterFn: "includesString",
        size: 100,
        filterFn: "inNumberRange",
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
        // minSize: 400,
        filterFn: "dateBetween",
        // size: "auto",
    },
    {
        accessorKey: "postId",
        header: "Post ID",
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
    {
        accessorKey: "birthDate",
        header: "Birth Date",
        filterFn: "dateBetween",
    }
];

const UsersDataGrid = createDataGrid({
    name: "DataGridPlayground",
    columns,
    pageSize: 15,
    // pagination: "on", // No need, "on" is the default
    // shouldFlexGrowCells: true,
});

export default UsersDataGrid;