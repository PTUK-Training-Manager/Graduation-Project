import {FilterFnOption} from "@tanstack/react-table";
import {
    ColumnFilterNumericProps,
    ColumnFilterProps,
    ColumnFilterTextProps,
    ColumnFilterTextMultipleProps,
    CreateDataGridConfig
} from "./types";
import useStyles from "./styles";
import React, {ChangeEvent, SyntheticEvent, useContext, useMemo} from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import MultiSelectAutoComplete from "src/components/Inputs/MultiSelectAutoComplete";
import NumericInput from "src/components/Inputs/NumericInput";
import {makeColumnFilterText} from "./ColumnFilterText";
import {makeColumnFilterTextMultiple} from "./ColumnFilterTextMultiple";
import {makeColumnFilterNumeric} from "./ColumnFilterNumeric";
import {makeColumnFilterDatePicker} from "./ColumnFilterDatePicker";

export function makeColumnFilter<T extends object>(configs: CreateDataGridConfig<T>) {

    const ColumnFilterText = makeColumnFilterText(configs);
    const ColumnFilterNumeric = makeColumnFilterNumeric(configs);
    const ColumnFilterTextMultiple = makeColumnFilterTextMultiple(configs);
    const ColumnFilterDatePicker = makeColumnFilterDatePicker(configs);

    const ColumnFilter = <T extends any>(props: ColumnFilterProps<T>) => {
        const {columnId, index} = props;
        if (columnId === "") return null;

        const {table} = useContext(configs.Context);

        const column = table.getColumn(columnId);

        // const filterFnName = column?.getFilterFn()?.name as FilterFnOption<T>;
        const filterFnName = column?.columnDef?.filterFn;

        console.log(filterFnName);

        switch (filterFnName) {
            case "auto":
                return <ColumnFilterText key={index} index={index} columnId={columnId}/>
            case "inNumberRange":
                return <ColumnFilterNumeric key={index} index={index} columnId={columnId}/>
            case "dateBetween":
                return <ColumnFilterDatePicker key={index} index={index} columnId={columnId}/>
            case "includesString":
                return <ColumnFilterText key={index} index={index} columnId={columnId}/>
            case "arrIncludesSome":
                return <ColumnFilterTextMultiple key={index} index={index} columnId={columnId}/>
            default:
                return null;
        }
    }

    // const ColumnFilterDate = <T extends any>({columnId, index}: ColumnFilterNumericProps<T>) => {
    //     if (columnId === "") return null;
    //     const {table, onSetColumnFilters} = useContext(configs.Context);
    //
    //     const column = table.getColumn(columnId);
    //
    //     if (!column) return null;
    //
    //     // const min = Number(column.getFacetedMinMaxValues()?.[0] ?? "");
    //     // const max = Number(column.getFacetedMinMaxValues()?.[1] ?? "");
    //
    //
    //     // const columnFilterValue = column.getFilterValue() as [number, number];
    //     const columnFilterValue = column.getFilterValue() as [string, string];
    //     console.log(columnFilterValue);
    //
    //     // const currentMin = columnFilterValue?.[0] ?? "";
    //     // const currentMax = columnFilterValue?.[1] ?? "";
    //
    //     const currentMin = columnFilterValue?.[0] ? new Date(columnFilterValue?.[0]).toISOString().slice(0, 10) : "";
    //     const currentMax = columnFilterValue?.[1] ? new Date(columnFilterValue?.[1] ?? "").toISOString().slice(0, 10) : "";
    //
    //     console.log({currentMin, currentMax});
    //
    //     const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    //         const {name, value} = event.target;
    //
    //         const dateValueAsNumber = new Date(value).getTime();
    //
    //         onSetColumnFilters((prev) => prev.map((cf, idx) => {
    //             if (idx !== index) return cf;
    //             return {
    //                 ...cf,
    //                 // value: name === "min" ? [+dateValueAsNumber, currentMax] : [+currentMin, +dateValueAsNumber]
    //                 value: name === "min" ? [value, currentMax] : [currentMin, value]
    //             };
    //         }));
    //     }
    //
    //     return (
    //         <Grid container gap={1} sx={{maxWidth: "100%", flexWrap: "nowrap"}}>
    //             <Grid item xs={6}>
    //                 <input
    //                     type="date"
    //                     name="min"
    //                     // value={currentMin ? new Date(currentMin)?.toISOString()?.slice(0, 10) : ""}
    //                     value={currentMin}
    //                     onChange={handleOnChange}
    //                 />
    //             </Grid>
    //             <Grid item xs={6}>
    //                 <input
    //                     type="date"
    //                     name="max"
    //                     // value={currentMax ? new Date(currentMax)?.toISOString()?.slice(0, 10) : ""}
    //                     value={currentMax}
    //                     onChange={handleOnChange}
    //                 />
    //             </Grid>
    //         </Grid>
    //     )
    // };

    return ColumnFilter;
}