import { Chip, IconButton } from '@mui/material';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { createDataGrid } from 'src/components/DataGridTanstack';
import { Feed } from '@mui/icons-material';
import { FC, useEffect, useState } from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { progressForm } from 'src/api/progress';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import useSnackbar from 'src/hooks/useSnackbar';
import { useQueryClient } from '@tanstack/react-query';
import { TrainersData } from '../Trainers/api/response.dto';
import { AssignTrainerRequestBody } from '../AcceptedRequests/api/request.dto';
import { assignTrainer } from '../AcceptedRequests/api';
import uselogic from './definition';
const uselogicc = () => {
  const [confirmEditOpen, setConfirmEditOpen] = useState<boolean>(false);
  const [trainingId, setTrainingId] = useState<string>('');
  const { showSnackbar } = useSnackbar();
  const [trainerId, setTrainerID] = useState<string>('');

  const handleJoin = (trainerId: string) => {
    setTrainerID(trainerId);
    handleverifyClick();
  };
  const handleverifyClick = () => {
    setConfirmEditOpen(true);
  };
  const handleVerifyCancel = () => {
    setConfirmEditOpen(false);
    onSetJoinDialogOpen(false);
  };
   const {
    trainingID,
    onSetJoinDialogOpen,
  } = uselogic();

  // const handleVerifyJoin = () => {
  //   console.log(trainingID)
  //   const body: AssignTrainerRequestBody = {
  //     trainingId: trainingID,
  //     trainerId: trainerID,
  //   };
  //   assignTrainer(body)
  //     .then((result) => {
  //       if (result.success === true) {
  //         const trainerName = result.data.name;
  //         console.log(trainerName);
          // const updatedData = data.map((row) => {
          //   if (row.id === trainingID) {
          //     return {
          //       ...row,
          //       Trainer: {
          //         ...row.Trainer,
          //         name: trainerName,
          //       },
          //     };
          //   }
          //   return row;
          // });
          // setData(updatedData);
         
  //         showSnackbar({ severity: 'success', message: result.message });
  //         handleVerifyCancel();
  //       } else if (result.success === false) {
  //         console.log('error');
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // };
  const columns: ColumnDef<TrainersData, any>[] = [
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
      header: 'Join Trainer',
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
  const TrainerDialogDataGrid = createDataGrid({
    name: 'TrainerDataGrid',
    columns,
    shouldFlexGrowCells: true,
  });

  return {
    TrainerDialogDataGrid,
    trainingId,
    handleVerifyCancel,
    handleverifyClick,
    confirmEditOpen,
    
  };
};
export default uselogicc;
