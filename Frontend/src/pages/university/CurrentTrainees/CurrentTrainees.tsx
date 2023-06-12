import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import './CurrentTrainees.css';
import useCurrentTraineesController from './hooks/useCurrentTraineesController';
import uselogic from './definition';
import theme from 'src/styling/customTheme';
import { Box, Grid, Typography } from '@mui/material';
import {
  PageChangeParams,
  OnRowClick,
} from 'src/components/DataGridTanstack/types';
import { RunningTraineesData } from './api/response.dto';
import ProgressFormDialog from './components/ProgressFormDialog';

const CurrentTrainees: React.FC = () => {
  const [pagination, setPagination] = useState<PageChangeParams>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { users, totalRows, isFetching } = useCurrentTraineesController({
    pagination,
  });
  const { UsersDataGrid, isOpen, response, trainingId, handleCloseDialog } = uselogic();

  const handleOnRowClick: OnRowClick<RunningTraineesData> = (cell, row) =>
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
            Current Trainees
          </Typography>

          <UsersDataGrid.Provider
            //@ts-ignore
            data={users ?? []}
            isFetching={isFetching}
            totalRows={+totalRows}
            totalPages={Math.floor(totalRows / pagination.pageSize)}
            //@ts-ignore
            onPaginationChange={(pagination) => setPagination(pagination)}
          >
            <UsersDataGrid.Toolbar>
              <UsersDataGrid.Toolbar.Start>
                <UsersDataGrid.SearchBox />
              </UsersDataGrid.Toolbar.Start>
              <UsersDataGrid.Toolbar.End>
                <UsersDataGrid.Filters />
              </UsersDataGrid.Toolbar.End>
            </UsersDataGrid.Toolbar>
            <UsersDataGrid.Table onRowClick={handleOnRowClick} />
          </UsersDataGrid.Provider>
        </Stack>
      </Grid>
      {/* <ProgressFormDialog
                isOpen={isOpen}
                handleCloseDialog={handleCloseDialog}
                //@ts-ignore
                response={response}
                //@ts-ignore
                data={users}
                trainingId={trainingId}
            /> */}
    </>
  );
};

export default CurrentTrainees;
