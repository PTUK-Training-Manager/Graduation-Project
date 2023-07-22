/* eslint-disable react/react-in-jsx-scope */
import Box from '@mui/material/Box';
import FirstPage from './FirstPage';
import { FC, useEffect, useState } from 'react';
import {
  getEvaluationsForTrainer,
} from 'src/api/getEvaluation';
import { EvaluationData } from 'src/api/types';
import '../CompletedTrainees.css';

interface EvaluStepperProps {
  trainingId: string;
}

const EvaluStepper: FC<EvaluStepperProps> = ({ trainingId }) => {
  const [response, setResponse] = useState<EvaluationData[]>([]);

  useEffect(() => {
    console.log(trainingId);

    getEvaluationsForTrainer({ trainingId: trainingId })
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
