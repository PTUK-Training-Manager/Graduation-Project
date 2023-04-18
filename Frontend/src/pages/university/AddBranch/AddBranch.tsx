import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { getContentPaddingLeft } from 'src/constants';
import useAccountContext from 'src/hooks/useAccountContext';
import { LoadingButton } from '@mui/lab';
import { Button, MenuItem, Stack, TextField } from '@mui/material';
import { Form, FormikProvider } from 'formik';
import TextFieldWrapper from 'src/components/FormsUI/TextField';
import useAddBranchController from './hooks/useAddBranchController';

const AddBranch: React.FC = () => {
  const { formikProps, isLoading } = useAddBranchController();
  
  
  return (
    <>
      <Grid
        container
        sx={{
          pt: 15,
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
            p: 3.5,
            minWidth: { xs: '90%', sm: '60%', md: '30%' },
          }}
        >
          <FormikProvider value={formikProps}>
            <Form>
              <Stack gap={2} alignItems="center">
                <Typography component="h1" variant="h5">
                  Add Branch
                </Typography>
          
               
                <TextFieldWrapper label="Company Name" name="companyId" />
                <TextFieldWrapper label="Location" name="location" />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  // disabled={!isValid}
                  // loading={isLoading}
                >
                  Generate Account
                </Button>
              </Stack>
            </Form>
          </FormikProvider>
        </Paper>
      </Grid>
    </>
  );
};
export default AddBranch;
