import React, { useContext } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import { DataGridTableProps } from "./types";
import theme from "src/styling/customTheme";
import { CreateDataGridConfigWithDefaults } from "./types";

export function makeDataGridTable<T extends object>(configs: CreateDataGridConfigWithDefaults<T>) {
  const DataGridTable = (props: DataGridTableProps) => {
    const { children, TableContainerProps, TableProps } = props;

    const { table } = useContext(configs.Context);

    const { getTotalSize } = table;

    return (
      <TableContainer
        component={Paper}
        sx={{
          height: "100%",
          // overflow: "auto",
          position: "relative",
          borderRadius: "4px 4px 0 0",
          ...theme.mixins.niceScroll(),
        }}
        {...TableContainerProps}
      >
        <Table
          sx={{
            // borderRadius: 0,
            position: "relative",
            height: "100%",
            minWidth: "100%",
            width: getTotalSize(),
          }}
          {...TableProps}
        >
          {children}
        </Table>
      </TableContainer>
    );
  };

  DataGridTable.displayName = `${configs.name}.Table`;

  return DataGridTable;
}
