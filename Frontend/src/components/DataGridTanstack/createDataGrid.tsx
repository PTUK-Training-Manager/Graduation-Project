import React, {createContext} from "react";
import {DataGridContextValues, CreateDataGridOptions} from "./types";
import {ColumnFiltersState, Table} from "@tanstack/react-table";
import {makeDataGridProvider, DataGridProviderProps} from "./DataGridProvider";
import {makeDataGridAllParts} from "./DataGrid";

export function createDataGrid<T extends object>(initialOptions: CreateDataGridOptions<T>) {
    const {name} = initialOptions;

    const DataGridContext = createContext<DataGridContextValues<T> | null>(null) as  React.Context<DataGridContextValues<T>>;
    DataGridContext.displayName = `${name}Context`;

    const configs = {
        ...initialOptions,
        Context: DataGridContext,
    };

    const Grid = (props: DataGridProviderProps<T>) => {
        return (
            <Grid.Provider {...props}>
                {/*<Grid.TableAllParts />*/}
            </Grid.Provider>
        )
    }

    Grid.Provider = makeDataGridProvider<T>(configs);
    Grid.TableAllParts = makeDataGridAllParts<T>(configs);
    Grid.Faris = (props: any) => (<div>Faris</div>);

    return Grid;
}