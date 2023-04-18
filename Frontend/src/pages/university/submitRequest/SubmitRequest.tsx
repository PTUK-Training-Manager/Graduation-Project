import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { getContentPaddingLeft } from 'src/constants';
import useAccountContext from 'src/hooks/useAccountContext';
import { Stack } from '@mui/material';
import { FormikProvider } from 'formik';
import { Form } from 'react-router-dom';
import useSubmitRequestController from './hooks/useSubmitRequestController';
import { LoadingButton } from '@mui/lab';
import TextFieldWrapper from 'src/components/FormsUI/TextField';

const SubmitRequest: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = React.useState('');
  const { isSidebarOpen } = useAccountContext();
  const { formikProps, isLoading } = useSubmitRequestController();
  const { isValid } = formikProps;
 
  return (
    <>
    <Grid
      container
      sx={{
        transition: ".25s",
        pt: 2,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center"
    }}
    >
      <Paper elevation={10}
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        p: 4,
                        minWidth: {xs: "90%", sm: "60%", md: "30%"}
                    }}>
                       <FormikProvider value={formikProps}>
            <form>
              <Stack gap={2} alignItems="center">
                <Typography component="h1" variant="h5">
                  Submit Request
                </Typography>
        
                <TextFieldWrapper label="Student Number" name="studentId" autoFocus />

              <TextField
               fullWidth
                label="Type"
                name="type"
                select
              >
                <MenuItem value="first">First</MenuItem>
                <MenuItem value="second">Second</MenuItem>
                <MenuItem value="compined">Compined</MenuItem>
              </TextField>
              <TextField
              fullWidth
                label="Semester"
                name="semester"
                select
              >
                <MenuItem value="semester-1">Semester One</MenuItem>
                <MenuItem value="semester-2">Semester Two</MenuItem>
                <MenuItem value="summer">Summer Semester</MenuItem>
              </TextField>

              <TextField
               fullWidth
                label="Company Name"
                select
                name="id"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)} // Update state when company name is selected
              >
                <MenuItem value="F">Foothill</MenuItem>
                <MenuItem value="E">Exalt</MenuItem>
                <MenuItem value="A">ASAL</MenuItem>
              </TextField>
              {selectedCompany && ( // Conditionally render branch dropdown if a company is selected
                <TextField
                fullWidth
                  label="Branch"
                  select
                  name="companyBranchId"
                >
                  <MenuItem value="F">Nablus</MenuItem>
                  <MenuItem value="E">Ramallah</MenuItem>
                  <MenuItem value="A">Jenin</MenuItem>
                </TextField>
              )}
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  // disabled={!isValid}
                  // loading={isLoading}
                >
                 Submit
                </Button>
              </Stack>
            </form>
          </FormikProvider>
        </Paper>
      </Grid>
    </>
  );
};
export default SubmitRequest;
