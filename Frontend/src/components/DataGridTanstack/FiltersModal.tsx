import React, {FC, useContext, useMemo, useState} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {ColumnFiltersState, Table} from "@tanstack/react-table";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ColumnFilterText from "./ColumnFilterText";
import ColumnFilter from "./ColumnFilter";
import {v4 as uuidV4} from "uuid";
import {CreateDataGridConfig} from "./types";
import Chip from "@mui/material/Chip";
import FilterListIcon from "@mui/icons-material/FilterList";

export interface FiltersModalProps<T> {
    // table: Table<T>;
    // isOpen: boolean;
    // onSetIsOpenFiltersModal: (isOpen: boolean) => void;
}

export interface AutocompleteColumnOption {
    id: string;
    header: string;
}

export function makeFilters<T extends object>(configs: CreateDataGridConfig<T>) {

    const FiltersModal = <T extends any>(props: FiltersModalProps<T>) => {
        const {
            table,
            isOpenFiltersModal,
            onSetIsOpenFiltersModal,
        } = useContext(configs.Context);

        const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

        const columnOptions: AutocompleteColumnOption[] = table.getAllColumns().map((column) => ({
            id: column.id ?? "",
            header: column.columnDef.header as string,
        }));


        // const sortedUniqueValues: T[] = useMemo(
        //     () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
        //     [column.getFacetedUniqueValues()]
        // );

        const handleClose = () => onSetIsOpenFiltersModal(false);

        // table.setColumnFilters([
        //     {
        //         id: "id",
        //         value: "1",
        //     }
        // ]);

        const handleAddFilter = () => {
            setColumnFilters((prev) => [
                ...prev,
                {
                    index: uuidV4(),
                    id: "",
                    value: "",
                }
            ]);
            console.log(columnFilters);
        }

        const handleRemoveFilter = (index: number) => {
            setColumnFilters((prev) => [
                ...prev.slice(0, index),
                ...prev.slice(index + 1),
            ]);
        }

        return (
            <>
                <Chip
                    icon={<FilterListIcon/>}
                    label="Filter"
                    variant="outlined"
                    clickable
                    onClick={() => onSetIsOpenFiltersModal(true)}
                />
                <Dialog
                    open={isOpenFiltersModal}
                    onClose={handleClose}
                    aria-labelledby="filters-dialog-title"
                    aria-describedby="filters-dialog-description"
                    fullWidth
                >
                    <DialogTitle id="filters-dialog-title">
                        <Stack direction="row" sx={{justifyContent: "space-between"}}>
                            Filter Columns
                            <Button>Clear All</Button>
                        </Stack>
                    </DialogTitle>
                    <DialogContent>
                        <Stack gap={2} sx={{pt: 1, pb: 2}}>
                            {/*<Grid container gap={2}>*/}
                            {/*    <Grid item xs={5}>*/}
                            {/*        Column*/}
                            {/*    </Grid>*/}
                            {/*    <Grid item xs={5}>*/}
                            {/*        Value*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                            {
                                columnFilters.map((_, index) => (
                                    <Grid container gap={2}
                                          sx={{alignItems: "center", justifyContent: "space-between"}}>
                                        <Grid item xs={5}>
                                            <Autocomplete<AutocompleteColumnOption>
                                                size="small"
                                                disablePortal
                                                id="combo-box-demo"
                                                options={columnOptions}
                                                getOptionLabel={(option) => option.header}
                                                renderInput={(params) => <TextField {...params} label="Column"/>}
                                                onChange={(event, value) => {
                                                    console.log(value);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={5}>
                                            {/*<Autocomplete*/}
                                            {/*    size="small"*/}
                                            {/*    disablePortal*/}
                                            {/*    id="combo-box-demo"*/}
                                            {/*    options={[]}*/}
                                            {/*    renderInput={(params) => <TextField {...params} label="Value"/>}*/}
                                            {/*/>*/}
                                            <ColumnFilter table={table} column={table.getColumn("email")!}/>
                                        </Grid>
                                        <Grid item>
                                            <IconButton aria-label="Remove filter">
                                                <DeleteIcon onClick={() => handleRemoveFilter(index)}/>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                ))
                            }
                        </Stack>
                        <Button startIcon={<AddIcon/>} size="small" onClick={handleAddFilter}>
                            Add Filter
                        </Button>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{color: (theme) => theme.palette.grey[700]}} onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose} autoFocus>
                            Apply
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    };

    FiltersModal.displayName = `${configs.name}.Filters`;

    return FiltersModal;
}

