import { Grid, Stack, Typography } from '@mui/material';
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import {
  DataGrid,
  GridPagination,
  GridToolbar,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';

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

const CompletedTrainings = () => {
  const columns = [
    { field: 'studentId', headerName: 'Student Number', width: 220, flex: 0.5 },
    { field: 'studentName', headerName: 'Student Name', width: 220, flex: 0.5 },
  ];

  const rows = [
    {
      studentId: '1',
      studentName: 'khalil',
    },
    {
      studentId: '2',
      studentName: 'Ali',
    },
  ];
  return (
    <Grid
      container
      sx={{
        p: 3,
        justifyContent: 'center',
        alignItems: 'center',
        height: '90%',
      }}
    >
      <Stack height="100%" width="100%">
      <Typography component="h1" variant="h5" fontWeight={500}>
        Completed Trainings
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
          pagination: { paginationModel: { pageSize: 30 } },
        }}
        pageSizeOptions={[10, 20, 30]}
        slots={{
          toolbar: GridToolbar,
          pagination: CustomPagination,
        }}
      />
      </Stack>
    </Grid>
  );
};

export default CompletedTrainings;
