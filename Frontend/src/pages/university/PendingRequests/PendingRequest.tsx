import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import './PendingRequests.css';
import theme from 'src/styling/customTheme';

import uselogic from './definition';
import usePendingRequestsController from './hooks/usePendingRequestsController';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
import { useTranslation } from 'react-i18next';

const PendingRequest: React.FC = () => {
  const [pagination, setPagination] = useState<PageChangeParams>({
    pageIndex: 0,
    pageSize: 30,
  });

  const { rows } = usePendingRequestsController({
    pagination,
  });
  const {
    PendingRequestsDataGrid,
    confirmDialogOpen,
    handleDeleteCancel,
    handleDeleteClick,
    handleDeleteRequest,
  } = uselogic();
  const {t}=useTranslation();
  return (
    <>
      <Dialog
        open={confirmDialogOpen}
        onClose={handleDeleteCancel}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>{t("DeleteRequest")}</DialogTitle>
        <DialogContent>
{t("          Are you sure you want to delete this request?")}   
     </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            {t("Cancel")}
          </Button>
          <Button
            onClick={handleDeleteRequest}
            color="error"
            variant="contained"
          >
            {t("Delete")}
          </Button>
        </DialogActions>
      </Dialog>

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
            {t("PendingRequests")}
          </Typography>
          <PendingRequestsDataGrid data={rows} />

        </Stack>
      </Grid>
    </>
  );
};

export default PendingRequest;
