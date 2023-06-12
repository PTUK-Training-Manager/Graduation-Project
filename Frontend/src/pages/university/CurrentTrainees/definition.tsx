import { Chip, IconButton } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import { RunningTraineesData } from './api/response.dto';
import { createDataGrid } from 'src/components/DataGridTanstack';
import { Feed } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { progressForm } from 'src/api/progress';

const uselogic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [trainingId, setTrainingId] = useState('');
  const [response, setReponse] = useState<Response>();

  useEffect(() => {
    progressForm({ trainingId: trainingId }).then((res) => {
      //@ts-ignore
      setReponse(res.data);
    });
  }, [trainingId]);

  const handleOpenDialog = (id: string) => {
    setTrainingId(id);
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
      filterFn: 'includesString',
      size: 372,
    },
    {
      accessorKey: 'name',
      header: 'Student Name',
      size: 372,
      filterFn: 'arrIncludesSome',
    },
    {
      accessorKey: 'name',
      header: 'Company Name',
      size: 372,
    },
    {
      accessorKey: 'progressForm',
      header: 'Progress Form',
      size: 372,
      cell: (row) => {
        return (
          <IconButton sx={{ ml: 3.5 }} aria-label="progress form">
            <Feed
              color="warning"
              sx={{
                borderRadius: '5px',
                className: 'manage-icon',
              }}
            />
          </IconButton>
        );
      },
    },
  ];

  const UsersDataGrid = createDataGrid<RunningTraineesData>({
    name: 'DataGridRunningTrainees',
    columns,
  });

  return {
    handleOpenDialog,
    handleCloseDialog,
    isOpen,
    open: !!isOpen,
    response,
    trainingId,
    UsersDataGrid,
  };
};
export default uselogic;
