import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material';
import './style.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import useCompletedTraineesController from '../hooks/useCompletedTraineesController';
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from 'react';

import WatchLaterIcon from '@mui/icons-material/WatchLater';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const ThirdPage: React.FC = ({}) => {
  const {
    response,
    isOpen,
    currentTab,
    handleChangeTab,
    open,
    // evaluationTrainingReport,
  } = useCompletedTraineesController();
  console.log(response);
  console.log(response[0]?.id);
  console.log(isOpen);

  // console.log({
  //   evaluationTrainingReport,
  // });

  return (
    <>
      <Grid sx={{ padding: '2' }}>
        {response[0]?.Evaluations.map(
          (
            item: {
              startTime:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | ReactFragment
                | ReactPortal
                | null
                | undefined;
              endTime:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | ReactFragment
                | ReactPortal
                | null
                | undefined;
              skills:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | ReactFragment
                | ReactPortal
                | null
                | undefined;
            },
            index: number
          ) => (
            <>
              <Stack gap={2} spacing={2}>
                <Divider />

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
                        <Typography sx={{ fontWeight: '600' }}>Day {index + 1}</Typography>
                        <Stack gap={1.5} direction="row">
                          <WatchLaterIcon color="action" />
                          <Typography sx={{ fontWeight: '600' }}>
                            Start Time :
                            <Typography
                              sx={{
                                display: 'inline-block',
                                fontWeight: '400',
                              }}
                            >
                              {item.startTime}
                            </Typography>
                          </Typography>
                        </Stack>
                        <Stack gap={1.5} direction="row">
                          <WatchLaterIcon color="action" />
                          <Typography sx={{ fontWeight: '600' }}>
                            End Time :
                            <Typography
                              sx={{
                                display: 'inline-block',
                                fontWeight: '400',
                              }}
                            >
                              {item.endTime}
                            </Typography>
                          </Typography>
                        </Stack>
                        <Stack gap={1.5} direction="row">
                          <FormatListNumberedIcon color="action" />
                          <Typography sx={{ fontWeight: '600' }}>
                            Skills :
                            <Typography
                              sx={{
                                display: 'inline-block',
                                fontWeight: '400',
                              }}
                            >
                              {item.skills}
                            </Typography>
                          </Typography>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Stack>
              </Stack>
            </>
          )
        )}
      </Grid>
    </>
  );
};
export default ThirdPage;
