import React, {createContext} from "react";
import {
    DataGridContextValues,
    CreateDataGridOptions,
    CompoundGridProps,
} from "./types";
import {makeDataGridProvider} from "./DataGridProvider";
import {makeDataGridContainer} from "./DataGridContainer";
import {makeDataGridTable} from "./DataGridTable";
import {makeDataGridHead} from "./DataGridHead";
import {makeDataGridBody} from "./DataGridBody";
import {makeDataGridInfiniteBody} from "./DataGridInfiniteBody";
import {makeDataGridInfiniteFooter} from "./DataGridInfiniteFooter";
import {makeDataGridPaginatedFooter} from "./DataGridPaginatedFooter";
import {makeFilters} from "./FiltersModal";
import {makeSearchBox} from "./SearchBox";
import ToolbarLayout from "./ToolbarLayout";
import {makePlaceholder} from "./Placeholder";
import {makeTableStateTree} from "./TableStateTree";
import {getDefaultOptions} from "./utils/general";

export function createDataGrid<T extends object>(initialOptions: CreateDataGridOptions<T>) {
    const {name} = initialOptions;

    const DataGridContext = createContext<DataGridContextValues<T> | null>(null) as React.Context<DataGridContextValues<T>>;
    DataGridContext.displayName = `${name}Context`;

    // return the default options with the initial options applied
    const optionsWithDefaults = getDefaultOptions(initialOptions);

    const {pagination} = optionsWithDefaults;

    const configs = {
        ...optionsWithDefaults,
        Context: DataGridContext,
    };

    const Grid: CompoundGridProps<T> = props => {
        return (
            <Grid.Provider {...props}>
                <Grid.Container>
                    <Grid.Toolbar>
                        <Grid.Toolbar.Start>
                            <Grid.SearchBox/>
                        </Grid.Toolbar.Start>
                        <Grid.Toolbar.End>
                            <Grid.Filters/>
                        </Grid.Toolbar.End>
                    </Grid.Toolbar>
                    <Grid.Table>
                        <Grid.Head/>
                        <Grid.Body/>
                    </Grid.Table>
                    <Grid.Footer/>
                </Grid.Container>
            </Grid.Provider>
        );
    }

    Grid.Provider = makeDataGridProvider<T>(configs);
    Grid.Context = DataGridContext;
    Grid.Container = makeDataGridContainer(configs);
    Grid.Toolbar = ToolbarLayout;
    Grid.Table = makeDataGridTable(configs);
    Grid.Head = makeDataGridHead(configs); //TableHead
    Grid.Body = pagination === "on"
        ? makeDataGridBody(configs)
        : makeDataGridInfiniteBody(configs);
    Grid.Placeholder = makePlaceholder(configs);
    Grid.Footer = pagination === "on"
        ? makeDataGridPaginatedFooter<T>(configs)
        : makeDataGridInfiniteFooter<T>(configs);
    Grid.Filters = makeFilters<T>(configs);
    Grid.SearchBox = makeSearchBox<T>(configs);
    Grid.configs = configs;
    Grid.TableStateTree = makeTableStateTree<T>(configs);

    return Grid;
}
