import { SyntheticEvent, useEffect, useState } from 'react';
import { getCompletedTrainees } from 'src/pages/university/CompletedTrainees/api';
import { Row } from '../types';
import { IconButton, Tooltip } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

const useCompletedTraineesController = () => {
  const [data, setData] = useState<Row[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [studentId, setStudentId] = useState<string>('');
  const [index, setIndex] = useState<number>(-1);

  const [currentTab, setCurrentTab] = useState('one');

  const handleChangeTab = (event: SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const handleOpenDialog = (index: number, id: string) => {
    setIsOpen((prev) => !prev);
    setIndex(index);
    setStudentId(id);
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
      headerClassName: 'ctrainees',
      filterable: false,
      sortable: false,
      renderCell: (params: { row: Row }) => {
        const count = parseInt(params.row.count);
        const index = parseInt(params.row.count) - 1;
        const studentId = params.row.studentId;
        const printIcons = [];

        for (let i = 0; i < count; i++) {
          if (count == 1)
            printIcons.push(
              <Tooltip title={'Evaluation 1'}>
                <IconButton
                  sx={{ ml: 2 }}
                  aria-label={'form 1'}
                  size="small"
                  onClick={() => handleOpenDialog(index, studentId)}
                >
                  <PrintIcon
                    sx={{ color: '#820000' }}
                    color="info"
                    className="print-icon"
                  />
                </IconButton>
              </Tooltip>
            );
          else
            printIcons.push(
              <Tooltip key={i} title={`Evaluation ${i + 1}`}>
                <IconButton
                  aria-label={`form ${i + 1}`}
                  size="small"
                  onClick={() => handleOpenDialog(i, studentId)}
                >
                  <PrintIcon sx={{ color: '#820000' }} className="print-icon" />
                </IconButton>
              </Tooltip>
            );
        }

        return <>{printIcons}</>;
      },
    },
  ];

  const rows = data.map((row) => ({
    studentId: row.studentId,
    studentName: row.Student.name,
    count: row.count,
    Student: row.Student,
  }));

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

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
    index,
    studentId,
  };
};

export default useCompletedTraineesController;
