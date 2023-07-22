import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import ThirdPage from './ThirdPage';
import { FC, useEffect, useState } from 'react';
import {
  getEvaluations,
  getEvaluationsForTrainer,
} from 'src/api/getEvaluation';
import { EvaluationData } from 'src/api/types';
import { QuestionsRequestData, getQuestion } from 'src/api/getQuestions';
import uselogic from '../definition';

const steps = ['First Page', 'Second Page', 'Third Page'];

interface EvaluStepperProps {
  trainingId: string;
}

const EvaluStepper: FC<EvaluStepperProps> = ({ trainingId }) => {
  const [response, setResponse] = useState<EvaluationData[]>([]);
  const [question, setQuestion] = useState<QuestionsRequestData[]>([]);
  useEffect(() => {
    getQuestion()
      .then((result) => {
        setQuestion(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log(question);

  useEffect(() => {
    console.log(trainingId);

    getEvaluationsForTrainer({ trainingId: trainingId })
      .then((result) => {
        setResponse(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log(response);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && <FirstPage response={response} />}
          {activeStep === 1 && <SecondPage response={response} />}
          {activeStep === 2 && (
            <ThirdPage
              response={response}
              trainingId={trainingId}
              question={question}
            />
          )}

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default EvaluStepper;
