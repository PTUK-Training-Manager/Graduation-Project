import {
  ColumnFilterNumericProps,
  CreateDataGridConfig,
} from "src/components/DataGridTanstack/types";
import React, { ChangeEvent, useContext } from "react";
import Grid from "@mui/material/Grid";
import NumericInput from "src/components/Inputs/NumericInput";

export function makeColumnFilterNumeric<T extends object>(configs: CreateDataGridConfig<T>) {
  const ColumnFilterNumeric = <T extends unknown>({
    columnId,
    index,
  }: ColumnFilterNumericProps) => {
    if (columnId === "") return null;
    const { table, onSetColumnFilters } = useContext(configs.Context);

    const column = table.getColumn(columnId);

    if (!column) return null;

    const min = Number(column.getFacetedMinMaxValues()?.[0] ?? "");
    const max = Number(column.getFacetedMinMaxValues()?.[1] ?? "");

    const columnFilterValue = column.getFilterValue() as [number, number];

    const currentMin = columnFilterValue?.[0] ?? "";
    const currentMax = columnFilterValue?.[1] ?? "";

    const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const { name, value } = event.target;

      onSetColumnFilters(prev =>
        prev.map((cf, idx) => {
          if (idx !== index) return cf;
          return {
            ...cf,
            value: name === "min" ? [+value, currentMax] : [+currentMin, +value],
          };
        })
      );
    };

    return (
      <Grid container gap={1} sx={{ maxWidth: "100%", flexWrap: "nowrap" }}>
        <Grid item xs={6}>
          <NumericInput
            fullWidth
            name="min"
            value={currentMin}
            size="small"
            placeholder="Min"
            onChange={handleOnChange}
            min={min}
            max={max}
          />
        </Grid>
        <Grid item xs={6}>
          <NumericInput
            fullWidth
            name="max"
            value={currentMax}
            size="small"
            placeholder="Max"
            onChange={handleOnChange}
            min={currentMin}
            max={max}
          />
        </Grid>
      </Grid>
    );
  };

  ColumnFilterNumeric.displayName = "ColumnFilterNumeric";

  return ColumnFilterNumeric;
}
