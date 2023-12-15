import { ColumnDef } from '@tanstack/react-table';
import { createDataGrid } from 'src/components/DataGridTanstack';
import { SubmittedTraineesData } from './api/types';
import { IconButton } from '@mui/material';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import React from 'react';

const uselogic = () => {
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
  //@ts-ignore
  const { t } = useTranslation();
  const onSetClosDialog = (isNeed: boolean) => setIsOpen(isNeed);

  const StudentNumber = t('Student Number');
  const StudentName = t('Student Name');
  const columns: ColumnDef<SubmittedTraineesData, any>[] = [
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
      header: 'Evaluation Form',
      //@ts-ignore
      cell: (props) => {
        const {
          row: { original },
        } = props;
        return (
          <IconButton
            size="small"
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

  const SubmittedTraineesDataGrid = React.useMemo(() => {
    return createDataGrid({
      name: 'SubmittedTraineesDataGrid',
      columns,
      shouldFlexGrowCells: true,
    });
  }, []);

  return {
    isOpen,
    trainingId,
    handleCloseDialog,
    handleOpenDialog,
    SubmittedTraineesDataGrid,
    onSetClosDialog,
  };
};
export default uselogic;
