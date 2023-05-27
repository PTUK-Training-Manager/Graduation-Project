import React, {useMemo} from "react";
import {Column} from "@tanstack/react-table";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface ColumnFilterTextProps<T> {
    column: Column<T>;
}

const ColumnFilterText = <T extends any>({column}: ColumnFilterTextProps<T>) => {

    const sortedUniqueValues: T[] = useMemo(
        () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
        [column.getFacetedUniqueValues()]
    );

    const columnFilterValue = (column.getFilterValue() as string) ?? "";

    return (
        <Autocomplete
            freeSolo
            value={columnFilterValue}
            size="small"
            disablePortal
            id="combo-box-demo"
            options={sortedUniqueValues as string[]}
            // getOptionLabel={(option) => option.header}
            renderInput={(params) => <TextField {...params} label="Value" />}
            // onChange={(event, value) => {
            //     console.log(value);
            //     column.setFilterValue(value);
            // }}
            // onInputChange={(event, value) => column.setFilterValue(value)}
        />
    )
};

export default ColumnFilterText;
