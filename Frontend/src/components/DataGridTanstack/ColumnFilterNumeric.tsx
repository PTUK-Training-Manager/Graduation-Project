import React from "react";
import {Column} from "@tanstack/react-table";
import DebouncedInput from "./DebouncedInput";
import Grid from "@mui/material/Grid";

interface ColumnFilterNumericProps<T> {
    column: Column<T>;
}

const ColumnFilterNumeric = <T extends any>({column}: ColumnFilterNumericProps<T>) => {

    const min = Number(column.getFacetedMinMaxValues()?.[0] ?? "");
    const max = Number(column.getFacetedMinMaxValues()?.[1] ?? "");

    const columnFilterValue = column.getFilterValue() as [number, number];
    const currentMin = columnFilterValue?.[0] ?? "";
    const currentMax = columnFilterValue?.[1] ?? "";

    const handleChangeValue = (type: "min" | "max") => (value: string | number) => {
        column.setFilterValue((old: [number, number]) => type === "min" ?  [value, old?.[1]] : [old?.[0], value])
    }

    return (
        <Grid container gap={0.5}>
            <DebouncedInput
                type="number"
                min={min}
                max={max}
                value={currentMin}
                onChange={handleChangeValue("min")}
                placeholder={`Min ${min ? `(${min})` : ""}`}
            />
            <DebouncedInput
                type="number"
                min={min}
                max={max}
                value={currentMax}
                onChange={handleChangeValue("max")}
                placeholder={`Max ${max ? `(${max})` : ""}`}
            />
        </Grid>
    )
};

export default ColumnFilterNumeric;
