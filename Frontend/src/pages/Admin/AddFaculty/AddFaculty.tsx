import * as React from 'react';

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

const AddFaculty: React.FC = () => {
  const { formikProps, isLoading } = useAddFacultyController();
  const { isValid } = formikProps;
  const [selectedFile, setSelectedFile] = useState(null);

  //@ts-ignore
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch('/admin/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the server
          console.log(data);
        })
        .catch((error) => {
          // Handle any errors that occur during the request
          console.error(error);
        });
    }
  };

  
  return (
    <>
      <Grid
        container
        sx={{
          py: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
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
            <form>
              <Stack gap={2} alignItems="center">
                <Typography component="h1" variant="h5">
                  Add New Faculty
                </Typography>

                <div>
                  <input type="file" onChange={handleFileChange} />
                  <button onClick={handleUpload}>Upload</button>
                </div>

               
              </Stack>
            </form>
        </Paper>
      </Grid>
    </>
  );
};
export default AddFaculty;
