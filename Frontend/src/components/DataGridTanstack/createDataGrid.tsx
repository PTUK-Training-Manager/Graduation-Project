import React, {FC, createContext} from "react";
import {DataGridContextValues, CreateDataGridOptions, DataGridProps, GridReturn} from "./types";
import {ColumnFiltersState, Table} from "@tanstack/react-table";
import {makeDataGridProvider, DataGridProviderProps} from "./DataGridProvider";
import {makeDataGridTable} from "./DataGrid";
import {makeFilters, FiltersModalProps} from "./FiltersModal";
import {makeSearchBox} from "./SearchBox";
import ToolbarLayout from "./ToolbarLayout";

export function createDataGrid<T extends object>(initialOptions: CreateDataGridOptions<T>): GridReturn<T> {
    const {name} = initialOptions;

    const DataGridContext = createContext<DataGridContextValues<T> | null>(null) as React.Context<DataGridContextValues<T>>;
    DataGridContext.displayName = `${name}Context`;

    const configs = {
        ...initialOptions,
        Context: DataGridContext,
    };

    console.log(configs);

    const Grid = (props: DataGridProviderProps<T>) => {
        return (
            <Grid.Provider {...props}>
                <Grid.Table/>
            </Grid.Provider>
        );
    }

    Grid.Provider = makeDataGridProvider<T>(configs);
    Grid.Table = makeDataGridTable<T>(configs);
    Grid.Toolbar = ToolbarLayout;
    Grid.Filters = makeFilters<T>(configs);
    Grid.SearchBox = makeSearchBox<T>(configs);
    Grid.configs = configs;
    Grid.Faris = (props: any) => (<div>Faris</div>);

    return Grid;
}
