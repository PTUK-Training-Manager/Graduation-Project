import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./AcceptedRequests.css";
import theme from "src/styling/customTheme";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DataGridPagination from "src/components/DataGrid/DataGridPagination";
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
} from "@mui/material";
import uselogic from "./definitions";
import useAcceptedRequestsController from "./hooks/useAcceptedRequestsController";
import { useTranslation } from "react-i18next";

const AcceptedTrainings: React.FC = () => {
  const {
    AcceptedRequestsDataGrid,
    availableTrainers,
    handleJoinDialogClose,
    joinDialogOpen,
    confirmDialogOpen,
    handleVerifyJoin,
    handleVerifyCancel,
    selectedDate,
    onSetDate,
    handleJoin,
  } = uselogic();
  const { rows, totalRows, isFetching, onGetDataGrid } = useAcceptedRequestsController();

  //@ts-ignore
  const { t } = useTranslation();
  const trainerColumns = [
    { field: "id", headerName: "Trainer Id", width: 400, flex: 0.3 },
    { field: "name", headerName: "Trianer Name", width: 400, flex: 0.3 },
    { field: "field", headerName: "field", width: 400, flex: 0.3 },
    {
      field: "joinTrainer",
      headerName: "Join Trainer ",
      flex: 0.3,
      width: 400,
      headerClassName: "ctrainees",
      filterable: false,
      sortable: false,
      // @ts-ignore
      renderCell: (params: any) => (
        <IconButton aria-label="edit field" onClick={() => handleJoin(params.id)}>
          <CheckBoxIcon sx={{ color: "blue", backgroundColor: "white" }} className="edit-icon" />
        </IconButton>
      ),
    },
  ];
  const trainerrows = availableTrainers.map(row => ({
    id: row.id,
    name: row.name,
    field: row.Field.field,
    status: row.status,
    companyId: row.companyId,
    userId: row.userId,
  }));
  return (
    <>
      <Dialog open={joinDialogOpen} onClose={handleJoinDialogClose}>
        <DialogContent>
          <Stack gap={1} style={{ height: 400, width: "100%" }}>
            <Typography component="h1" variant="h5" fontWeight={500}>
              Trainers
            </Typography>
            <DataGrid
              sx={{
                width: "500px", // set the width to 800px
              }}
              columns={trainerColumns}
              rows={trainerrows}
              getRowId={row => row["id"]}
              initialState={{
                pagination: { paginationModel: { pageSize: 30 } },
              }}
              pageSizeOptions={[5, 10, 20, 30]}
              slots={{
                toolbar: GridToolbar,
                pagination: DataGridPagination,
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleJoinDialogClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDialogOpen} onClose={handleVerifyCancel} maxWidth="xs" fullWidth>
        <DialogTitle>Verify Joining</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ width: "250px" }}>
            <Typography>Choose starting date for trainee if you want!</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Date for start Training"
                  value={selectedDate}
                  onChange={newValue => onSetDate(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <Typography sx={{ fontWeight: "600" }}>
              Are you sure you want to join this trainer to this training?
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleVerifyCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleVerifyJoin} color="error" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Grid
        container
        sx={{
          p: 3,
          justifyContent: "center",
          alignItems: "center",
          height: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
        }}
      >
        <Stack
          gap={1.5}
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <Typography component="h1" variant="h5" fontWeight={500}>
            {t("Accepted Requests")}
          </Typography>
          <AcceptedRequestsDataGrid
            data={rows}
            totalRows={totalRows}
            isFetching={isFetching}
            onFetch={onGetDataGrid}
          />
        </Stack>
      </Grid>
    </>
  );
};

export default AcceptedTrainings;
