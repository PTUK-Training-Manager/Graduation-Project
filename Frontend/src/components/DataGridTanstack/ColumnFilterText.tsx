import { ColumnFilterTextProps, CreateDataGridConfig } from "src/components/DataGridTanstack/types";
import useStyles from "src/components/DataGridTanstack/styles";
import React, { SyntheticEvent, useContext, useMemo } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export function makeColumnFilterText<T extends object>(configs: CreateDataGridConfig<T>) {
  const ColumnFilterText = <T extends any>({ columnId, index }: ColumnFilterTextProps) => {
    const classes = useStyles();

    const { table, onSetColumnFilters } = useContext(configs.Context);

    if (columnId === "") return null;

    const column = table.getColumn(columnId);

    if (!column) return null;

    const sortedUniqueValues: T[] = useMemo(
      () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
      [column.getFacetedUniqueValues()]
    );

    const columnFilterValue = (column?.getFilterValue() as string) ?? "";

    const handleOnChange = (event: SyntheticEvent<Element, Event>, value: string | null) => {
      onSetColumnFilters(prev =>
        prev.map((cf, idx) => {
          if (idx === index) return { ...cf, value: value ? String(value) : "" };
          return cf;
        })
      );
    };

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
        renderInput={params => <TextField {...params} label="Value" />}
        onChange={handleOnChange}
        onInputChange={handleOnChange}
      />
    );
  };

  ColumnFilterText.displayName = "ColumnFilterText";

  return ColumnFilterText;
}
