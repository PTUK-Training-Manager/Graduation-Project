import React, { SyntheticEvent, useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidV4 } from "uuid";
import { CreateDataGridConfig, AutocompleteColumnOption } from "./types";
import Chip from "@mui/material/Chip";
import FilterListIcon from "@mui/icons-material/FilterList";
import { makeColumnFilter } from "./ColumnFilter";
import { useTranslation } from "react-i18next";

export function makeFilters<T extends object>(configs: CreateDataGridConfig<T>) {
  const ColumnFilter = makeColumnFilter(configs);

  const FiltersModal = () => {
    const {
      table,
      isOpenFiltersModal,
      onSetIsOpenFiltersModal,
      columnFilters,
      onSetColumnFilters,
    } = useContext(configs.Context);

    // @ts-ignore
    const { t } = useTranslation();

    const hasAppliedFilters = columnFilters.length > 0;

    const columnOptions: AutocompleteColumnOption[] = table
      .getAllColumns()
      .filter(column => column.getCanFilter())
      .map(column => ({
        id: column.id ?? "",
        header: t(column.columnDef.header as string),
      }));

    const handleCloseFiltersModal = () => onSetIsOpenFiltersModal(false);
    const handleOpenFiltersModal = () => onSetIsOpenFiltersModal(true);

    const handleAddFilter = () => {
      const hasUnfilledFilters = columnFilters.some(cf => cf.id === "" || cf.value === "");
      if (hasUnfilledFilters) return;

      onSetColumnFilters(prev => [
        ...prev,
        {
          key: uuidV4(),
          id: columnOptions[0]?.id,
          value: "",
        },
      ]);
    };

    const handleRemoveFilter = (index: number) => {
      onSetColumnFilters(prev => [...prev.slice(0, index), ...prev.slice(index + 1)]);
    };

    const handleChangeColumn = (
      event: SyntheticEvent<Element, Event>,
      option: AutocompleteColumnOption | null,
      index: number
    ) => {
      onSetColumnFilters(prev =>
        prev.map((cf, idx) => {
          if (idx === index) return { ...cf, id: option?.id ?? "", value: "" };
          return cf;
        })
      );
    };

    const getColumnAutoCompleteValue = (columnFilterId: string) =>
      columnOptions.find(option => option.id === columnFilterId) ?? null;

    const clearAllFilters = () => {
      onSetColumnFilters([]);
    };
    return (
      <>
        <Chip
          icon={<FilterListIcon />}
          label={"Filter" + (hasAppliedFilters ? `: ${columnFilters.length} applied` : "")}
          variant={hasAppliedFilters ? "filled" : "outlined"}
          color={hasAppliedFilters ? "info" : "default"}
          clickable
          onClick={handleOpenFiltersModal}
          sx={{
            border: "none",
          }}
        />
        <Dialog
          open={isOpenFiltersModal}
          // onClose={(event, reason) => {
          //     if (["backdropClick", "escapeKeyDown"].includes(reason))
          //         return;
          //     handleCloseFiltersModal();
          // }}
          onClose={handleCloseFiltersModal}
          aria-labelledby="filters-dialog-title"
          aria-describedby="filters-dialog-description"
          fullWidth
          disableEscapeKeyDown
          sx={{
            "& .MuiDialog-paper": {
              minWidth: "900px",
            },
          }}
        >
          <DialogTitle id="filters-dialog-title">
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              Filter Columns
              <Button onClick={clearAllFilters} disabled={!hasAppliedFilters}>
                Clear All
              </Button>
            </Stack>
          </DialogTitle>
          <DialogContent sx={{ minHeight: "300px" }}>
            <Stack
              gap={2}
              sx={{
                ...(columnFilters.length && {
                  pt: 1,
                  pb: 2,
                }),
              }}
            >
              {columnFilters.map((cf, index) => (
                <Grid
                  container
                  gap={1.5}
                  sx={{ alignItems: "center", justifyContent: "space-between" }}
                  key={index}
                >
                  <Grid item xs={5}>
                    <Autocomplete<AutocompleteColumnOption>
                      value={getColumnAutoCompleteValue(cf.id)}
                      size="small"
                      disablePortal
                      id="combo-box-demo"
                      options={columnOptions}
                      getOptionLabel={option => option.header}
                      getOptionDisabled={option => columnFilters.some(cf => cf.id === option.id)}
                      renderInput={params => <TextField {...params} label="Column" />}
                      onChange={(event, option) => handleChangeColumn(event, option, index)}
                    />
                  </Grid>
                  {cf.id !== "" && (
                    <Grid item container xs={5}>
                      <ColumnFilter key={index} index={index} columnId={cf.id} />
                    </Grid>
                  )}
                  <Grid item>
                    <IconButton aria-label="Remove filter" size="small">
                      <DeleteIcon onClick={() => handleRemoveFilter(index)} />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Stack>
            <Button startIcon={<AddIcon />} size="small" onClick={handleAddFilter}>
              Add Filter
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFiltersModal} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

  FiltersModal.displayName = `${configs.name}.FiltersModal`;

  return FiltersModal;
}
