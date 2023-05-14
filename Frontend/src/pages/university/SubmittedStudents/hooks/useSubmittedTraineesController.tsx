import { SyntheticEvent, useEffect, useState } from 'react';
import { Row } from '../types';
import { IconButton } from '@mui/material';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { getSubmittedStudents } from '../api';

const useSubmittedTraineesController = () => {
  const [data, setData] = useState<Row[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [trainingId, setTrainingId] = useState('');

  const [currentTab, setCurrentTab] = useState('one');

  const handleChangeTab = (event: SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const handleOpenDialog = (id: string) => {
    setTrainingId(id);
    console.log(isOpen);
    setIsOpen((prev) => !prev);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const columns = [
    { field: 'studentId', headerName: 'Student Number', width: 400, flex: 0.3 },
    { field: 'studentName', headerName: 'Student Name', width: 400, flex: 0.3 },
    {
      field: 'evaluationForm',
      headerName: 'Evaluation Form',
      width: 400,
      headerClassName: 'ctrainees',
      filterable: false,
      sortable: false,
      renderCell: (params: { id: any }) => (
        <IconButton
          sx={{ ml: 3.5 }}
          aria-label="progress form"
          onClick={() => handleOpenDialog(params.id)}
        >
          <NoteAltIcon sx={{ color: '#820000' }} className="edit-icon" />
        </IconButton>
      ),
    },
  ];

  const rows = data.map((row) => ({
    id: row.id,
    studentId: row.studentId,
    studentName: row.Student.name,
    type: row.type,
    semester: row.semester,
    status: row.status,
    startDate: row.startDate,
    endDate: row.endDate,
    Student: row.Student,
    companyBranchId: row.companyBranchId,
    trainerId: row.trainerId,
  }));

  useEffect(() => {
    getSubmittedStudents()
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

export default useSubmittedTraineesController;
