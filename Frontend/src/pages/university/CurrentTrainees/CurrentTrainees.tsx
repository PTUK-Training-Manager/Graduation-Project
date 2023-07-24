import React, { FC } from "react";
import Stack from "@mui/material/Stack";
import "./CurrentTrainees.css";
import uselogic from "./definition";
import { Grid, Typography } from "@mui/material";
import ProgressFormDialog from "./components/ProgressFormDialog";
import { useTranslation } from "react-i18next";
import { gridOffset } from "./constants";
import useCurrentTrainees from "./hooks/useCurrentTraineesController";

const CurrentTrainees: FC = () => {
  const { rows, totalRows, isFetching, onGetDataGrid } = useCurrentTrainees();
  const { CurrentTraineesDataGrid, isOpen, response, trainingId, handleCloseDialog } = uselogic();

  //@ts-ignore
  const { t } = useTranslation();
  return (
    <>
      <Grid container gap={1} sx={{ p: 3, height: `calc(100vh - ${gridOffset}px)` }}>
        <Stack
          gap={1.5}
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <Typography component="h1" variant="h5" fontWeight={500}>
            {t("Current Trainees")}
          </Typography>
          <CurrentTraineesDataGrid
            data={rows}
            totalRows={totalRows}
            isFetching={isFetching}
            onFetch={onGetDataGrid}
          />
        </Stack>
      </Grid>
      <ProgressFormDialog
        isOpen={isOpen}
        handleCloseDialog={handleCloseDialog}
        //@ts-ignore
        response={response}
        //@ts-ignore
        data={rows}
        trainingId={trainingId}
      />
    </>
  );
};

export default CurrentTrainees;
