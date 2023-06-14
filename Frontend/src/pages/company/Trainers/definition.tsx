import { Chip, IconButton } from '@mui/material';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { createDataGrid } from 'src/components/DataGridTanstack';
import { Feed } from '@mui/icons-material';
import { FC, useEffect, useState } from 'react';
import { progressForm } from 'src/api/progress';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
// import { RunningTraineesData } from './api/response.dto';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { TrainersData } from './api/response.dto';

interface ProgressFormCellProps extends CellContext<TrainersData, any> {}
const uselogic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [trainingId, setTrainingId] = useState('');
  const [response, setReponse] = useState<Response>();
  const [pagination, setPagination] = useState<PageChangeParams>({
    pageIndex: 0,
    pageSize: 10,
  });
 
  // useEffect(() => {
  //   progressForm({ trainingId: trainingId }).then((res) => {
  //     //@ts-ignore
  //     setReponse(res.data);
  //   });
  // }, [trainingId]);

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
        accessorKey: 'Trainer.name',
        header: 'Trainer Name',
        filterFn: 'arrIncludesSome',
      },
    {
      header: 'Edit Field',
      //@ts-ignore
      cell: (params: { row: RunningTraineesData }) => {
        return (
          <IconButton
          // onClick={() => handleUpdateFieldDialogOpen(params.id)}
          aria-label="edit field"
        >
          <EditIcon sx={{ color: '#820000' }} className="edit-icon" />
        </IconButton>
        );
      },
    },
    {
        header: 'Delete Trainer',
        //@ts-ignore
        cell: (params: { row: TrainersData }) => {
          return (
            <IconButton
            sx={{ ml: 3.5 }}
            color="error"
            aria-label="delete trianer"
            // onClick={() => handleClickDeleteTrainerButton(params.row.id, name)}
          >
            <ClearIcon className="clear" />
          </IconButton>
          );
        },
      },
  ];

  const TrainerDataGrid = createDataGrid({
    name: 'CurrentTraineesDataGrid',
    columns,
    shouldFlexGrowCells: true,
  });

  return {
    TrainerDataGrid,
  };
};
export default uselogic;
