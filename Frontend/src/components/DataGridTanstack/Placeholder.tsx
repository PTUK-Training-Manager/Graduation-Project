import React, { FC, useContext } from "react";
import Skeleton from "@mui/material/Skeleton";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { CreateDataGridConfigWithDefaults, TableBodySkeletonProps } from "./types";
import theme from "src/styling/customTheme";

export function makePlaceholder<T extends object>(configs: CreateDataGridConfigWithDefaults<T>) {
  const Placeholder: FC<TableBodySkeletonProps> = ({ rowsCount = 20, skeletonRowHeight = 24 }) => {
    const { shouldFlexGrowCells } = configs;
    const { table } = useContext(configs.Context);

    const { getAllColumns } = table;

    const rows = Array.from({ length: rowsCount }, (x, i) => i);

    return (
      <TableBody
        sx={{
          display: "block",
          // overflow: "auto",
          // height: `calc(100% - 33px)`,
          height: "100%",
          // overflowY: "scroll",
          ...theme.mixins.niceScroll(),
        }}
      >
        {rows.map(skeleton => (
          <TableRow
            key={skeleton}
            sx={{
              width: "100%",
              tableLayout: "fixed",
              display: "flex",
            }}
          >
            {getAllColumns().map(col => (
              <TableCell
                key={col.id}
                sx={{
                  // width: shouldFlexGrowCells ? "150px" : cell.column.getSize(),
                  width: shouldFlexGrowCells ? "150px" : col.getSize(),
                  // width: "150px",
                  // width: cell.column.getSize(),
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  flexGrow: shouldFlexGrowCells ? 1 : 0,
                }}
              >
                <Skeleton height={skeletonRowHeight} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  };

  Placeholder.displayName = `${configs.name}.Placeholder`;

  return Placeholder;
}
