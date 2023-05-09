import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import { FC } from 'react';
import useCompletedTraineesController from '../hooks/useCompletedTraineesController';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
interface EvaluationFormDialogProps {
  // isOpen: boolean;
  // currentTab: string;
  // handleChangeTab: (event: SyntheticEvent, newValue: string) => void;
  // handleCloseDialog: () => void;
  // data?: Row[];
}
const EvaluationFormDialog: FC<EvaluationFormDialogProps> = ({}) => {
  const { response, isOpen, currentTab, handleChangeTab, open } =
    useCompletedTraineesController();
  
  return (
    <React.Fragment>
      <Stack sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontStyle: 'oblique', mb: '10px' }}>
          Field Traning
        </Typography>
      </Stack>
      <Divider />
      <Container sx={{ p: '50px' }}>
        {/* Student */}

        <Card sx={{ minWidth: 100, mb: '5px' }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
            Evaluation of student behavior:
            </Typography>

            <Stack>
              <Typography sx={{ fontWeight: '600' }} component="div">
                The student's interaction and response to the trainer's
                instructions was:
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                    
                      value="Exelant"
                      control={<Radio />}
                      label="Exelant"
                    />
                    <FormControlLabel
                    
                      value="Very Good"
                      control={<Radio />}
                      label="Very Good "
                    />
                    <FormControlLabel
                    
                      value="Good"
                      control={<Radio />}
                      label="Good"
                    />
                    <FormControlLabel  control={<Radio />} label="weak" />
                  </RadioGroup>{' '}
                </Typography>
              </Typography>
            </Stack>

            <Stack>
              <Typography sx={{ fontWeight: '600' }} component="div">
                The student's interaction with his colleagues at work was:
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                    
                      value="Exelant"
                      control={<Radio />}
                      label="Exelant"
                    />
                    <FormControlLabel
                    
                      value="Very Good"
                      control={<Radio />}
                      label="Very Good "
                    />
                    <FormControlLabel
                    
                      value="Good"
                      control={<Radio />}
                      label="Good"
                    />
                    <FormControlLabel  control={<Radio />} label="weak" />
                  </RadioGroup>{' '}
                </Typography>
              </Typography>
            </Stack>
      
          </CardContent>
        </Card>
        <Divider />

        {/* Company */}
        <Card sx={{ minWidth: '100%', mb: '5px' }}>
          <CardContent sx={{}}>
            <Typography variant="h6" gutterBottom>
            Administrator:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={8} sm={4}>
                <TextField
                  required
                  id="name"
                  name="Name"
                  label=" Name "
                  autoComplete="given-name"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  required
                  id="position"
                  name="position"
                  label="                Position"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  required
                  id="phone"
                  name="phone"
                  label="Phone Number"
                  autoComplete="phone"
                  variant="standard"
                />
              </Grid>  
            </Grid>
          </CardContent>
        </Card>
        <Divider />

        <Card sx={{ minWidth: '100%', mb: '5px' }}>
          <CardContent sx={{}}>
            <Typography variant="h6" gutterBottom>
            Training Officer Notes:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={8} sm={4}>
                <TextField
                  required
                  id="name"
                  name="Name"
                  label=" Name "
                  autoComplete="given-name"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  required
                  id="position"
                  name="position"
                  label="                Position"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  required
                  id="note"
                  name="note"
                  label="Note"
                  autoComplete="phone"
                  variant="standard"
                />
              </Grid>  
            </Grid>
          </CardContent>
        </Card>
        <Divider />
     
      </Container>
    </React.Fragment>
  );
};
export default EvaluationFormDialog;