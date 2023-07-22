import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Box, Card, CardContent, Divider, Grid } from '@mui/material';
import './style.css';

import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from 'react';


import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { EvaluationData } from 'src/api/types';
import RichTextEditor from 'src/containers/RichTextEditor';
import { useTranslation } from 'react-i18next';

interface ThirdPageProps {
  response: EvaluationData[];
}

const ThirdPage: React.FC<ThirdPageProps> = ({ response }) => {
//@ts-ignore
const {t}=useTranslation();
  return (
    <>
      <Grid sx={{ padding: '2' }}>
        {response[0]?.Evaluations.map(
          (
            item,
            index: number
          ) => {
            const re = JSON.stringify(item.skills);
            const result = `${re}`;
            console.log(item.skills);
            console.log(result);
            return(
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
                        <Typography sx={{ fontWeight: '600' }}>
                          {t("Day")} {index + 1}
                        </Typography>
                        <Stack gap={1.5} direction="row">
                          <WatchLaterIcon color="action" />
                          <Typography sx={{ fontWeight: '600' }}>
                            {t("StartTime")} :
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
                            {t("EndTime")} :
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
                        <Stack gap={1.5} >
                        <Stack gap={1.5} direction='row'>
                          <FormatListNumberedIcon color="action" />
                          <Typography sx={{ fontWeight: '600' }}>
                            {t("Skills")}:
                          </Typography>
                          </Stack>
                          <RichTextEditor
                            editable={false}
                            //@ts-ignore
                            content={JSON.stringify(item.skills)}
                          />
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Stack>
              </Stack>
            </>
          );}
        )}
      </Grid>
    </>
  );
};
export default ThirdPage;
