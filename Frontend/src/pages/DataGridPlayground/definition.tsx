import {Chip} from "@mui/material";
import {ColumnDef, ColumnDefBase} from "@tanstack/react-table";
import {UserData} from "./API/response.dto";


export const columns: ColumnDef<UserData, any>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "gender",
        header: "Gender",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: (row) => {
            return (
                <Chip
                    label={row.getValue()}
                    size="small"
                    color={row.getValue() === "active" ? "primary" : "default"}
                />
            );
        },
    },
];