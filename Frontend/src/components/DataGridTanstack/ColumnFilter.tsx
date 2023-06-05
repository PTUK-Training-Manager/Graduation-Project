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

export function makeColumnFilter<T extends object>(configs: CreateDataGridConfig<T>) {

    const ColumnFilter = <T extends any>(props: ColumnFilterProps<T>) => {
        const {columnId, index} = props;
        if (columnId === "") return null;

        const {table} = useContext(configs.Context);

        const column = table.getColumn(columnId);

        const filterFnName = column?.getFilterFn()?.name as FilterFnOption<T>;

        switch (filterFnName) {
            case "inNumberRange":
                return <ColumnFilterNumeric key={index} index={index} columnId={columnId}/>
            case "includesString":
                return <ColumnFilterText key={index} index={index} columnId={columnId}/>
            case "arrIncludesSome":
                return <ColumnFilterTextMultiple key={index} index={index} columnId={columnId}/>
            default:
                return null;
        }
    }

    const ColumnFilterText = <T extends any>({columnId, index}: ColumnFilterTextProps<T>) => {
        const classes = useStyles();

        const {table, onSetColumnFilters} = useContext(configs.Context);

        if (columnId === "") return null;

        const column = table.getColumn(columnId);

        if (!column) return null;

        const sortedUniqueValues: T[] = useMemo(
            () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
            [column.getFacetedUniqueValues()]
        );

        const columnFilterValue = (column?.getFilterValue() as string) ?? "";

        const handleOnChange = (event: SyntheticEvent<Element, Event>, value: string | null) => {
            onSetColumnFilters((prev) => prev.map((cf, idx) => {
                if (idx === index) return {...cf, value: value ? String(value) : ""};
                return cf;
            }));
        }

        return (
            <Autocomplete
                fullWidth
                freeSolo
                value={columnFilterValue}
                size="small"
                disablePortal
                id="combo-box-demo"
                options={sortedUniqueValues as string[]}
                classes={{
                    listbox: classes.niceScroll,
                }}
                // getOptionLabel={(option) => option.header}
                renderInput={(params) => <TextField {...params} label="Value"/>}
                onChange={handleOnChange}
                onInputChange={handleOnChange}
            />
        )
    };

    const ColumnFilterTextMultiple = <T extends any>({columnId, index}: ColumnFilterTextMultipleProps<T>) => {
        if (columnId === "") return null;
        const classes = useStyles();

        const {table, onSetColumnFilters} = useContext(configs.Context);

        const column = table.getColumn(columnId);

        if (!column) return null;

        const sortedUniqueValues = useMemo(
            () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
            [column.getFacetedUniqueValues()]
        );

        const columnFilterValue = column?.getFilterValue();

        const handleOnChange = (event: SyntheticEvent<Element, Event>, values: string[]) => {
            console.log(values);
            onSetColumnFilters((prev) => prev.map((cf, idx) => {
                if (idx === index) return {...cf, value: Array.isArray(values) ? values : [values]};
                return cf;
            }));
        }

        return (
            <MultiSelectAutoComplete<string>
                limitTags={2}
                fullWidth
                freeSolo
                value={Array.isArray(columnFilterValue) ? columnFilterValue : []}
                size="small"
                disablePortal
                options={sortedUniqueValues}
                classes={{
                    listbox: classes.niceScroll,
                }}
                // getOptionLabel={(option) => typeof option === "string" ? option : option.name}
                renderInput={(params) => <TextField {...params} label="Value"/>}
                onChange={handleOnChange}
            />
        )
    };

    const ColumnFilterNumeric = <T extends any>({columnId, index}: ColumnFilterNumericProps<T>) => {
        if (columnId === "") return null;
        const {table, onSetColumnFilters} = useContext(configs.Context);

        const column = table.getColumn(columnId);

        if (!column) return null;

        const min = Number(column.getFacetedMinMaxValues()?.[0] ?? "");
        const max = Number(column.getFacetedMinMaxValues()?.[1] ?? "");

        const columnFilterValue = column.getFilterValue() as [number, number];

        // const value = (columnFilters.find(cf => cf.id === columnId)?.value as string) ?? "";

        const currentMin = columnFilterValue?.[0] ?? "";
        const currentMax = columnFilterValue?.[1] ?? "";

        const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            console.log(event.target.name);
            const {name, value} = event.target;

            onSetColumnFilters((prev) => prev.map((cf, idx) => {
                if (idx === index) return {
                    ...cf,
                    // value: [+event.target.value, +event.target.value],
                    value: name === "min" ? [+value, currentMax] : [+currentMin, +value]
                };
                return cf;
            }));
        }

        return (
            <Grid container gap={1} sx={{maxWidth: "100%", flexWrap: "nowrap"}}>
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
        )
    };

    return ColumnFilter;
}