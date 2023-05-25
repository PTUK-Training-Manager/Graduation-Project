import {Chip} from "@mui/material";
import {ColumnDef} from "@tanstack/react-table";
import {UserData} from "./API/response.dto";


export const columns: ColumnDef<UserData, any>[] = [
    {
        accessorKey: "id",
        header: "ID",
        // maxSize: 40,
        // size: 300,
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "body",
        header: "Body",
        // size: 1000,
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
];