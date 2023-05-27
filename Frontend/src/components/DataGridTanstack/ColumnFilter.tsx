import React from 'react';
import {Table, Column} from "@tanstack/react-table";
import ColumnFilterNumeric from "./ColumnFilterNumeric";
import ColumnFilterText from "./ColumnFilterText";

interface ColumnFilterProps<T> {
    table: Table<T>;
    column: Column<T>;
}

const ColumnFilter = <T extends any>(props: ColumnFilterProps<T>) => {
    const {table, column} = props;

    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id);

    if (typeof firstValue === "number") return <ColumnFilterNumeric column={column}/>
    return <ColumnFilterText column={column}/>
};

export default ColumnFilter;
