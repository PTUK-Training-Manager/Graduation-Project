import {
  CreateDataGridConfigWithDefaults,
  DataGridBodyProps,
} from "src/components/DataGridTanstack/types";
import React, { useContext } from "react";
import { StyledTableRow } from "src/components/DataGridTanstack/styled";
import TableCell from "@mui/material/TableCell";
import { flexRender } from "@tanstack/react-table";
import TableBody from "@mui/material/TableBody";
import theme from "src/styling/customTheme";
import InfiniteScroll from "react-infinite-scroll-component";
import { makePlaceholder } from "src/components/DataGridTanstack/Placeholder";
import EmptyBody from "./EmptyBody";

export function makeDataGridInfiniteBody<T extends object>(
  configs: CreateDataGridConfigWithDefaults<T>
) {
  const DataGridInfiniteBody = (props: DataGridBodyProps<T>) => {
    const BodyPlaceholder = makePlaceholder(configs);

    const { onRowClick, isRowClickable } = props;

    const { table, handleFetchMore, totalRows = 99999, striped } = useContext(configs.Context);

    const { getRowModel } = table;

    const { shouldFlexGrowCells } = configs;

    const isRowClickableBoolean = isRowClickable ?? Boolean(props.onRowClick);

    const renderRows = () =>
      getRowModel().rows.map(row => (
        <StyledTableRow
          key={row.id}
          striped={striped}
          isClickable={isRowClickableBoolean}
          sx={{
            width: "100%",
            tableLayout: "fixed",
            display: "flex",
          }}
        >
          {row.getVisibleCells().map(cell => (
            <TableCell
              key={cell.id}
              onClick={() => onRowClick?.(cell, row)}
              sx={{
                width: shouldFlexGrowCells ? "150px" : cell.column.getSize(),
                // width: cell.column.getSize(),
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                flexGrow: shouldFlexGrowCells ? 1 : 0,
              }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </StyledTableRow>
      ));

    if (getRowModel().rows.length === 0) return <EmptyBody />;

    return (
      <TableBody
        id="scrollableTableBody"
        sx={{
          display: "block",
          height: "100%",
          ...theme.mixins.niceScroll(),
        }}
        {...props}
      >
        <InfiniteScroll
          scrollableTarget="scrollableTableBody"
          dataLength={getRowModel().rows.length}
          next={handleFetchMore}
          hasMore={getRowModel().rows.length < totalRows}
          loader={<BodyPlaceholder />}
          endMessage={<p>Yay! You have seen it all</p>}
          style={{ overflow: "hidden" }}
        >
          {renderRows()}
        </InfiniteScroll>
      </TableBody>
    );
  };

  DataGridInfiniteBody.displayName = `${configs.name}.InfiniteBody`;

  return DataGridInfiniteBody;
}
