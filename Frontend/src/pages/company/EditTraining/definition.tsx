import { IconButton } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { createDataGrid } from "src/components/DataGridTanstack";
import { useEffect, useState } from "react";
import { progressForm } from "src/api/progress";
import { RunningTraineesData } from "./api/types";
import ClearIcon from "@mui/icons-material/Clear";
import { useTranslation } from "react-i18next";
import useSnackbar from "src/hooks/useSnackbar";
import { TrainersData } from "../Trainers/api/types";
import { assignTrainer, getTrainers } from "../AcceptedRequests/api/index";
import { HandleTrainingRequestBody } from "../TrainingRequest/types";
import { handleTrainingRequest } from "../TrainingRequest/api/index";
import { useQueryClient } from "@tanstack/react-query";
import { AssignTrainerRequestBody } from "../AcceptedRequests/api/types";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import React from "react";

const uselogic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [trainingId, setTrainingId] = useState("");
  const { showSnackbar } = useSnackbar();
  const [cancelId, setCanceledId] = useState<string>("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [trainingID, setTrainingID] = useState<string>("");
  const [trainerID, setTrainerID] = useState<string>("");
  const [joinDialogOpen, setJoinDialogOpen] = useState<boolean>(false);
  const [availableTrainers, setAvailableTrainers] = useState<TrainersData[]>([]);
  const onSetJoinDialogOpen = (confirm: boolean) => setJoinDialogOpen(confirm);

  const [confirmEditOpen, setConfirmEditOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const handleverifyClick = () => {
    setConfirmEditOpen(true);
  };
  const handleCancel = () => {
    const body: HandleTrainingRequestBody = {
      trainingId: cancelId,
      status: "canceled",
    };
    handleTrainingRequest(body)
      .then(result => {
        if (result.success === true) {
          setConfirmDialogOpen(false);
          showSnackbar({ severity: "success", message: result.message });
          //@ts-ignore
          queryClient.invalidateQueries("EditTrainings");
          setCanceledId("");
        } else if (result.success === false) {
          showSnackbar({ severity: "warning", message: result.message });
          setCanceledId("");
          setConfirmDialogOpen(false);
        }
      })
      .catch(error => console.log(error));
  };

  const handleJoinClick = (id: string) => {
    setTrainingID(id);
    setJoinDialogOpen(true);
    handleJoinDialogOpen();
  };
  const handleJoinDialogClose = () => {
    setJoinDialogOpen(false);
  };
  const handleDeleteCancel = () => {
    setConfirmDialogOpen(false);
  };
  const handleJoinDialogOpen = async () => {
    try {
      const result = await getTrainers();
      setAvailableTrainers(result.items);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancelClick = (id: string) => {
    setCanceledId(id);
    setConfirmDialogOpen(true);
  };
  const handleJoin = (trainerId: string) => {
    setTrainerID(trainerId);
    handleverifyClick();
  };
  const handleVerifyCancel = () => {
    setConfirmEditOpen(false);
    setJoinDialogOpen(false);
  };
  useEffect(() => {
    progressForm({ trainingId: trainingId }).then(res => {
      //@ts-ignore
      setReponse(res.data);
    });
  }, [trainingId]);

  const handleOpenDialog = (id: string) => {
    setTrainingId(id);
    console.log(trainingId);
    console.log(isOpen);
    setIsOpen(prev => !prev);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setTrainingId("");
  };
  //@ts-ignore
  const { t } = useTranslation();
  const StudentNumber = t("Student Number");
  const StudentName = t("Student Name");
  const EditTrainer = t("EditTrainer");
  const TrainerName = t("Trainer Name");
  const CompanyBranch = t("Company Branch");
  const CancelTraining = t("CancelTraining");

  const columns: ColumnDef<RunningTraineesData, any>[] = [
    {
      accessorKey: "studentId",
      header: StudentNumber,
    },
    {
      accessorKey: "Student.name",
      header: StudentName,
      filterFn: "arrIncludesSome",
    },
    {
      accessorKey: "CompanyBranch.location",
      header: CompanyBranch,
      filterFn: "arrIncludesSome",
    },
    {
      accessorKey: "Trainer.name",
      header: TrainerName,
      filterFn: "arrIncludesSome",
    },
    {
      header: EditTrainer,
      //@ts-ignore
      cell: props => {
        const {
          row: { original },
        } = props;
        return (
          <IconButton
            aria-label="edit field"
            size="small"
            onClick={() => handleJoinClick(original.id)}
          >
            <ManageAccountsIcon sx={{ color: "#820000", ml: "1.5rem" }} className="edit-icon" />
          </IconButton>
        );
      },
    },
    {
      header: CancelTraining,
      //@ts-ignore
      cell: props => {
        const {
          row: { original },
        } = props;
        return (
          <IconButton
            sx={{ ml: 3.7 }}
            color="error"
            aria-label="cancel training"
            onClick={() => handleCancelClick(original.id)}
          >
            <ClearIcon />
          </IconButton>
        );
      },
    },
  ];
  const handleVerifyJoin = () => {
    const body: AssignTrainerRequestBody = {
      trainingId: trainingID,
      trainerId: trainerID,
    };
    assignTrainer(body)
      .then(result => {
        if (result.success === true) {
          const trainerName = result.data.name;
          console.log(trainerName);
          showSnackbar({ severity: "success", message: result.message });
          //@ts-ignore
          queryClient.invalidateQueries("EditTrainings");
          handleVerifyCancel();
        } else if (result.success === false) {
          console.log("error");
        }
      })
      .catch(error => console.log(error));
  };
  const CurrentTraineesDataGrid = React.useMemo(() => {
    return createDataGrid({
      name: "CurrentTraineesDataGrid",
      columns,
      shouldFlexGrowCells: true,
    });
  }, []);

  return {
    onSetJoinDialogOpen,
    trainingID,
    CurrentTraineesDataGrid,
    handleCancel,
    handleCancelClick,
    handleCloseDialog,
    handleDeleteCancel,
    handleJoin,
    handleJoinClick,
    handleJoinDialogClose,
    handleJoinDialogOpen,
    handleOpenDialog,
    handleTrainingRequest,
    handleVerifyCancel,
    handleverifyClick,
    joinDialogOpen,
    availableTrainers,
    confirmDialogOpen,
    confirmEditOpen,
    handleVerifyJoin,
  };
};
export default uselogic;
