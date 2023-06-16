import React, { FC, useState } from 'react';
import Stack from '@mui/material/Stack';
import useAllTrainingsController from './hooks/useAllTrainingsController';
import theme from 'src/styling/customTheme';
import { Grid, Typography } from '@mui/material';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
import AllTrainingsDataGrid from './definition';
import { AllTrainingsData } from './api/response.dto';
import { CellContext } from '@tanstack/react-table';
import AllTrainingss from './definition';
import { useTranslation } from 'react-i18next';

const AllTrainings: FC = () => {
  const [pagination, setPagination] = useState<PageChangeParams>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { rows } = useAllTrainingsController({
    pagination,
  });
  const { t } = useTranslation();
  return (
    <>
      <Grid
        container
        sx={{
          p: 3,
          justifyContent: 'center',
          alignItems: 'center',
          height: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
        }}
      >
        <Stack
          gap={1.5}
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <Typography component="h1" variant="h5" fontWeight={500}>
            {t('All Trainings')}
          </Typography>
          <AllTrainingsDataGrid data={rows} />
        </Stack>
      </Grid>
    </>
  );
};

export default AllTrainings;
