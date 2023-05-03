import React, { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import {
  DataGrid,
  GridPagination,
  GridToolbar,
  gridClasses,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import './SubmittedStudents.css';
import { getSubmittedStudents } from './api';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  ImageListItem,
  Stack,
  Typography,
} from '@mui/material';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import theme from 'src/styling/customTheme';

import Transition from 'src/components/Transition';
import EvaluStepper from './component/EvaluStepper';

interface ProgressFormDialogProps {
  isOpen: boolean;
  currentTab: string;
  handleChangeTab: (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => void;
  handleCloseDialog: () => void;
  children?: React.ReactNode;
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
interface Row {
  id: string;
  trainerId: string;
  studentId: string;
  companyBranchId: string;
  startDate: string;
  endDate: string;
  semester: string;
  status: string;
  type: string;
  Student: {
    name: string;
  };
}

const SubmittedStudents: React.FC = () => {
  const [data, setData] = useState<Row[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('one');
  const [response, setReponse] = useState<Response>();
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [trainingId, setTrainingId] = useState('');
  const handleChangeTab = (event: SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    getSubmittedStudents()
      .then((result) => {
        setData(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleOpenDialog = (id: string) => {
    setTrainingId(id);
    console.log(isOpen);
    setIsOpen((prev) => !prev);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const columns = [
    { field: 'studentId', headerName: 'Student Number', width: 400, flex: 0.3 },
    { field: 'studentName', headerName: 'Student Name', width: 400, flex: 0.3 },
    {
      field: 'evaluationForm',
      headerName: 'Evaluation Form',
      width: 400,
      headerClassName: 'ctrainees',
      filterable: false,
      sortable: false,
      renderCell: (params: { id: any }) => (
        <IconButton
          sx={{ ml: 3.5 }}
          aria-label="progress form"
          onClick={() => handleOpenDialog(params.id)}
        >
          <NoteAltIcon sx={{ color: '#820000' }} className="edit-icon" />
        </IconButton>
      ),
    },
  ];

  const rows = data.map((row) => ({
    id: row.id,
    studentId: row.studentId,
    studentName: row.Student.name,
    type: row.type,
    semester: row.semester,
    status: row.status,
    startDate: row.startDate,
    endDate: row.endDate,
    Student: row.Student,
    companyBranchId: row.companyBranchId,
    trainerId: row.trainerId,
  }));
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
            Submitted Trainees
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

      <Dialog
        open={isOpen}
        onClose={handleCloseDialog}
        fullScreen
        TransitionComponent={Transition}
        sx={{ left: '30%' }}
      >
        <DialogTitle gap={1.5} sx={{ textAlign: 'center' }}></DialogTitle>
        <DialogContent>
          <EvaluStepper />
        

        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubmittedStudents;