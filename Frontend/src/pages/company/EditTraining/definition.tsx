import { Chip, IconButton } from '@mui/material';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { createDataGrid } from 'src/components/DataGridTanstack';
import { Feed } from '@mui/icons-material';
import { FC, useEffect, useState } from 'react';
import { progressForm } from 'src/api/progress';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
import { RunningTraineesData } from './api/response.dto';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

interface ProgressFormCellProps extends CellContext<RunningTraineesData, any> {}
const uselogic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [trainingId, setTrainingId] = useState('');
  const [response, setReponse] = useState<Response>();
  const [pagination, setPagination] = useState<PageChangeParams>({
    pageIndex: 0,
    pageSize: 10,
  });
 
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

  const columns: ColumnDef<RunningTraineesData, any>[] = [
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
        accessorKey: 'Trainer.name',
        header: 'Trainer Name',
        filterFn: 'arrIncludesSome',
      },
    {
      header: 'Edit Trainer',
      //@ts-ignore
      cell: (params: { row: RunningTraineesData }) => {
        return (
            <IconButton aria-label="edit field"
            // onClick={() => handleJoinClick(params.id)}
  >
    <EditIcon
      sx={{ color: 'white', backgroundColor: 'orange' }}
      className="edit-icon"
    />
  </IconButton>
        );
      },
    },
    {
        header: 'Cancel Training',
        //@ts-ignore
        cell: (params: { row: RunningTraineesData }) => {
          return (
            <IconButton
            sx={{ ml: 3.5 }}
            color="error"
            aria-label="cancel training"
            // onClick={() => handleCancelClick(params.row.id)}
          >
            <ClearIcon />
          </IconButton>
          );
        },
      },
  ];

  const CurrentTraineesDataGrid = createDataGrid({
    name: 'CurrentTraineesDataGrid',
    columns,
    shouldFlexGrowCells: true,
  });

  return {
    handleOpenDialog,
    handleCloseDialog,
    isOpen,
    open: !!isOpen,
    response,
    trainingId,
    CurrentTraineesDataGrid,
  };
};
export default uselogic;
