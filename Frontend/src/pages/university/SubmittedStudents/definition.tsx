import { ColumnDef } from '@tanstack/react-table';
import { createDataGrid } from 'src/components/DataGridTanstack';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import useSnackbar from 'src/hooks/useSnackbar';
import { useState } from 'react';
import { SubmittedStudentsData } from './api/response.dto';
import { useTranslation } from 'react-i18next';

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
  const {t}=useTranslation();

  const StudentNumber = t('StudentNumber');
  const StudentName = t('StudentName');
const DeleteRequest=t('DeleteRequest');
  const columns: ColumnDef<SubmittedStudentsData, any>[] = [
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
      header: DeleteRequest,
      //@ts-ignore
      cell: (params: { row: SubmittedStudentsData }) => {
        return (
          <IconButton
            sx={{ ml: 3.5 }}
            aria-label="progress form"
            onClick={() => handleOpenDialog(params.row.id)}
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
