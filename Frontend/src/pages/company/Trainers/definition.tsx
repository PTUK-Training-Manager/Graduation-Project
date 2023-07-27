import { IconButton } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { createDataGrid } from "src/components/DataGridTanstack";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { TrainersData } from "./api/types";
import { deleteTrianer, updateFieldForTrianer } from "./api";
import useSnackbar from "src/hooks/useSnackbar";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

const uselogic = () => {
  const [deleteId, setDeleteId] = useState<string>("");
  const [updatedTrainerID, setUpdatedTrainerID] = useState<string>("");
  const [newFieldId, setNewFieldId] = useState<string>("");
  const [updateFieldForTrainerDialogOpen, setUpdateFieldForTrainerDialogOpen] = useState(false);
  const [deleteTrainerDialogOpen, setDeleteTrainerDialogOpen] = useState<boolean>(false);
  const { showSnackbar } = useSnackbar();

  const onSetNewFieldId = (id: string) => setNewFieldId(id);

  const queryClient = useQueryClient();

  const handleDeleteTrainer = () => {
    deleteTrianer({ id: deleteId }).then((res: { success: boolean; message: any }) => {
      if (res.success === true) {
        setDeleteTrainerDialogOpen(false);
        showSnackbar({ severity: "success", message: res.message });
        //@ts-ignore
        queryClient.invalidateQueries("trainers");
        setDeleteId("");
      } else if (res.success === false) {
        showSnackbar({ severity: "warning", message: res.message });
        setDeleteId("");
        setDeleteTrainerDialogOpen(false);
      }
    });
  };
  const [trainerName, setTrainerName] = useState("");
  const handleClickDeleteTrainerButton = (Trainerid: string, trainerName: string) => {
    setTrainerName(trainerName);
    setDeleteId(Trainerid);
    setDeleteTrainerDialogOpen(true);
  };

  const handleCancelDeleteTrainer = () => {
    setDeleteTrainerDialogOpen(false);
  };

  const handleUpdateFieldDialogOpen = (id: string) => {
    setUpdatedTrainerID(id);
    setUpdateFieldForTrainerDialogOpen(true);
  };

  const handleUpdateFieldDialogClose = () => {
    setUpdateFieldForTrainerDialogOpen(false);
  };

  const handleSaveUpdatedValueField = () => {
    updateFieldForTrianer({ id: updatedTrainerID, fieldId: newFieldId }).then(res => {
      console.log(updatedTrainerID);
      console.log(newFieldId);
      if (res.success === true) {
        setUpdateFieldForTrainerDialogOpen(false);
        showSnackbar({ severity: "success", message: res.message });
        //@ts-ignore
        queryClient.invalidateQueries("trainers");
        setUpdatedTrainerID("");
      } else if (res.success === false) {
        showSnackbar({ severity: "warning", message: res.message });
        setUpdatedTrainerID("");
        setUpdateFieldForTrainerDialogOpen(false);
      }
    });
    console.log(`New value: ${newFieldId}`);
    console.log(`Training ID : ${updatedTrainerID}`);
    handleUpdateFieldDialogClose();
  };
  const columns: ColumnDef<TrainersData, any>[] = [
    {
      accessorKey: "id",
      header: "Trainer Id",
    },
    {
      accessorKey: "name",
      header: "Trainer Name",
      filterFn: "arrIncludesSome",
    },
    {
      accessorKey: "Field.field",
      header: "Field",
      filterFn: "arrIncludesSome",
    },

    {
      header: "Edit Field ",
      //@ts-ignore
      cell: props => {
        const {
          row: { original },
        } = props;
        return (
          <IconButton
            onClick={() => handleUpdateFieldDialogOpen(original.id)}
            aria-label="edit field"
          >
            <EditIcon sx={{ color: "#820000" }} className="edit-icon" />
          </IconButton>
        );
      },
    },
    {
      header: "Delete Trainer",
      //@ts-ignore
      cell: props => {
        const {
          row: { original },
        } = props;
        const name = original.name;
        return (
          <IconButton
            sx={{ ml: 3.5 }}
            color="error"
            aria-label="delete trianer"
            onClick={() => handleClickDeleteTrainerButton(original.id, name)}
          >
            <ClearIcon className="clear" />
          </IconButton>
        );
      },
    },
  ];
  const TrainerDataGrid = React.useMemo(() => {
    return createDataGrid({
      name: "TrainerDataGrid",
      columns,
      shouldFlexGrowCells: true,
    });
  }, []);

  return {
    TrainerDataGrid,
    deleteTrainerDialogOpen,
    handleCancelDeleteTrainer,
    handleDeleteTrainer,
    trainerName,
    updateFieldForTrainerDialogOpen,
    handleUpdateFieldDialogClose,
    handleSaveUpdatedValueField,
    onSetNewFieldId,
  };
};
export default uselogic;
