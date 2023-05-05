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
  return (
    <>
      <Container sx={{ p: '50px' }}>
        <Stack sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontStyle: 'oblique', mb: '10px' }}>
            Field Traning
          </Typography>
        </Stack>

        <Card sx={{ minWidth: 200, mb: '5px' }}>
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
                    disabled
                      value="Exelant"
                      control={<Radio />}
                      label="Exelant"
                    />
                    <FormControlLabel
                    disabled
                      value="Very Good"
                      control={<Radio />}
                      label="Very Good "
                    />
                    <FormControlLabel
                    disabled
                      value="Good"
                      control={<Radio />}
                      label="Good"
                    />
                    <FormControlLabel disabled control={<Radio />} label="weak" />
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
                    disabled
                      value="Exelant"
                      control={<Radio />}
                      label="Exelant"
                    />
                    <FormControlLabel
                    disabled
                      value="Very Good"
                      control={<Radio />}
                      label="Very Good "
                    />
                    <FormControlLabel
                    disabled
                      value="Good"
                      control={<Radio />}
                      label="Good"
                    />
                    <FormControlLabel disabled control={<Radio />} label="weak" />
                  </RadioGroup>{' '}
                </Typography>
              </Typography>
            </Stack>
          </CardContent>
        </Card>
        <Divider />

        <Card sx={{ minWidth: 200, mb: '5px' }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Administrator:
            </Typography>
            <Typography sx={{ fontWeight: '600' }} component="div">
              Name
              <Typography
                sx={{ mb: 1.5, display: 'inline-block' }}
                color="text.secondary"
              >
                ..........
              </Typography>
            </Typography>
            <Typography sx={{ fontWeight: '600' }} component="div">
              position
              <Typography
                sx={{ mb: 1.5, display: 'inline-block' }}
                color="text.secondary"
              >
                ..........
              </Typography>
            </Typography>
          </CardContent>
        </Card>
        <Divider />

        <Card sx={{ minWidth: 200, mb: '5px' }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Training Officer Notes:
            </Typography>
            <Typography sx={{ fontWeight: '600' }} component="div">
              Name:
              <Typography
                sx={{ mb: 1.5, display: 'inline-block' }}
                color="text.secondary"
              >
                ..........
              </Typography>
            </Typography>
            <Typography sx={{ fontWeight: '600' }} component="div">
              position
              <Typography
                sx={{ mb: 1.5, display: 'inline-block' }}
                color="text.secondary"
              >
                ..........
              </Typography>
            </Typography>
          </CardContent>
        </Card>

        <Divider />

        <Card sx={{ minWidth: 200, mb: '5px' }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              University Training Officer Notes:
            </Typography>
            <Typography sx={{ fontWeight: '600' }} component="div">
              Name:
              <Typography
                sx={{ mb: 1.5, display: 'inline-block' }}
                color="text.secondary"
              >
                ..........
              </Typography>
            </Typography>
            <Typography sx={{ fontWeight: '600' }} component="div">
              note
              <Typography
                sx={{ mb: 1.5, display: 'inline-block' }}
                color="text.secondary"
              >
                ..........
              </Typography>
            </Typography>
            <Typography sx={{ fontWeight: '600' }} component="div">
              First training hours :
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                disabled
                  sx={{ height: '25px', width: '60px' }}
                  value={houer}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem  value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>200</MenuItem>
                  <MenuItem value={20}>400</MenuItem>
                </Select>
              </FormControl>
            </Typography>
            <Typography sx={{ fontWeight: '600' }} component="div">
              Second training hours :
              <FormControl sx={{ m: 1, minWidth: 120 }}>

                <Select
                disabled
                  sx={{ height: '25px', width: '60px' }}
                  value={houer}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>200</MenuItem>
                  <MenuItem value={20}></MenuItem>
                </Select>
              </FormControl>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}