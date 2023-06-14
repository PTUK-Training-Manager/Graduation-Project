import React, { useRef, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import RemoveIcon from '@mui/icons-material/Remove';
import './Trainers.css';
import { Autocomplete, Collapse, FormControl, Paper } from '@mui/material';
import { Form, FormikProvider } from 'formik';
import EditTrainerDialog from './components/editFieldDialog';
import DeleteTrainerDialog from './components/deleteTrainerDialog';
import theme from 'src/styling/customTheme';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import useAllTrainersFormController from './hooks/useAllTrainersController';
import TextFieldWrapper from 'src/components/FormsUI/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import DataGridPagination from 'src/components/DataGrid/DataGridPagination';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
import uselogic from './definition';

const Trainers: React.FC = () => {
  const [openAddTrainerForm, setOpenAddTrainerForm] = useState(false);
  const [pagination, setPagination] = useState<PageChangeParams>({
    pageIndex: 0,
    pageSize: 30,
  });

  const { rows } = useAllTrainersFormController({
    pagination,
  });
  const {
    TrainerDataGrid,
  } = uselogic();
const [fieldOptions,setFieldOptions] = useState(null);
  // const {
  //   formikProps,
  //   isLoading,
  //   columns,
  //   rows,
  //   fieldOptions,
  //   deleteTrainerDialogOpen,
  //   handleCancelDeleteTrainer,
  //   handleDeleteTrainer,
  //   onSetNewFieldId,
  //   handleSaveUpdatedValueField,
  //   updateFieldForTrainerDialogOpen,
  //   handleUpdateFieldDialogClose,
  //   deleteTrainerName,
  // } = useAllTrainersFormController();

  // const { isValid } = formikProps;

  const handleChange = () => {
    setOpenAddTrainerForm((prev) => !prev);
  };

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
          <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
            <Typography component="h1" variant="h5" fontWeight={500}>
              Trainers
            </Typography>

            <Button
              variant="contained"
              sx={{ width: 'auto' }}
              color={openAddTrainerForm ? 'error' : 'success'}
              onClick={handleChange}
              startIcon={
                openAddTrainerForm ? <RemoveIcon /> : <PersonAddIcon />
              }
            >
              {openAddTrainerForm ? 'Close' : 'Add Trainer'}
            </Button>
          </Stack>
          <Grid
            container
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Stack
              gap={0.5}
              sx={{
                width: '100%',
                height: '100%',
              }}
            >
              <Collapse in={openAddTrainerForm}>
                <Paper
                  elevation={3}
                  sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 3.5,
                    minWidth: { xs: '90%', sm: '60%', md: '30%' },
                  }}
                >
                  {/* <FormikProvider value={formikProps}> */}
                    <form>
                      <Stack spacing={1} gap={1} alignItems="center">
                        <Typography component="h1" variant="h5">
                          Add Trainer
                        </Typography>
                        {/* <Stack gap={5} direction="row"> */}
                        <Grid
                          sx={{ justifyContent: 'center' }}
                          container
                          spacing={2}
                        >
                          <Grid item xs={12} sm={6} md={2}>
                            <TextFieldWrapper
                              label="Trainer Id"
                              name="id"
                              autoFocus
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={2}>
                            <TextFieldWrapper
                              label="Trainer Name"
                              name="name"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={2}>
                            <TextFieldWrapper
                              label="E-mail"
                              type="email"
                              name="email"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={2}>
                            <TextFieldWrapper
                              label="Phone Number"
                              name="phoneNumber"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={2}>
                            <FormControl fullWidth>
                              <Autocomplete
                                id="field"
                                //@ts-ignore
                                options={fieldOptions}
                                //@ts-ignore
                                getOptionLabel={(option) => option.Field.field}
                                // onChange={(event, newValue) => {
                                //   formikProps.setFieldValue(
                                //     'fieldId',
                                //     newValue?.fieldId
                                //   );
                                // }}
                                // renderInput={(params) => (
                                //   <TextField
                                //     {...params}
                                //     label="Field"
                                //     variant="outlined"
                                //   />
                                // )}
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                        {/* </Stack> */}
                        <LoadingButton
                          type="submit"
                          variant="contained"
disabled
                        >
                          Generate Account
                        </LoadingButton>
                      </Stack>
                    </form>
                  {/* </FormikProvider> */}
                </Paper>
              </Collapse>
            </Stack>
          </Grid>

          <TrainerDataGrid data={rows} />

        </Stack>
      </Grid>
     
    </>
  );
};

export default Trainers;
