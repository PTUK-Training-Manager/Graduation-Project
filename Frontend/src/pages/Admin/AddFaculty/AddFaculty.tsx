import * as React from 'react';
import * as XLSX from 'xlsx';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DropzoneRef } from 'react-dropzone';
import { Stack } from '@mui/material';
import { Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';
import useAddFacultyController from './hooks/useAddFacultyController';
import TextFieldWrapper from 'src/components/FormsUI/TextField';
import { useState } from 'react';
import axiosInstance from 'src/api';
import { Button } from '@mui/material';
import { aploadExcelFile } from './api';

const AddFaculty: React.FC = () => {
  const { formikProps, isLoading } = useAddFacultyController();
  const { isValid } = formikProps;
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const handleChangeFile = (e: { target: { files: React.SetStateAction<File | null>[]; }; }) => {
    setExcelFile(e.target.files[0]);
  }
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(excelFile);
    if(excelFile !== null) {
      const body = {
        file: excelFile,
      };
      //@ts-ignore
      const response = await aploadExcelFile(body).then((res)=> {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
    }
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        gap={2}
        sx={{
          py: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
      <Paper elevation={10} sx={{ p: 4, minWidth: { xs: '90%', sm: '60%', md: '30%' } }}>
        <Stack spacing={2} gap={2} alignItems="center">
          <Typography component="h3" variant="h5">
            Upload Excel File Sheets 
          </Typography>
          <form className="form-group custom-form" onSubmit={handleSubmit}>
           
        <input type="file" className="form-control" required onChange={handleChangeFile}/>
        <button type="submit" className="btn btn-success btn-md">UPLOAD</button>
        </form>

        </Stack>
      </Paper>
        <Paper
          elevation={10}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            p: 4,
            minWidth: { xs: '90%', sm: '60%', md: '30%' },
          }}
        >
          <FormikProvider value={formikProps}>
            <Form>
              <Stack gap={2} alignItems="center">
                <Typography component="h1" variant="h5">
                  Add New Faculty
                </Typography>

                <TextFieldWrapper label="Faculty Name" name="name" autoFocus />

                <TextFieldWrapper label="Faculty Email" name="email" />
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={!isValid}
                  loading={isLoading}
                >
                  Add
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>
        </Paper>
      </Grid>
    </>
  );
};
export default AddFaculty;
