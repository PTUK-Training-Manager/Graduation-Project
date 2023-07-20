import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import { Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';
import useAddFacultyController from './hooks/useAddFacultyController';
import TextFieldWrapper from 'src/components/FormsUI/TextField';
import { useState } from 'react';
import './AddFaculty.css';
import useSnackbar from 'src/hooks/useSnackbar';
import { uploadExcelFile } from './api';

const AddFaculty: React.FC = () => {
  const { formikProps, isLoading } = useAddFacultyController();
  const { isValid } = formikProps;
  const [excelData, setExcelData] = useState(null);
  const { showSnackbar } = useSnackbar();

  const [selectedFile, setSelectedFile] = useState(null);
  //@ts-ignore
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  //@ts-ignore
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      try {
        const response = await uploadExcelFile(selectedFile).then((res) => {
          if(res.success === true){
            showSnackbar({
              severity:"success",
              message:res.message
            })
          } else if (res.success === false){
              showSnackbar({
                severity:"error",
                message:res.message
              }) 
            }
        });
        console.log(response);
      } catch (error) {
        // Handle error
        console.error(error);
      }
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
          flexDirection: 'column', // Add this line
        }}
      >
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

                <TextFieldWrapper label="Faculty Name" name="name" />

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
        <Paper
          elevation={10}
          sx={{ p: 4, minWidth: { xs: '90%', sm: '60%', md: '30%' } }}
        >
          <Stack spacing={2} gap={2} alignItems="center">
            <Typography component="h3" variant="h5">
              Add New Students
            </Typography>
            <form onSubmit={handleSubmit}>
              <input type="file" name="file" onChange={handleFileChange} />
              <button type="submit">Upload</button>
            </form>
            <div className="viewer">
              {excelData ? (
                <div className="table-responsive">Success Uploaded</div>
              ) : (
                <div>No file is uploaded yet!</div>
              )}
              {excelData &&
                showSnackbar({
                  severity: 'success',
                  message: 'Successfully added new Trainer',
                })}
            </div>
          </Stack>
        </Paper>
      </Grid>
    </>
  );
};
export default AddFaculty;
