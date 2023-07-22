import { Chip, IconButton } from '@mui/material';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { createDataGrid } from 'src/components/DataGridTanstack';
import { Feed } from '@mui/icons-material';
import { FC, useEffect, useState } from 'react';
import { progressForm } from 'src/api/progress';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
import { RunningTraineesData } from './api/types';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'react-i18next';
import useSnackbar from 'src/hooks/useSnackbar';
import { TrainersData } from '../Trainers/api/types';
import { assignTrainer, getTrainers } from '../AcceptedRequests/api/index';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { HandleTrainingRequestBody } from '../TrainingRequest/types';
import { handleTrainingRequest } from '../TrainingRequest/api/index';
import { useQueryClient } from '@tanstack/react-query';
import { AssignTrainerRequestBody } from '../AcceptedRequests/api/types';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import React from 'react';
interface ProgressFormCellProps extends CellContext<RunningTraineesData, any> {}
const uselogic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [trainingId, setTrainingId] = useState('');
  const [data, setData] = useState<RunningTraineesData[]>([]);
  const [response, setReponse] = useState<Response>();
  const { showSnackbar } = useSnackbar();
  const [cancelId, setCanceledId] = useState<string>('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [trainingID, setTrainingID] = useState<string>('');
  const [trainerID, setTrainerID] = useState<string>('');
  const [joinDialogOpen, setJoinDialogOpen] = useState<boolean>(false);
  const [availableTrainers, setAvailableTrainers] = useState<TrainersData[]>(
    []
  );
  const onSetJoinDialogOpen = (confirm: boolean) => setJoinDialogOpen(confirm);

  const [confirmEditOpen, setConfirmEditOpen] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PageChangeParams>({
    pageIndex: 0,
    pageSize: 10,
  });
  const queryClient = useQueryClient();

  const handleverifyClick = () => {
    setConfirmEditOpen(true);
  };
  const handleCancel = () => {
    const body: HandleTrainingRequestBody = {
      trainingId: cancelId,
      status: 'canceled',
    };
    handleTrainingRequest(body)
      .then((result) => {
        if (result.success === true) {
          setConfirmDialogOpen(false);
          showSnackbar({ severity: 'success', message: result.message });
          const res = queryClient.getQueryData([
            'EditTrainings',
          ]) as RunningTraineesData[];
          queryClient.setQueryData(
            ['EditTrainings'],
            res.filter((row) => row.id !== trainingID)
          );
          setCanceledId('');
        } else if (result.success === false) {
          showSnackbar({ severity: 'warning', message: result.message });
          setCanceledId('');
          setConfirmDialogOpen(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleJoinClick = (id: string) => {
    setTrainingID(id);
    setJoinDialogOpen(true);
    handleJoinDialogOpen();
  };
  const handleJoinDialogClose = () => {
    setJoinDialogOpen(false);
  };
  const handleDeleteCancel = () => {
    setConfirmDialogOpen(false);
  };
  const handleJoinDialogOpen = async () => {
    try {
      const result = await getTrainers({ pageIndex: 0, pageSize: 9999 });
      setAvailableTrainers(result.items);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancelClick = (id: string) => {
    setCanceledId(id);
    setConfirmDialogOpen(true);
  };
  const handleJoin = (trainerId: string) => {
    setTrainerID(trainerId);
    handleverifyClick();
  };
  const handleVerifyCancel = () => {
    setConfirmEditOpen(false);
    setJoinDialogOpen(false);
  };
  useEffect(() => {
    progressForm({ trainingId: trainingId }).then((res) => {
      //@ts-ignore
      setReponse(res.data);
    });
  }, [trainingId]);

  const handleOpenDialog = (id: string) => {
    setTrainingId(id);
    console.log(trainingId);
    console.log(isOpen);
    setIsOpen((prev) => !prev);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setTrainingId('');
  };
  //@ts-ignore
  const { t } = useTranslation();
  const StudentNumber = t('StudentNumber');
  const StudentName = t('StudentName');
  const EditTrainer = t('EditTrainer');
  const TrainerName = t('TrainerName');
  const CompanyBranch = t('CompanyBranch');
  const CancelTraining = t('CancelTraining');
  CancelTraining;
  const columnsForDialog: ColumnDef<TrainersData, any>[] = [
    {
      accessorKey: 'id',
      header: 'Trainer Id',
    },
    {
      accessorKey: 'name',
      header: 'Trainer Name',
      filterFn: 'arrIncludesSome',
    },
    {
      accessorKey: 'Field.field',
      header: 'Field',
      filterFn: 'arrIncludesSome',
    },

    {
      header: 'Edit Field',
      cell: (props) => {
        const {
          row: { original },
        } = props;
        return (
          <IconButton
            aria-label="edit field"
            onClick={() => handleJoin(original.id)}
          >
            <CheckBoxIcon
              sx={{ color: 'blue', backgroundColor: 'white' }}
              className="edit-icon"
            />
          </IconButton>
        );
      },
    },
  ];

  const columns: ColumnDef<RunningTraineesData, any>[] = [
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
      accessorKey: 'Trainer.name',
      header: TrainerName,
      filterFn: 'arrIncludesSome',
    },
    {
      header: EditTrainer,
      //@ts-ignore
      cell: (props) => {
        const {
          row: { original },
        } = props;
        return (
          <IconButton
            aria-label="edit field"
            size="small"
            onClick={() => handleJoinClick(original.id)}
          >
            <ManageAccountsIcon
              sx={{ color: '#820000', ml: '1.5rem' }}
              className="edit-icon"
            />
          </IconButton>
        );
      },
    },
    {
      header: CancelTraining,
      //@ts-ignore
      cell: (props) => {
        const {
          row: { original },
        } = props;
        return (
          <IconButton
            sx={{ ml: 3.7 }}
            color="error"
            aria-label="cancel training"
            onClick={() => handleCancelClick(original.id)}
          >
            <ClearIcon />
          </IconButton>
        );
      },
    },
  ];
  const handleVerifyJoin = () => {
    const body: AssignTrainerRequestBody = {
      trainingId: trainingID,
      trainerId: trainerID,
    };
    assignTrainer(body)
      .then((result) => {
        if (result.success === true) {
          const trainerName = result.data.name;
          console.log(trainerName);
          const updatedData = data.map((row) => {
            if (row.id === trainingID) {
              return {
                ...row,
                Trainer: {
                  ...row.Trainer,
                  name: trainerName,
                },
              };
            }
            return row;
          });
          setData(updatedData);

          showSnackbar({ severity: 'success', message: result.message });
          handleVerifyCancel();
        } else if (result.success === false) {
          console.log('error');
        }
      })
      .catch((error) => console.log(error));
  };
  const CurrentTraineesDataGrid = React.useMemo(() => {
    return createDataGrid({
      name: 'CurrentTraineesDataGrid',
      columns,
      shouldFlexGrowCells: true,
    });
  }, []);

  return {
    onSetJoinDialogOpen,
    trainingID,
    CurrentTraineesDataGrid,
    handleCancel,
    handleCancelClick,
    handleCloseDialog,
    handleDeleteCancel,
    handleJoin,
    handleJoinClick,
    handleJoinDialogClose,
    handleJoinDialogOpen,
    handleOpenDialog,
    handleTrainingRequest,
    handleVerifyCancel,
    handleverifyClick,
    joinDialogOpen,
    availableTrainers,
    confirmDialogOpen,
    confirmEditOpen,
    handleVerifyJoin,
  };
};
export default uselogic;
