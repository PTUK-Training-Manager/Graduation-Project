import React from 'react';
import {DataGrid, GridToolbar,} from '@mui/x-data-grid';
import './CompletedTrainees.css';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import theme from "src/styling/customTheme";
import Typography from "@mui/material/Typography";
import useCompletedTraineesController from "./hooks/useCompletedTraineesController";
import DataGridPagination from "src/components/DataGrid/DataGridPagination";

const CompletedTrainees: React.FC = () => {

    const {rows, columns} = useCompletedTraineesController();

    return (
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
                    Completed Trainees
                </Typography>
                <DataGrid
                    className="dataGrid"
                    sx={{
                        boxShadow: 10,
                        border: 1,
                        borderColor: '#cacaca',
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main'
                        }
                    }}
                    columns={columns}
                    rows={rows}
                    getRowId={(row) => row['studentId']}
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
    );
};

export default CompletedTrainees;
