import { CreateDataGridConfig, DataGridHeadProps } from "./types";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import theme from "src/styling/customTheme";
import Box from "@mui/material/Box";
import { flexRender, SortDirection } from "@tanstack/react-table";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import React, { useContext } from "react";
import { mapSortDirToIcon } from "./constants";
import useStyles from "./styles";
import { useTranslation } from "react-i18next";

export function makeDataGridHead<T extends object>(configs: CreateDataGridConfig<T>) {
  const DataGridHead = (props: DataGridHeadProps) => {
    const classes = useStyles();
    const { table } = useContext(configs.Context);

    const { getHeaderGroups } = table;

    const { shouldFlexGrowCells } = configs;

    // @ts-ignore
    const { t } = useTranslation();

    return (
      <TableHead sx={{ width: "100%" }} {...props}>
        {getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id} sx={{ display: "flex" }}>
            {headerGroup.headers.map(header => (
              <>
                {header.isPlaceholder ? null : (
                  <TableCell
                    key={header.id}
                    colSpan={header.colSpan}
                    sx={{
                      // width: shouldFlexGrowCells ? "150px" : header.getSize(),
                      flexGrow: shouldFlexGrowCells ? 1 : 0,
                      width: header.getSize(),
                      py: 0.5,
                      position: "sticky",
                      bgcolor: theme.palette.grey[100],
                      top: 0,
                      ...(header.column.getCanSort() && {
                        cursor: "pointer",
                        userSelect: "none",
                      }),
                      "&:hover": {
                        bgcolor: "#ecf1f1",
                      },
                      ":is(:hover) :is(#sortable-indicator, #resizer)": {
                        opacity: 1,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        height: "32px",
                      }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {typeof header.column.columnDef.header === "string"
                        ? flexRender(t(header.column.columnDef.header), header.getContext())
                        : flexRender(header.column.columnDef.header, header.getContext())}
                      {mapSortDirToIcon[header.column.getIsSorted() as SortDirection] ?? null}
                      {header.column.getCanSort() && !header.column.getIsSorted() && (
                        <ArrowUpwardIcon
                          id="sortable-indicator"
                          color="disabled"
                          sx={{
                            transition: "0.5s all",
                            fontSize: 18,
                            opacity: 0,
                          }}
                        />
                      )}
                    </Box>
                    <Box
                      id="resizer"
                      sx={{ opacity: 0 }}
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={classes.resizer}
                    />
                  </TableCell>
                )}
              </>
            ))}
          </TableRow>
        ))}
      </TableHead>
    );
  };

  DataGridHead.displayName = `${configs.name}.Head`;

  return DataGridHead;
}
