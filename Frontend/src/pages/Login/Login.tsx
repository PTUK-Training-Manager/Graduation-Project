import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { Form, FormikProvider } from 'formik';
import useLoginController from './hooks/useLoginController';
import TextFieldWrapper from 'src/components/FormsUI/TextField';
import theme from 'src/styling/customTheme';
import AppNavbar from 'src/components/AppNavbar';
import AppSideDrawer from 'src/components/AppSideDrawer';
import useAccountContext from 'src/hooks/useAccountContext';
import { getContentPaddingLeft } from 'src/constants';
import { FormControlLabel, Checkbox } from '@mui/material';

const Login: React.FC = () => {
  const { formikProps, isLoading } = useLoginController();

  const { isSidebarOpen } = useAccountContext();

  const { isValid } = formikProps;

  return (
    <>
      <AppNavbar />
      <AppSideDrawer roleId={null} />
      <Grid
        container
        sx={{
          transition: '.25s',
          paddingLeft: isSidebarOpen
            ? `${getContentPaddingLeft(isSidebarOpen)}px`
            : '8px',
          //   bgcolor: theme.palette.grey[200],
            height: "100vh",
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
                <Avatar
                  sx={{
                    bgcolor: 'secondary.main',
                    backgroundColor: 'primary.main',
                  }}
                >
                  <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <TextFieldWrapper name="username" label="Username" />
                <TextFieldWrapper
                  name="password"
                  label="Password"
                  type="password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />

                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={!isValid}
                  loading={isLoading}
                  // loadingPosition="start"
                >
                  Sign In
                </LoadingButton>
                <Button sx={{ textTransform: 'none', mt: 1 }}>
                  Forgotten your username or password?
                </Button>
              </Stack>
            </Form>
          </FormikProvider>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
