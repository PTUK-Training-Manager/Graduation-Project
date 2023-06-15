import { ColumnDef } from '@tanstack/react-table';
import { createDataGrid } from 'src/components/DataGridTanstack';
import { AcceptedTrainingsData } from './api/response.dto';
import { Button, IconButton } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { assignTrainer } from './api';
import useSnackbar from 'src/hooks/useSnackbar';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useState } from 'react';
import { AssignTrainerRequestBody } from './api/request.dto';
import dayjs, { Dayjs } from 'dayjs';
import { getTrainers } from '../Trainers/api';
import { TrainersData } from '../Trainers/api/response.dto';
import { useQueryClient } from '@tanstack/react-query';


const uselogic = () => {
  const { showSnackbar } = useSnackbar();
  const [trainingID, setTrainingID] = useState<string>('');
  const [trainerID, setTrainerID] = useState<string>('');
  const [joinDialogOpen, setJoinDialogOpen] = useState<boolean>(false);
  const [availableTrainers, setAvailableTrainers] = useState<TrainersData[]>([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs(''));
  const [data, setData] = useState<AcceptedTrainingsData[]>([]);

  const handleJoinClick = (id: string) => {
    setTrainingID(id);
    setJoinDialogOpen(true);
    handleJoinDialogOpen();
  };
  //@ts-ignore
  const handleJoinDialogClose = () => {
    setJoinDialogOpen(false);
  };
  const handleverifyClick = () => {
    setConfirmDialogOpen(true);
  };

  const handleVerifyCancel = () => {
    setConfirmDialogOpen(false);
    setJoinDialogOpen(false);
    setSelectedDate(null)
  };

  const handleJoinDialogOpen = async () => {
    try {
      const result = await getTrainers({page: -1, size: -1});
      //@ts-ignore
      setAvailableTrainers(result.data.items);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoin = (trainerId: string) => {
    setTrainerID(trainerId);
    handleverifyClick();
  };
  const queryClient = useQueryClient();

  const handleVerifyJoin = () => {
    const body: AssignTrainerRequestBody = {
      trainingId: trainingID,
      trainerId: trainerID,
      //@ts-ignore
      startDate: selectedDate,
    };
    assignTrainer(body)
      .then((result) => {
        if (result.success === true) {
          showSnackbar({ severity: 'success', message: result.message });
          const res= queryClient.getQueryData(["aceeptedRequests"]) as AcceptedTrainingsData[] ;
          queryClient.setQueryData(["aceeptedRequests"],res.filter((row) => row.id !== trainingID));
          handleVerifyCancel();
        } else if (result.success === false) {
          console.log('error');
        }
      })
      .catch((error) => console.log(error));
  };

  const columns: ColumnDef<AcceptedTrainingsData, any>[] = [
    {
      accessorKey: 'studentId',
      header: 'Student Number',
    },
    {
      accessorKey: 'Student.name',
      header: 'Student Name',
      filterFn: 'arrIncludesSome',
    },
    {
      accessorKey: 'CompanyBranch.location',
      header: 'Company Branch',
      filterFn: 'arrIncludesSome',
    },
    
    {
      header: 'Join Trainer',
      cell: (props) => {
        const {
          row: { original },
        } = props;
        return (
            <IconButton
            sx={{ ml: 3 }}
            aria-label="progress form"
            onClick={() => handleJoinClick(original.id)}
          >
            <PersonAddAlt1Icon
              sx={{ color: '#820000' }}
              className="manage-icon"
            />
          </IconButton>
        );
      },
    },
  ];
  const onSetDate = (date: Dayjs | null) => setSelectedDate(date);

  const AcceptedRequestsDataGrid = createDataGrid({
    name: 'TrainingRequestsDataGrid',
    columns,
    shouldFlexGrowCells: true,
  });

  return {
    availableTrainers,
    AcceptedRequestsDataGrid,
    joinDialogOpen,
    handleJoinDialogClose,
    confirmDialogOpen,
    handleVerifyJoin,
    handleVerifyCancel,
    selectedDate,
    onSetDate,
    handleJoin,
  };
};

export default uselogic;
