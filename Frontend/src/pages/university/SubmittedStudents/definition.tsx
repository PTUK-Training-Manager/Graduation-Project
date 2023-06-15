import { ColumnDef } from '@tanstack/react-table';
import { createDataGrid } from 'src/components/DataGridTanstack';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import useSnackbar from 'src/hooks/useSnackbar';
import { useState } from 'react';
import { SubmittedStudentsData } from './api/response.dto';

const uselogic = () => {
  const { showSnackbar } = useSnackbar();
  const [isOpen, setIsOpen] = useState(false);
  const [trainingId, setTrainingId] = useState('');
  const handleOpenDialog = (id: string) => {
    setTrainingId(id);
    console.log(isOpen);
    setIsOpen((prev) => !prev);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const columns: ColumnDef<SubmittedStudentsData, any>[] = [
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
      header: 'Evaluation Form',
      //@ts-ignore
      cell: (props) => {
        const {
          row: { original },
        } = props;         
          return (
          <IconButton
          size='small'
            sx={{ ml: 3.5 }}
            aria-label="progress form"
            onClick={() => handleOpenDialog(original.id)}
          >
            <NoteAltIcon sx={{ color: '#820000' }} className="edit-icon" />
          </IconButton>
        );
      },
    },
  ];

  const SubmittedTraineesDataGrid = createDataGrid({
    name: 'CurrentTraineesDataGrid',
    columns,
    shouldFlexGrowCells: true,
  });

  return {
    isOpen,
    trainingId,
    handleCloseDialog,
    handleOpenDialog,
    SubmittedTraineesDataGrid,
  };
};
export default uselogic;
