import { IconButton } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { RunningTraineesData } from "./api/types";
import { createDataGrid } from "src/components/DataGridTanstack";
import { Feed } from "@mui/icons-material";
import React from "react";
import { useEffect, useState } from "react";
import { progressForm } from "src/api/progress";
import { useTranslation } from "react-i18next";

const uselogic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [trainingId, setTrainingId] = useState("");
  const [response, setReponse] = useState<Response>();

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
  const ProgressForm = t("ProgressForm");
  const columns: ColumnDef<RunningTraineesData>[] = [
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
      header: ProgressForm,
      //@ts-ignore
      cell: props => {
        const {
          row: { original },
        } = props;
        return (
          <IconButton
            sx={{ ml: 3.5 }}
            aria-label="progress form"
            //@ts-ignore
            onClick={() => handleOpenDialog(original.id)}
          >
            <Feed
              sx={{
                color: "#820000",
                borderRadius: "5px",
                className: "manage-icon",
              }}
            />
          </IconButton>
        );
      },
    },
  ];

  const CurrentTraineesDataGrid = React.useMemo(() => {
    return createDataGrid({
      name: "CurrentTraineesDataGrid",
      columns,
      shouldFlexGrowCells: true,
    });
  }, []);

  return {
    handleOpenDialog,
    handleCloseDialog,
    isOpen,
    open: !!isOpen,
    response,
    trainingId,
    CurrentTraineesDataGrid,
  };
};
export default uselogic;
