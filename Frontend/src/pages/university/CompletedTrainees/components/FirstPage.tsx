import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
} from '@mui/material';
import './style.css';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
export default function Review() {
  return (
    // <React.Fragment>
    //   <Container sx={{ p: '50px' }}>
    //     <Stack sx={{ textAlign: 'center'}}>
    //       <Typography variant="h6"  sx={{fontStyle:'oblique'}}>
    //         Field Traning
    //       </Typography>
    //     </Stack>

    //     <Stack sx={{ mt: '30px', textAlign: 'center' }}>
    //       <Grid container spacing={2}>
    //         <Grid item xs={8} sm={4}>
    //           <Typography
    //             gutterBottom
    //             sx={{ mt: 2, fontSize: '20px', fontWeight: 450 }}
    //           >
    //             Student number
    //           </Typography>
    //           <Typography>.......</Typography>
    //         </Grid>
    //         <Grid item xs={8} sm={4}>
    //           <Typography
    //             gutterBottom
    //             sx={{ mt: 2, fontSize: '20px', fontWeight: 500 }}
    //           >
    //             Student Name
    //           </Typography>
    //           <Typography gutterBottom> .........</Typography>
    //         </Grid>
    //         <Grid item xs={8} sm={4}>
    //           <Typography
    //             gutterBottom
    //             sx={{ mt: 2, fontSize: '20px', fontWeight: 500 }}
    //           >
    //             Semester:
    //           </Typography>
    //           <Typography gutterBottom> .........</Typography>
    //         </Grid>
    //         <Grid item xs={8} sm={4}>
    //           <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
    //             phone number
    //           </Typography>
    //           <Typography gutterBottom> .........</Typography>
    //         </Grid>
    //         <Grid item xs={8} sm={4}>
    //           <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
    //             academic specialization
    //           </Typography>
    //           <Typography gutterBottom> .........</Typography>
    //         </Grid>
    //       </Grid>
    //   </Container>
    // </React.Fragment>
    <>
      <Container sx={{ p: '50px' }}>
        <Stack sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontStyle: 'oblique', mb: '10px' }}>
            Field Traning
          </Typography>
        </Stack>
        {/* Student */}
        <Card sx={{ minWidth: 100, mb: '5px' }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Student Information:
            </Typography>

            <Stack>
              <Typography variant="h6" component="div">
                Student Name:
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>

            <Stack>
              <Typography variant="h6" component="div">
                Student Number:
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>

            <Stack>
              <Typography variant="h6" component="div">
                Phone:
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>

            <Stack>
              <Typography variant="h6" component="div">
                academic specialization:
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        {/* Company */}

        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Company Information:
            </Typography>

            <Stack>
              <Typography variant="h6" component="div">
                Company Name:
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>

            <Stack>
              <Typography variant="h6" component="div">
                Email
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>

            <Stack>
              <Typography variant="h6" component="div">
                Phone:
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>

            <Stack>
              <Typography variant="h6" component="div">
                Manegar Name{' '}
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="h6" component="div">
                Trainer Name{' '}
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Student working time{' '}
            </Typography>

            <Stack>
              <Typography variant="h6" component="div">
                Starting Date :
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>

            <Stack>
              <Typography variant="h6" component="div">
                Ending Date{' '}
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>

            <Stack>
              <Typography variant="h6" component="div">
                The daily working period
                <Typography variant="h5" component="div">
                  From{bull}nev{bull}To{bull}lent
                </Typography>
              </Typography>
            </Stack>

            <Stack>
              <Typography variant="h6" component="div">
                number of absence's Day
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="h6" component="div">
                Number of training days for the student
                <Typography
                  sx={{ mb: 1.5, display: 'inline-block' }}
                  color="text.secondary"
                >
                  ..........
                </Typography>
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="h6" component="div">
                Did the student keep working hours?
                <FormControlLabel control={<Checkbox />} label="yes" />
                <FormControlLabel control={<Checkbox />} label="No" />
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}