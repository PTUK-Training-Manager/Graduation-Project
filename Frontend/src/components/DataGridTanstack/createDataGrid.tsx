import React, {FC, createContext} from "react";
import {DataGridContextValues, CreateDataGridOptions, GridReturn} from "./types";
import {makeDataGridProvider, DataGridProviderProps} from "./DataGridProvider";
import {makeDataGridTable} from "./DataGrid";
import {makeFilters} from "./FiltersModal";
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

    const Grid: FC<DataGridProviderProps<T>> & GridReturn<T> = props => {
        return (
            <Grid.Provider {...props}>
                <Grid.Table/>
            </Grid.Provider>
        );
    }

    Grid.Provider = makeDataGridProvider<T>(configs);
    Grid.Context = DataGridContext;
    Grid.Toolbar = ToolbarLayout;
    Grid.Table = makeDataGridTable<T>(configs);
    Grid.Filters = makeFilters<T>(configs);
    Grid.SearchBox = makeSearchBox<T>(configs);
    Grid.configs = configs;

    return Grid;
}
