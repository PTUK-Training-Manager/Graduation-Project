import React, { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { FinishedRequiredHoursData } from './api/types';
import EvaluStepper from './components/EvaluStepper';
import './Finished200Hours.css';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import PrintIcon from '@mui/icons-material/Print';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import theme from 'src/styling/customTheme';
import Typography from '@mui/material/Typography';
import Transition from 'src/components/Transition';
import DataGridPagination from 'src/components/DataGrid/DataGridPagination';
import useFinishedRequiredHoursController from './hooks/useFinishedRequiredHoursController';
import {
  OnRowClick,
  PageChangeParams,
} from 'src/components/DataGridTanstack/types';
import uselogic from './definition';

const Finished200Hours: React.FC = () => {
  const {
    TraineesFinishedRequierHoursDataGrid,
    handleCloseDialog,
    handleOpenDialog,
    isOpen,
    trainingId,
    open,
  } = uselogic();

  const { pageSize } = TraineesFinishedRequierHoursDataGrid.configs;

  const [query, setQuery] = useState<PageChangeParams>({
    pageIndex: 0,
    pageSize,
  });

  const { allRows, isFetching, fetchNextPage } =
    useFinishedRequiredHoursController({ query });

  const handleOnRowClick: OnRowClick<FinishedRequiredHoursData> = (cell, row) =>
    console.log({ cell, row });

  return (
    <>
      <Grid
        container
        sx={{
          p: 3,
          justifyContent: 'center',
          alignItems: 'center',
          height: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
        }}
      >
        <Stack
          gap={1.5}
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <Typography component="h1" variant="h5" fontWeight={500}>
            Trainees Finished Required Houres
          </Typography>
          <TraineesFinishedRequierHoursDataGrid.Provider
                    data={allRows}
                    isFetching={isFetching}
                    // totalPages={Math.floor(totalRows / pagination.pageSize)}
                    // onFetch={(pagination) => setPagination(pagination)}
                    onFetch={(query) => fetchNextPage()}
                >
                    <TraineesFinishedRequierHoursDataGrid.Container>
                        <TraineesFinishedRequierHoursDataGrid.Toolbar>
                            <TraineesFinishedRequierHoursDataGrid.Toolbar.Start>
                                <TraineesFinishedRequierHoursDataGrid.SearchBox/>
                            </TraineesFinishedRequierHoursDataGrid.Toolbar.Start>
                            <TraineesFinishedRequierHoursDataGrid.Toolbar.End>
                                <TraineesFinishedRequierHoursDataGrid.Filters/>
                            </TraineesFinishedRequierHoursDataGrid.Toolbar.End>
                        </TraineesFinishedRequierHoursDataGrid.Toolbar>
                        <TraineesFinishedRequierHoursDataGrid.Table>
                            <TraineesFinishedRequierHoursDataGrid.Head/>
                            <TraineesFinishedRequierHoursDataGrid.Body onRowClick={handleOnRowClick}/>
                            {/*<TraineesFinishedRequierHoursDataGrid.Placeholder/>*/}
                        </TraineesFinishedRequierHoursDataGrid.Table>
                        <TraineesFinishedRequierHoursDataGrid.Footer />
                    </TraineesFinishedRequierHoursDataGrid.Container>
                    {/*<TraineesFinishedRequierHoursDataGrid.TableStateTree/>*/}
                </TraineesFinishedRequierHoursDataGrid.Provider>
        </Stack>
      </Grid>

      <Dialog
        open={isOpen}
        onClose={handleCloseDialog}
        fullScreen
        TransitionComponent={Transition}
        sx={{ left: '25%' }}
      >
        <DialogTitle gap={1.5} sx={{ textAlign: 'center' }}></DialogTitle>
        <DialogContent>
          <EvaluStepper trainingId={trainingId} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Finished200Hours;
