import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import LoadingButton from "@mui/lab/LoadingButton";
import { Form, FormikProvider } from "formik";
import RemoveIcon from "@mui/icons-material/Remove";
import TextFieldWrapper from "src/components/FormsUI/TextField";
import Stack from "@mui/material/Stack";
import theme from "src/styling/customTheme";
import { Autocomplete, Button, FormControl, TextField } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import useAllTrainersController from "./hooks/useAllTrainersController";
import { useTranslation } from "react-i18next";
import uselogic from "./definition";
import DeleteTrainerDialog from "./components/deleteTrainerDialog";
import EditTrainerDialog from "./components/editFieldDialog";

const Trainers: React.FC = () => {
  const { rows, totalRows, isFetching, onGetDataGrid, fieldOptions, formikProps, isLoading } =
    useAllTrainersController();

  const [openAddTrainerForm, setOpenAddTrainerForm] = useState(false);

  const {
    TrainerDataGrid,
    deleteTrainerDialogOpen,
    handleCancelDeleteTrainer,
    handleDeleteTrainer,
    trainerName,
    handleSaveUpdatedValueField,
    handleUpdateFieldDialogClose,
    onSetNewFieldId,
    updateFieldForTrainerDialogOpen,
  } = uselogic();

  const { isValid } = formikProps;
  //@ts-ignore
  const { t } = useTranslation();
  const handleChange = () => {
    setOpenAddTrainerForm(prev => !prev);
  };
  return (
    <>
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
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography component="h1" variant="h5" fontWeight={500}>
              {t("Trainers")}
            </Typography>
            <Button
              variant="contained"
              sx={{ width: "auto" }}
              color={openAddTrainerForm ? "error" : "success"}
              onClick={handleChange}
              startIcon={openAddTrainerForm ? <RemoveIcon /> : <PersonAddIcon />}
            >
              {openAddTrainerForm ? "Close" : "Add Trainer"}
            </Button>
          </Stack>

          <Grid
            container
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack
              gap={0.5}
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <Collapse in={openAddTrainerForm}>
                <Paper
                  elevation={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 3.5,
                    minWidth: { xs: "90%", sm: "60%", md: "30%" },
                  }}
                >
                  <FormikProvider value={formikProps}>
                    <Form>
                      <Stack gap={1} spacing={1} alignItems="center">
                        <Typography component="h1" variant="h5">
                          {t("Add Trainer")}
                        </Typography>
                        <Grid
                          sx={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          container
                          spacing={2}
                        >
                          <Grid item xs={12} sm={6} md={2.4}>
                            <TextFieldWrapper label="Trainer Id" name="id" />
                          </Grid>
                          <Grid item xs={12} sm={6} md={2.4}>
                            <TextFieldWrapper label="Trainer Name" name="name" />
                          </Grid>
                          <Grid item xs={12} sm={6} md={2.4}>
                            <TextFieldWrapper label="E-mail" name="email" />
                          </Grid>

                          <Grid item xs={12} sm={6} md={2.4}>
                            <TextFieldWrapper label="Phone Number" name="phoneNumber" />
                          </Grid>
                          <Grid item xs={12} sm={6} md={2.4}>
                            <FormControl fullWidth>
                              <Autocomplete
                                id="field"
                                //@ts-ignore
                                options={fieldOptions}
                                //@ts-ignore
                                getOptionLabel={option => option.Field.field}
                                onChange={(event, newValue) => {
                                  formikProps.setFieldValue("fieldId", newValue?.fieldId || "");
                                }}
                                renderInput={params => (
                                  <TextField
                                    {...params}
                                    name="fieldId"
                                    label="Field"
                                    variant="outlined"
                                  />
                                )}
                              />
                            </FormControl>
                          </Grid>
                        </Grid>

                        <LoadingButton
                          type="submit"
                          // fullWidth
                          variant="contained"
                          disabled={!isValid}
                          loading={isLoading}
                        >
                          {t("GenerateAccount")}
                        </LoadingButton>
                      </Stack>
                    </Form>
                  </FormikProvider>
                </Paper>
              </Collapse>
            </Stack>
          </Grid>

          <TrainerDataGrid
            data={rows}
            totalRows={totalRows}
            isFetching={isFetching}
            onFetch={onGetDataGrid}
          />
        </Stack>
      </Grid>
      <DeleteTrainerDialog
        deleteTrainerDialogOpen={deleteTrainerDialogOpen}
        handleCancelDeleteTrainer={handleCancelDeleteTrainer}
        handleDeleteTrainer={handleDeleteTrainer}
        trainerName={trainerName}
      />
      <EditTrainerDialog
        updateFieldForTrainerDialogOpen={updateFieldForTrainerDialogOpen}
        handleSaveUpdatedValueField={handleSaveUpdatedValueField}
        handleUpdateFieldDialogClose={handleUpdateFieldDialogClose}
        onSetNewFieldId={onSetNewFieldId}
        fieldOptions={fieldOptions}
        formikProps={formikProps}
      />
    </>
  );
};
export default Trainers;
