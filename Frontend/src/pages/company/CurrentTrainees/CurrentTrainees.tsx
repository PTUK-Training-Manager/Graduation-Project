import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {
    DataGrid,
    GridToolbar,
} from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import './CurrentTrainees.css';
import theme from "src/styling/customTheme";
import useCurrentTraineesController from './hooks/useCurrentTraineesController';
import DataGridPagination from "src/components/DataGrid/DataGridPagination";
import ProgressFormDialog from "./components/ProgressFormDialog";


const CurrentTrainees: React.FC = () => {

    const {
        columns,
        rows,
        isOpen,
        response,
        data,
        currentTab,
        trainingId,
        handleChangeTab,
        handleCloseDialog,
    } = useCurrentTraineesController();

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
                    <DataGrid
                        className="dataGrid"
                        sx={{
                            boxShadow: 10,
                            border: 1,
                            borderColor: '#cacaca',
                            '& .MuiDataGrid-cell:hover': {
                                color: 'primary.main',
                            },
                        }}
                        columns={columns}
                        rows={rows}
                        getRowId={(row) => row['id']}
                        initialState={{
                            pagination: {paginationModel: {pageSize: 30}},
                        }}
                        pageSizeOptions={[10, 20, 30]}
                        slots={{
                            toolbar: GridToolbar,
                            pagination: DataGridPagination,
                        }}
                    />
                </Stack>
            </Grid>
            <ProgressFormDialog
                isOpen={isOpen}
                currentTab={currentTab}
                handleChangeTab={handleChangeTab}
                handleCloseDialog={handleCloseDialog}
                response={response}
                data={data}
                trainingId={trainingId}
            />
        </>
    );
};

export default CurrentTrainees;