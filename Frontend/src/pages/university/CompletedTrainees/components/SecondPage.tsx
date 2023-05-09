import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import './style.css';
import { FormControlLabel } from '@mui/material';
import { useState } from 'react';
import useCompletedTraineesController from '../hooks/useCompletedTraineesController';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
export default function Review() {
  const [houer, setHouer] = useState('0');

  const handleChange = (event: SelectChangeEvent) => {
    setHouer(event.target.value as any);
  };
  const {
    response,
    isOpen,
    currentTab,
    handleChangeTab,
    open,
    // evaluationTrainingReport,
  } = useCompletedTraineesController();
  
  return (
    <>
      <Grid container sx={{ padding: '24px' }}>
        <Stack gap={2} >
      <Typography variant="h6"  gutterBottom>
                Student benefit from training:
              </Typography>
        {response[0]?.Answered_Questions?.slice(0,length-1).map(
          (item,index
          ) => (
            <>
              <Stack gap={2} spacing={2}>
               
                <Stack gap={5} spacing={2}>
                  <Card
                    sx={{
                      minWidth: 275,
                      borderLeft: 6,
                      borderColor: 'black',
                    }}
                  >
                    
                    <CardContent>
                      <Stack spacing={2}>
                        <Typography sx={{ fontWeight: '600' }}>Question {index + 1} :</Typography>
                        <Stack gap={1.5} direction="row">
                          <Typography sx={{ fontWeight: '600' }}>
                            
                  
                              {item.Question.question}
                          </Typography>
                        </Stack>
                        {item.Answer?.answer && (
                        <><Stack>
                             <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={item.Answer.answer}
                    >
                      <FormControlLabel
                        disabled
                        value="excellent"
                        control={<Radio />}
                        label="Excellent"
                      />
                      <FormControlLabel
                        disabled
                        value="good"
                        control={<Radio />}
                        label="Good"
                      />
                      <FormControlLabel
                        disabled
                        value="acceptable"
                        control={<Radio />}
                        label="Acceptable"
                      />
                      <FormControlLabel
                        disabled
                        value="weak"
                        control={<Radio />}
                        label="Weak"
                      />
                    </RadioGroup>
                            </Stack></>
                        )}
                        {item.Note?.note && (
                        <Stack gap={1.5} direction="row">
                          <Typography sx={{ fontWeight: '600' }}>
                            Note :
                            <Typography
                              sx={{
                                display: 'inline-block',
                                fontWeight: '400',
                              }}
                            >
                              {item.Note?.note}
                            </Typography>
                          </Typography>
                        </Stack>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                </Stack>
              </Stack>
            </>
          )
        )}
        </Stack>
      </Grid>
    </>
  );
}