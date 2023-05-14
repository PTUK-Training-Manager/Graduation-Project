import React, { SyntheticEvent, useEffect, useState } from 'react';
import { getQuestion,QuestionsRequestData,QuestionsRequestDataResponse } from 'src/api/getQuestions';
import { IconButton, Tooltip } from '@mui/material';
import { AccessTokenData, getCompletedTraineesForTrainer } from '../api';
import PrintIcon from '@mui/icons-material/Print';
import useSnackbar from 'src/hooks/useSnackbar';

const useFinished200HoursController = () => {
  const [data, setData] = useState<AccessTokenData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('one');
  const [trainingId, setTrainingId] = useState('');
  const [response, setResponse] = useState<QuestionsRequestData[]>([]);
  const { showSnackbar } = useSnackbar();

  const handleChangeTab = (event: SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const handleOpenDialog = (trainingId: string) => {
    setTrainingId(trainingId);
    console.log(trainingId);
    setIsOpen((prev) => !prev);
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
    {
      field: 'evalForm',
      headerName: 'Evaluation Form',
      width: 400,
      flex: 0.3,
      filterable: false,
      sortable: false,
      renderCell: (params: { id: any }) => (
        <Tooltip title={'Evaluation Form'}>
          <IconButton
            sx={{ ml: 2.5 }}
            aria-label={'form 1'}
            size="small"
            onClick={() => handleOpenDialog(params.id)}
          >
            <PrintIcon
              sx={{ color: '#820000' }}
              color="info"
              className="print-icon"
            />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const rows = data.map((row) => ({
    id: row.id,
    studentId: row.studentId,
    studentName: row.Student.name,
    Student: row.Student,
  }));

  useEffect(() => {
    getQuestion()
    .then((result) => {
      setResponse(result.data);
      console.log(result.data);
    })
    .catch((error) => console.log(error));
  }, []);

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getCompletedTraineesForTrainer()
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
    response,
    // evaluationTrainingReport: evaluationTrainingReport?.data,
    open: !!isOpen,
    trainingId
  };
};

export default useFinished200HoursController;
