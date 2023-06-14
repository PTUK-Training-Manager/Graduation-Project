import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { getCompany } from 'src/api/getCompany';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { getBranch } from 'src/api/getBranch';
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  Select,
  Stack,
} from '@mui/material';
import { Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';
import TextFieldWrapper from 'src/components/FormsUI/TextField';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useForgetController from './hooks/useForgetController';
import { getForgetPage } from './api';
interface CompanyOption {
  id: string;
  name: string;
}

interface BranchOption {
  id: string;
  location: string;
}

const ForgetPassword: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = React.useState('');
  const { formikProps, isLoading } = useForgetController();
  const { isValid } = formikProps;
  const navigate = useNavigate();
  const [response,setResponse]= useState(null);

  

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
          <FormikProvider value={formikProps}>
            <Form>
              <Stack gap={2} alignItems="center">
                <Typography component="h1" variant="h5">
                  Set New Password 
                </Typography>

                <TextFieldWrapper
                  label="Password"
                  name="newPassword"
                />
                <TextFieldWrapper
                  label="Password"
                  name="confirmNewPassword"
                />
                
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={!isValid}
                  loading={isLoading}
                >
                  Submit
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>
        </Paper>
      </Grid>
    </>
  );
};
export default ForgetPassword;
