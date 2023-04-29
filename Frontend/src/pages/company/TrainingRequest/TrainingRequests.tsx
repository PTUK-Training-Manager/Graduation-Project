import React, { useEffect, useMemo, useState } from 'react';
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import { DataGrid, GridPagination, GridToolbar, gridClasses, gridPageCountSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import './TrainingRequests.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, Grid, Stack, Typography} from '@mui/material';
import { getTrainingRequests } from './api';
import theme from "src/styling/customTheme";
import { handleTrainingRequest } from 'src/acceptRequest';
import { handleTrainingRequestBody } from 'src/acceptRequest/request.dto';
import useSnackbar from 'src/hooks/useSnackbar';

interface Row {
  id: string;
  studentId: string;
  type: string;
  companyBranchId: string;
  Student: {
    name: string;
  };
  CompanyBranch: {
    location: string;
  };
}

function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

const TrainingRequests: React.FC = () => {
  const [data, setData] = useState<Row[]>([]);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    getTrainingRequests()
      .then((result) => {
        setData(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const columns = [
    {
      field: 'studentId',
      headerName: 'Student Number',
      width: 400,
      flex:.3,
    },
    {
      field: 'studentName',
      headerName: 'Student Name',
      width: 400,
      flex:.3,
    },

    {
      field: 'branch',
      headerName: 'Company Branch',
      width: 400,
      flex:.3,
    },
    {
      field:'Accept',
      width: 300,
      flex:.15,
      headerClassName: 'ctrainees',
      filterable: false,
      sortable: false,
      renderCell: (params: { id: any; }) => (
        <Button
        size="small"
        sx={{color:"white",backgroundColor:"green"}}
        aria-label='progress form'
        onClick={() => handleAccept(params.id)}
        >
         <CheckCircleOutlineIcon sx={{color:"white",mr:1}} className='manage-icon'/>
         Accept
        </Button>
       ),
     },
     {
      field:'Regict',
      width: 300,
      flex:.15,
      headerClassName: 'ctrainees',
      filterable: false,
      sortable: false,
      renderCell: (params: { id: any; }) => (
        <Button
        size="small"
        sx={{color:"white",backgroundColor:"red"}}
        aria-label='progress form'
        onClick={() => handleReject(params.id)}
        >
         <CancelIcon sx={{color:"white",mr:1}} className='manage-icon'/>
         Reject
        </Button>
       ),
     },
  ];

  const rows = data.map((row) => ({
      id: row.id,
      studentId: row.studentId,
      studentName: row.Student.name,
      Student: row.Student,   
      branch: row.CompanyBranch.location,
      CompanyBranch: row.CompanyBranch,
      companyBranchId: row.companyBranchId,
  }));

  const handleAccept = (id: string) => {
    console.log(id)
    const body: handleTrainingRequestBody = {
      trainingId: id,
      status: 'accepted',
    };
    handleTrainingRequest(body)
      .then((result) => {
        if (result.success === true) {
          showSnackbar({ severity: 'success', message: result.message });
          setData((prevData) => prevData.filter((row) => row.id !== id));
          console.log("correct");
        } else if (result.success === false) {
          console.log("error");
        }
      })
      .catch((error) => console.log(error));
  };
  const handleReject = (id: string) => {
    console.log(id)
    const body: handleTrainingRequestBody = {
      trainingId: id,
      status: 'rejected',
    };
    handleTrainingRequest(body)
      .then((result) => {
        if (result.success === true) {
          showSnackbar({ severity: 'success', message: result.message });
          setData((prevData) => prevData.filter((row) => row.id !== id));
          console.log("correct");
        } else if (result.success === false) {
          console.log("error");
        }
      })
      .catch((error) => console.log(error));
  };
  
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
                    Training Requests
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
                    getRowId={(row) => row['id']}
                    initialState={{
                        pagination: {paginationModel: {pageSize: 30}},
                    }}
                    pageSizeOptions={[10, 20, 30]}
                    slots={{
                        toolbar: GridToolbar,
                        pagination: CustomPagination,
                    }}
                />
            </Stack>
        </Grid>
    </>
  );
};

export default TrainingRequests;