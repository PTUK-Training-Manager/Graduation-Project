import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import './CurrentTrainees.css';
import useCurrentTraineesController from "src/pages/university/CurrentTrainees/hooks/useCurrentTraineesController";
import theme from "src/styling/customTheme";
import { Box, Grid, Typography } from '@mui/material';
import { PageChangeParams, OnRowClick } from 'src/components/DataGridTanstack/types';
import UsersDataGrid from './definition';
import { RunningTraineesData } from './api/response.dto';


const CurrentTrainees: React.FC = () => {

    const [pagination, setPagination] = useState<PageChangeParams>({pageIndex: 0, pageSize: 10});

    const {users, totalRows, isFetching} = useCurrentTraineesController({pagination});

    const handleOnRowClick: OnRowClick<RunningTraineesData> = (cell, row) => console.log({cell, row})

    return (
        <>
        <Grid container sx={{
            p: 3,
            justifyContent: "center",
            alignItems: "center",
            height: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
        }}>
            <Stack gap={1.5} sx={{
                width: '100%',
                height: '100%',
            }}>
                <Typography component="h1" variant="h5" fontWeight={500}>
                    Current Trainees
                </Typography>
       
                <UsersDataGrid.Provider
                //@ts-ignore
                    data={users ?? []}
                    isFetching={isFetching}
                    totalRows={+totalRows}
                    totalPages={Math.floor(totalRows / pagination.pageSize)}
                    onPaginationChange={(pagination) => setPagination(pagination)}
                >
                    <UsersDataGrid.Toolbar>
                        <UsersDataGrid.Toolbar.Start>
                            <UsersDataGrid.SearchBox/>
                        </UsersDataGrid.Toolbar.Start>
                        <UsersDataGrid.Toolbar.End>
                            <UsersDataGrid.Filters/>
                        </UsersDataGrid.Toolbar.End>
                    </UsersDataGrid.Toolbar>
                    <UsersDataGrid.Table onRowClick={handleOnRowClick}/>
                </UsersDataGrid.Provider>
          
    </Stack>
    </Grid>
    </>
    );
};

export default CurrentTrainees;