import { ColumnDef } from "@tanstack/react-table";
import { createDataGrid } from "src/components/DataGridTanstack";
import { PendingRequestsData } from "./api/types";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import useSnackbar from "src/hooks/useSnackbar";
import { useState } from "react";
import { deleteRquest } from "./api";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import React from "react";

const uselogic = () => {
  const [deleteId, setDeleteId] = useState<string>("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const handleDeleteRequest = () => {
    deleteRquest(deleteId)
      .then(result => {
        if (result.success === true) {
          setConfirmDialogOpen(false);

          showSnackbar({ severity: "success", message: result.message });
          // Refetch data for 'PendingRequests' query after successful deletion
          //@ts-ignore
          queryClient.invalidateQueries("PendingRequests");

          setDeleteId("");
        } else if (result.success === false) {
          showSnackbar({ severity: "warning", message: result.message });
          setDeleteId("");
          setConfirmDialogOpen(false);
        }
      })
      .catch(error => console.log(error));
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setConfirmDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setConfirmDialogOpen(false);
  };
  //@ts-ignore
  const { t } = useTranslation();
  const StudentNumber = t("Student Number");
  const StudentName = t("Student Name");
  const CompanyName = t("Company Name");
  const CompanyBranch = t("Company Branch");
  const DeleteRequest = t("DeleteRequest");
  const columns: ColumnDef<PendingRequestsData, any>[] = [
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
      accessorKey: "CompanyBranch.Company.name",
      header: CompanyName,
      filterFn: "arrIncludesSome",
    },
    {
      accessorKey: "CompanyBranch.location",
      header: CompanyBranch,
      filterFn: "arrIncludesSome",
    },
    {
      header: DeleteRequest,
      //@ts-ignore
      cell: props => {
        const {
          row: { original },
        } = props;
        return (
          <IconButton
            sx={{ ml: 3.5 }}
            color="error"
            aria-label="delete request"
            onClick={() => handleDeleteClick(original.id)}
          >
            <ClearIcon />
          </IconButton>
        );
      },
    },
  ];
  const PendingRequestsDataGrid = React.useMemo(() => {
    return createDataGrid({
      name: "PendingRequestssDataGrid",
      columns,
      shouldFlexGrowCells: true,
    });
  }, []);

  return {
    handleDeleteCancel,
    handleDeleteClick,
    handleDeleteRequest,
    PendingRequestsDataGrid,
    confirmDialogOpen,
  };
};
export default uselogic;
