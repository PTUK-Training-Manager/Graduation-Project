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
import AppSideDrawerMultiLevel from 'src/components/AppSideDrawerMultiLevel';
import useAccountContext from 'src/hooks/useAccountContext';
import { getContentPaddingLeft, NAVBAR_HEIGHT } from 'src/constants';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Navigate } from 'react-router-dom';
import useVerifyAccessToken from 'src/hooks/useVerifyAccessToken';
import BlockUI from 'src/containers/BlockUI';
import Training from 'src/images/assets/training.png';
import Wave from 'react-wavify';
import { useState } from 'react';
import useSnackbar from 'src/hooks/useSnackbar';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { forgget } from 'src/api/forgetPassword';

const Login: React.FC = () => {
  /**
   * If user is already logged in, redirect to home page.
   */
  const [openDialog,setOpenDialog] = useState(false)
  const { showSnackbar } = useSnackbar();
  const [username,seteUserName]=useState('');
  const handleForggetClick = () => {
    setOpenDialog(true)
   };
   const handleCancel = () => {
    setOpenDialog(false);
  };
  const handleSend = () => {
    forgget({ username: username }).then(
      (res: { success: boolean; message: any }) => {
        if (res.success === true) {
          showSnackbar({ severity: 'success', message: 'A message has been sent to your Gmail' });
          seteUserName('')
          setOpenDialog(false);
        } else if (res.success === false) {
          showSnackbar({ severity: 'warning', message: res.message });
          seteUserName('');
          setOpenDialog(false);
        }
      }
    );
  };
  const { isSidebarOpen, user } = useAccountContext();

  if (user)
    return <Navigate to="/" replace state={{ from: location.pathname }} />;

  const { isVerifying } = useVerifyAccessToken();

  const { formikProps, isLoading } = useLoginController();

  const { isValid } = formikProps;

  if (isVerifying) return <BlockUI />;
  
  return (
    <>
      <AppNavbar />
      <AppSideDrawerMultiLevel />
      <Grid
        container
        sx={{
          transition: '.25s',
          position: 'relative',
          pt: 8,
          // top: `${NAVBAR_HEIGHT}px`,
          paddingLeft: isSidebarOpen
            ? `${getContentPaddingLeft(isSidebarOpen)}px`
            : '0px',
          bgcolor: theme.palette.grey[100],
          height: '100vh',
          overflow: 'hidden',
          // height: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
          //   width: "100%",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid
          sx={{
            display: 'flex',
            position: 'absolute',
            transform: 'translateX(-50%)',
            justifyContent: 'flex-start',
          }}
        >
          <img
            src={Training}
            style={{
              height: 648,
              width: 800,
             
            }}
          />
        </Grid>
        <Wave 
        fill='#f5f5f5'
        paused={false}
        options={{
          height:80,
          amplitude:30,
          speed:0.25,
          points:6,
          //@ts-ignore
          style: {transform: 'rotate(270deg)',marginLeft: '-100px' }, // Add this line to rotate the wave
        }}
/>
        <Paper
          elevation={10}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            p: 4,
            pb: 1,
            ml: '50rem',
            mb:'8rem',
            width: { xs: '60%', sm: '450px' },
          }}
        >
          <FormikProvider value={formikProps}>
            <Form autoComplete="off">
              <Stack alignItems="center" sx={{ position: 'relative' }}>
                <Avatar
                  sx={{
                    bgcolor: 'secondary.main',
                    backgroundColor: 'primary.main',
                    position: 'absolute',
                    top: `calc(-${theme.spacing(4)} - 20px)`, // -padding - half of the avatar size
                  }}
                >
                  <LockOpenIcon />
                </Avatar>
                <Stack
                  direction="row"
                  gap={2}
                  sx={{ alignItems: 'center', mb: 3 }}
                >
                  <Typography component="h1" variant="h5">
                    Login
                  </Typography>
                </Stack>
                <TextFieldWrapper
                  name="username"
                  label="Username"
                  sx={{ mb: 2.5 }}
                />
                <TextFieldWrapper
                  name="password"
                  label="Password"
                  type="password"
                />
                <FormControlLabel
                  control={
                    <Checkbox value="remember" color="primary" size="small" />
                  }
                  label="Remember me"
                  sx={{
                    my: 1,
                    alignSelf: 'flex-start',
                    color: 'text.secondary',
                  }}
                />
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={!isValid}
                  loading={isLoading}
                  // loadingPosition="start"
                  sx={{ mb: 1 }}
                >
                  Login
                </LoadingButton>
                <Button sx={{ textTransform: 'none' }} onClick={handleForggetClick}>
                  Forgotten your username or password?
                </Button>
              </Stack>
            </Form>
          </FormikProvider>
        </Paper>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog">Forgget Password</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            label="Enter Your Username"
            fullWidth
            required
            margin='dense'
            value={username}
            onChange={(event) => seteUserName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="error">
            Cancel
          </Button>
          <Button color="primary" onClick={handleSend}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Login;
