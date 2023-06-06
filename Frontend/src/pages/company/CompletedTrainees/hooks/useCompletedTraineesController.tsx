import { SyntheticEvent, useEffect, useState } from 'react';
import { getCompletedTrainees } from '../api';
import { Row } from '../types';
import { IconButton, Tooltip } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const useCompletedTraineesController = () => {
  const [data, setData] = useState<Row[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [trainingId, setTrainingId] = useState('');

  const [currentTab, setCurrentTab] = useState('one');

  const handleChangeTab = (event: SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const handleOpenDialog = (id: string) => {
    setTrainingId(id);
    setIsOpen((prev) => !prev);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const columns = [
    {
      field: 'studentId',
      headerName: 'Student Number',
      width: 400,
      flex: 0.3,
    },
    {
      field: 'studentName',
      headerName: 'Student Name',
      width: 400,
      flex: 0.3,
    },
    { field: 'trainerName', headerName: 'Trainer', width: 400, flex: 0.3 },

    {
      field: 'branch',
      headerName: 'Company Branch',
      width: 400,
      flex: 0.3,
    },
    {
      field: 'evalForm',
      headerName: 'Evaluation Form',
      width: 400,
      flex: 0.3,
      headerClassName: 'ctrainees',
      filterable: false,
      sortable: false,
      renderCell: (params: { id: any }) => (
        <IconButton
          sx={{ ml: 3.5 }}
          aria-label="progress form"
          onClick={() => handleOpenDialog(params.id)}
        >
          <ManageSearchIcon sx={{ color: '#820000' }} className="manage-icon" />
        </IconButton>
      ),
    },
  ];

  const rows = data.map((row) => ({
    id: row.id,
    studentId: row.studentId,
    studentName: row.Student.name,
    Student: row.Student,
    trainerName: row.Trainer.name,
    Trainer: row.Trainer,
    branch: row.CompanyBranch.location,
    CompanyBranch: row.CompanyBranch,
    companyBranchId: row.companyBranchId,
    trainerId: row.trainerId,
  }));

  useEffect(() => {
    getCompletedTrainees()
      .then((result) => {
        setData(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return {
    currentTab,
    handleChangeTab,
    handleOpenDialog,
    handleCloseDialog,
    columns,
    rows,
    data,
    isOpen,
    open: !!isOpen,
    trainingId,
  };
};

export default useCompletedTraineesController;
