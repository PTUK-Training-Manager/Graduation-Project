import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import './EvaluRequest.css';
import theme from "src/styling/customTheme";
import DataGridPagination from "src/components/DataGrid/DataGridPagination";

import {
  DataGrid,
  GridToolbar,
 
} from '@mui/x-data-grid';
import QuestionDialog from './components/QuestionDialog';
import useEvaluationRequestController from './hooks/useEvaluationRequestController';
interface QuestionDialogProps {
    isOpen: boolean;
    currentTab: string;
    handleChangeTab: (event: React.SyntheticEvent<Element, Event>, newValue: string) => void;
    handleCloseDialog: () => void;
    children?: React.ReactNode; // add children prop
  }

const EvaluationRequests: React.FC = () => {

    const {
        columns,
        rows,
        isOpen,
        response,
        data,
        trainingId,
        handleCloseDialog,
    } = useEvaluationRequestController();

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
                      Evaluation Request
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
            <QuestionDialog
          isOpen={isOpen}
          handleCloseDialog={handleCloseDialog}
          // response={response}
          // data={data}
          trainingId={trainingId} currentTab={''} handleChangeTab={function (event: React.SyntheticEvent<Element, Event>, newValue: string): void {
            throw new Error('Function not implemented.');
          } }            />
        </>
    );
};

export default EvaluationRequests;