import { IconButton } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import { createDataGrid } from 'src/components/DataGridTanstack';
import { useState } from 'react';
import { CompletedTraineesData } from './api/types';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useTranslation } from 'react-i18next';
import React from 'react';

const uselogic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [trainingId, setTrainingId] = useState('');
  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  //@ts-ignore
  const { t } = useTranslation();
  const StudentNumber = t('Student Number');
  const StudentName = t('Student Name');
  const EvaluationReport = t('EvaluationReport');
  const TrainerName = t('Trainer Name');
  const CompanyBranch = t('Company Branch');
  const columns: ColumnDef<CompletedTraineesData, any>[] = [
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
      accessorKey: 'Trainer.name',
      header: TrainerName,
      filterFn: 'arrIncludesSome',
    },
    {
      accessorKey: 'CompanyBranch.location',
      header: CompanyBranch,
      filterFn: 'arrIncludesSome',
    },

    {
      header: EvaluationReport,
      //@ts-ignore
      cell: (props) => {
        const {
          row: { original },
        } = props;
        return (
          <IconButton
            sx={{ ml: 3.5 }}
            aria-label="progress form"
            onClick={() => handleOpenDialog(original.id)}
          >
            <ManageSearchIcon
              sx={{ color: '#820000' }}
              className="manage-icon"
            />
          </IconButton>
        );
      },
    },
  ];
  const handleOpenDialog = (id: string) => {
    setTrainingId(id);
    setIsOpen((prev) => !prev);
  };
  const CompletedTraineesCompanyDataGrid = React.useMemo(() => {
    return createDataGrid({
      name: 'CompletedTraineesCompanyDataGrid',
      columns,
      shouldFlexGrowCells: true,
    });
  }, []);

  return {
    handleOpenDialog,
    handleCloseDialog,
    isOpen,
    open: !!isOpen,
    trainingId,
    CompletedTraineesCompanyDataGrid,
  };
};
export default uselogic;
