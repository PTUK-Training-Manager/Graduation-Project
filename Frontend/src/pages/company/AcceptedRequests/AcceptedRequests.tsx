import React, { useEffect, useState } from 'react';
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import {
  DataGrid,
  GridPagination,
  GridToolbar,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './AcceptedRequests.css';
import theme from 'src/styling/customTheme';
import { AssignTrainerRequestBody } from './api/request.dto';
import { getAcceptedTrainings, assignTrainer } from './api';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';

import uselogic from './definitions';
import useAcceptedRequestsController from './hooks/useAcceptedRequestsController';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
import { useTranslation } from 'react-i18next';

const AcceptedTrainings: React.FC = () => {
  const {
    AcceptedRequestsDataGrid,
    availableTrainers,
    handleJoinDialogClose,
    joinDialogOpen,
    confirmDialogOpen,
    handleVerifyJoin,
  } = uselogic();
  const [pagination, setPagination] = useState<PageChangeParams>({
    pageIndex: 0,
    pageSize: 30,
  });

  const { rows } = useAcceptedRequestsController({
    pagination,
  });

  const {t}=useTranslation();
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
            {t("Accepted Requests")}
          </Typography>
          <AcceptedRequestsDataGrid data={rows} />
        </Stack>
      </Grid>
    </>
  );
};

export default AcceptedTrainings;
