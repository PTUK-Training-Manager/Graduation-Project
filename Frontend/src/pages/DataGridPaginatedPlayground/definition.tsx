import React from "react";
import Chip from "@mui/material/Chip";
import { ColumnDef } from "@tanstack/react-table";
import { UserData } from "./API/types";
import { createDataGrid } from "src/components/DataGridTanstack";

export const columns: ColumnDef<UserData>[] = [
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
    cell: row => {
      const postId = row.getValue() as number;
      return <Chip label={postId} size="small" color={postId > 1 ? "primary" : "default"} />;
    },
  },
  {
    accessorKey: "birthDate",
    header: "Birth Date",
    filterFn: "dateBetween",
  },
];

const UsersDataGrid = createDataGrid({
  name: "DataGridPlayground",
  columns,
  pageSize: 15,
  // pagination: "on", // No need, "on" is the default
  // shouldFlexGrowCells: true,
});

export default UsersDataGrid;
