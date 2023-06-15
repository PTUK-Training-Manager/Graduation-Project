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
import { useTranslation } from 'react-i18next';

interface Trainer {
    id: string;
    companyId: string;
    fieldId: string;
    Field: {
      id: string;
      field: string;
    };
    name: string;
    status: string;
    userId: string;
  }

const uselogic = () => {
  const { showSnackbar } = useSnackbar();
  const [trainingID, setTrainingID] = useState<string>('');
  const [trainerID, setTrainerID] = useState<string>('');
  const [joinDialogOpen, setJoinDialogOpen] = useState<boolean>(false);
  const [availableTrainers, setAvailableTrainers] = useState<Trainer[]>([]);
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
      const result = await getTrainers();
      setAvailableTrainers(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoin = (trainerId: string) => {
    setTrainerID(trainerId);
    handleverifyClick();
  };

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
          setData((prevData) =>
            prevData.filter((row) => row.id !== trainingID)
          );
          handleVerifyCancel();
        } else if (result.success === false) {
          console.log('error');
        }
      })
      .catch((error) => console.log(error));
  };
  const {t}=useTranslation();
  const StudentNumber = t('StudentNumber');
  const StudentName = t('StudentName');
  const CompanyBranch=t('CompanyBranch');
  const JoinTrainer=t('JoinTrainer');
  
  const columns: ColumnDef<AcceptedTrainingsData, any>[] = [
    {
      accessorKey: 'studentId',
      header: StudentNumber,
    },
    {
      accessorKey: 'Student.name',
      header: StudentName,
      filterFn: 'arrIncludesSome',
    },
    {
      accessorKey: 'CompanyBranch.location',
      header: CompanyBranch,
      filterFn: 'arrIncludesSome',
    },
    
    {
      header: JoinTrainer,
      //@ts-ignore
      cell: (params: { row: AcceptedTrainingsData }) => {
        return (
            <IconButton
            sx={{ ml: 3 }}
            aria-label="progress form"
            onClick={() => handleJoinClick(params.row.id)}
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
  };
};

export default uselogic;
