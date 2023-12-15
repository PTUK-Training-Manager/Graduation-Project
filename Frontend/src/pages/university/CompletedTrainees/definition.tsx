import { IconButton, Tooltip } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { createDataGrid } from "src/components/DataGridTanstack";
import { useState } from "react";
import PrintIcon from "@mui/icons-material/Print";
import { CompletedTraineesData } from "./api/types";
import { useTranslation } from "react-i18next";
import React from "react";

const uselogic = () => {
  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [studentId, setStudentId] = useState<string>("");
  const [index, setIndex] = useState<number>(-1);
  const handleOpenDialog = (index: number, id: string) => {
    setIsOpen(prev => !prev);
    setIndex(index);
    setStudentId(id);
  };
  //@ts-ignore
  const { t } = useTranslation();
  const StudentNumber = t("Student Number");
  const StudentName = t("Student Name");
  const columns: ColumnDef<CompletedTraineesData>[] = [
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
      header: "Evaluation Report",
      //@ts-ignore
      cell: props => {
        const {
          row: { original },
        } = props;
        const count = parseInt(original.count);
        const index = parseInt(original.count) - 1;
        const studentId = original.studentId;
        const printIcons = [];

        for (let i = 0; i < count; i++) {
          if (count == 1)
            printIcons.push(
              <Tooltip title={"Evaluation 1"}>
                <IconButton
                  sx={{ ml: 5 }}
                  aria-label={"form 1"}
                  size="small"
                  onClick={() => handleOpenDialog(index, studentId)}
                >
                  <PrintIcon sx={{ color: "#820000" }} color="info" className="print-icon" />
                </IconButton>
              </Tooltip>
            );
          else
            printIcons.push(
              <Tooltip key={i} title={`Evaluation ${i + 1}`}>
                <IconButton
                  sx={{ ml: 2 }}
                  aria-label={`form ${i + 1}`}
                  size="small"
                  onClick={() => handleOpenDialog(i, studentId)}
                >
                  <PrintIcon sx={{ color: "#820000" }} className="print-icon" />
                </IconButton>
              </Tooltip>
            );
        }

        return <>{printIcons}</>;
      },
    },
  ];

  const CompletedTraineesDataGrid = React.useMemo(() => {
    return createDataGrid({
      name: "CompletedTraineesDataGrid",
      columns,
      shouldFlexGrowCells: true,
    });
  }, []);

  return {
    isOpen,
    index,
    handleCloseDialog,
    CompletedTraineesDataGrid,
    studentId,
  };
};
export default uselogic;
