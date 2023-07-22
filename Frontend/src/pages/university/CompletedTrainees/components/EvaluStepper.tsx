/* eslint-disable react/react-in-jsx-scope */
import Box from '@mui/material/Box';
import FirstPage from './FirstPage';
import { FC, useEffect, useState } from 'react';
import { getEvaluations } from 'src/api/getEvaluation';
import { EvaluationData } from 'src/api/types';
import '../CompletedTrainees.css';

interface EvaluStepperProps {
  index: number;
  studentId: string;
}

const EvaluStepper: FC<EvaluStepperProps> = ({ index, studentId }) => {
  const [response, setResponse] = useState<EvaluationData[]>([]);

  useEffect(() => {
    console.log(index);
    console.log(studentId);

    getEvaluations({ index: index, studentId: studentId })
      .then((result) => {
        setResponse(result.data);
        // console.log(result.data);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log(response);

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <FirstPage response={response} />
      </Box>
    </>
  );
};

export default EvaluStepper;
