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

  // onchange states
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [typeError, setTypeError] = useState(null);

  // submit state
  const [excelData, setExcelData] = useState(null);

  // onchange event
  const handleFile = (e: { target: { files: any[]; }; }) => {
    let fileTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          //@ts-ignore
          setExcelFile(e.target.result);
        };
      } else {
        //@ts-ignore
        setTypeError('Please select only excel file types');
        setExcelFile(null);
      }
    } else {
      console.log('Please select your file');
    }
  };

  // submit event
  const handleFileSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (excelFile !== null) {
      console.log(excelFile)
      aploadExcelFile(excelFile)
      .then(response => {
        // Handle the response from the server
        console.log(response);
        // Add any necessary logic after uploading the file
      })
      .catch(error => {
        // Handle any errors that occur during the API request
        console.error(error);
      });
  
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
        <Paper
          elevation={10}
          sx={{ p: 4, minWidth: { xs: '90%', sm: '60%', md: '30%' } }}
        >
          <Stack spacing={2} gap={2} alignItems="center">
            <Typography component="h3" variant="h5">
              Upload Excel File Sheets
            </Typography>
            <form
              className="form-group custom-form"
              onSubmit={handleFileSubmit}
            >
              <input
                type="file"
                //@ts-ignore
                onChange={handleFile}
                className="form-control"
                required
              />
              <button type="submit" className="btn btn-success btn-md">
                UPLOAD
              </button>
              {typeError && (
                <div className="alert alert-danger" role="alert">
                  {typeError}
                </div>
              )}
            </form>
            <div className="viewer">
              {excelData ? (
                <div className="table-responsive">Sucess Uploaded</div>
              ) : (
                <div>No File is uploaded yet!</div>
              )}
            </div>
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
