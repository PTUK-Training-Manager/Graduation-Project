import React, { useEffect, useState } from 'react';
import MuiPagination from '@mui/material/Pagination';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import TimerIcon from '@mui/icons-material/Timer';
import Grid from '@mui/material/Grid';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import CloseIcon from '@mui/icons-material/Close';
import { Feed, NoteAlt } from '@mui/icons-material';
import { TablePaginationProps } from '@mui/material/TablePagination';
import {
  DataGrid,
  GridPagination,
  GridToolbar,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import './CurrentTrainees.css';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { getCurrentTrainees } from './api';

import {
  Accordion,
  Card,
  CardContent,
  Dialog,
  Drawer,
  IconButton,
  Paper,
  Slide,
  Tab,
  Tabs,
  styled,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import theme from 'src/styling/customTheme';
import { TabList, TabPanel, TabContext } from '@mui/lab';
import { progressForm } from 'src/progressForm';
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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

interface Row {
  id: string;
  studentId: string;
  companyBranchId: string;
  Student: {
    name: string;
  };
  CompanyBranch: {
    location: string;
    Company: {
      name: string;
    };
  };
}

interface Progress {
    endTime: string,
    id: string,
    noteId: string,
    skills: string,
    startTime: string,
    status: string,
    trainingId: string
}

interface Response {
  achievedHours: string;
  totalHours: string;
  progressForm: Progress[]
  
}

const CurrentTrainees: React.FC = () => {
  const [data, setData] = useState<Row[]>([]);
  const [response, setReponse] = useState<Response>();
  const [trainingId, setTrainingId] = React.useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleClickOpen = (id: string) => {
    setTrainingId(id);
    setOpen(true);
    progressForm({ trainingId: '80' }).then((res) => {
      setReponse(res.data);
      if (res.success) {
        console.log(res.message);
        console.log(res.data);
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getCurrentTrainees()
      .then((result) => {
        setData(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const columns = [
    { field: 'studentId', headerName: 'Student Number', width: 300, flex: 0.3 },
    { field: 'studentName', headerName: 'Student Name', width: 300, flex: 0.3 },
    { field: 'companyName', headerName: 'Company Name', width: 300, flex: 0.3 },
    {
      field: 'progForm',
      headerName: 'Progress Form',
      width: 300,
      flex: 0.3,
      headerClassName: 'ctrainees',
      filterable: false,
      sortable: false,
      renderCell: (params: { id: any }) => (
        <IconButton
          sx={{ ml: 3.5 }}
          aria-label="progress form"
          onClick={() => handleClickOpen(params.id)}
        >
          {/* <ManageSearchIcon sx={{ color: '#820000' }} className="manage-icon" /> */}
          <Feed
            sx={{
              backgroundColor: '#255983',
              borderRadius: '5px',
              color: '#ecf1f1',
              className: 'manage-icon',
            }}
          />
        </IconButton>
      ),
    },
  ];

  const rows = data.map((row) => ({
    id: row.id,
    studentId: row.studentId,
    studentName: row.Student.name,
    companyName: row.CompanyBranch.Company.name,
  }));

  const modifiedProgressForm = response?.progressForm.map((progress) => {});

  return (
    <><Grid
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
                  }} />
          </Stack>
      </Grid>
              <Dialog
                  fullScreen
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Transition}

              >
                  <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleClose}
                      aria-label="close"
                  >
                      <CloseIcon color="error" />
                  </IconButton>

                  <Grid sx={{ p: 3, height: '100vh' }}>
                      <Stack spacing={2}>
                          <Stack gap={1.5} direction="row">
                              <HourglassTopIcon />
                              <Typography>
                                  Achieved Hours: {response?.achievedHours}
                              </Typography>
                          </Stack>
                          <Stack gap={1.5} direction="row">
                              <HourglassFullIcon />
                              <Typography>Total Hours: {response?.totalHours}</Typography>
                          </Stack>

                          {response?.progressForm.map((item, index) => (
                              <Accordion>
                                  <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                                  >
                                      <Typography>Day {index + 1}</Typography>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                      <Box sx={{ width: '100%', typography: 'body1' }}>
                                          <Box
                                              sx={{ borderBottom: 1, borderColor: 'divider' }}
                                          ></Box>
                                          <Card
                                              sx={{
                                                  minWidth: 275,
                                                  borderLeft: 6,
                                                  borderColor: 'orange',
                                              }}
                                          >
                                              <CardContent>
                                                  <Stack spacing={2}>
                                                      <Stack gap={1.5} direction="row">
                                                          <WatchLaterIcon />
                                                          <Typography>Start Time: {item.startTime} </Typography>
                                                      </Stack>
                                                      <Stack gap={1.5} direction="row">
                                                          <WatchLaterIcon />
                                                          <Typography>End Time:{item.endTime} </Typography>
                                                      </Stack>
                                                      <Stack gap={1.5} direction="row">
                                                          <FormatListNumberedIcon />
                                                          <Typography>Skills:{item.skills} </Typography>
                                                      </Stack>
                                                  </Stack>
                                              </CardContent>
                                          </Card>
                                      </Box>
                                  </AccordionDetails>
                              </Accordion>
                          ))}
                      </Stack>
                  </Grid>
              </Dialog>
          </>
      
  );
};

export default CurrentTrainees;
