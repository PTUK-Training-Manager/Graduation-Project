import {
  ColumnFilterNumericProps,
  CreateDataGridConfig,
} from "src/components/DataGridTanstack/types";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useContext } from "react";
import Grid from "@mui/material/Grid";

export function makeColumnFilterDatePicker<T extends object>(configs: CreateDataGridConfig<T>) {
  const ColumnFilterDatePicker = ({ columnId, index }: ColumnFilterNumericProps) => {
    if (columnId === "") return null;
    const { table, onSetColumnFilters } = useContext(configs.Context);

    const column = table.getColumn(columnId);

    if (!column) return null;

    const min = column.getFacetedMinMaxValues()?.[0] as string | undefined;
    const max = column.getFacetedMinMaxValues()?.[1] as string | undefined;

    const minDate = min ? new Date(min).toISOString().slice(0, 10) : null;
    const maxDate = max ? new Date(max).toISOString().slice(0, 10) : null;

    const columnFilterValue = column.getFilterValue() as [string, string];

    const currentMin = columnFilterValue?.[0]
      ? new Date(columnFilterValue?.[0]).toISOString().slice(0, 10)
      : null;
    const currentMax = columnFilterValue?.[1]
      ? new Date(columnFilterValue?.[1] ?? "").toISOString().slice(0, 10)
      : null;

    const handleOnChange = (type: "min" | "max") => (valueDayjs: Dayjs | null) => {
      // const {name, value} = event.target;

      // const dateValueAsNumber = new Date(value).getTime();

      const value = valueDayjs?.format("YYYY-MM-DD");

      onSetColumnFilters(prev =>
        prev.map((cf, idx) => {
          if (idx !== index) return cf;
          return {
            ...cf,
            // value: name === "min" ? [+dateValueAsNumber, currentMax] : [+currentMin, +dateValueAsNumber]
            value: type === "min" ? [value, currentMax] : [currentMin, value],
          };
        })
      );
    };

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container gap={1} sx={{ maxWidth: "100%", flexWrap: "nowrap", alignItems: "center" }}>
          <Grid item xs={6}>
            <DatePicker
              label="from date"
              format="DD/MM/YYYY"
              value={currentMin ? dayjs(currentMin) : null}
              slotProps={{
                textField: { name: "min", size: "small" },
              }}
              onChange={handleOnChange("min")}
              minDate={minDate ? dayjs(minDate) : undefined}
              maxDate={currentMax ? dayjs(currentMax) : undefined}
              // onChange={(newValue) => console.log(newValue?.format("YYYY-MM-DD"))}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="to date"
              format="DD/MM/YYYY"
              value={currentMax ? dayjs(currentMax) : null}
              slotProps={{
                textField: { name: "max", size: "small" },
              }}
              onChange={handleOnChange("max")}
              minDate={currentMin ? dayjs(currentMin) : undefined}
              maxDate={maxDate ? dayjs(maxDate) : undefined}
              // onChange={(newValue) => console.log(newValue?.format("YYYY-MM-DD"))}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
    );
  };

  ColumnFilterDatePicker.displayName = "ColumnFilterDate";
  return ColumnFilterDatePicker;
}
