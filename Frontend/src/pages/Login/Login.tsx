import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import {Form, FormikProvider} from "formik";
import useLoginController from "./hooks/useLoginController";
import TextFieldWrapper from "src/components/FormsUI/TextField";
import theme from "src/styling/customTheme";
import AppNavbar from "src/components/AppNavbar";
import AppSideDrawerMultiLevel from "src/components/AppSideDrawerMultiLevel";
import useAccountContext from "src/hooks/useAccountContext";
import {getContentPaddingLeft, NAVBAR_HEIGHT} from "src/constants";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Navigate} from "react-router-dom";
import useVerifyAccessToken from "src/hooks/useVerifyAccessToken";
import BlockUI from "src/containers/BlockUI";


const Login: React.FC = () => {

    /**
     * If user is already logged in, redirect to home page.
     */
    const {isSidebarOpen, user} = useAccountContext();

    if (user) return <Navigate to="/" replace state={{from: location.pathname}}/>;

    const {isVerifying} = useVerifyAccessToken();

    const {formikProps, isLoading} = useLoginController();

    const {isValid} = formikProps;

    if (isVerifying) return <BlockUI/>;

    return (
        <>
            <AppNavbar/>
            {/*<AppSideDrawer roleId={null}/>*/}
            <AppSideDrawerMultiLevel/>
            <Grid container
                  sx={{
                      transition: ".25s",
                      position: "relative",
                      pt: 8,
                      // top: `${NAVBAR_HEIGHT}px`,
                      paddingLeft: isSidebarOpen ? `${getContentPaddingLeft(isSidebarOpen)}px` : "0px",
                      bgcolor: theme.palette.grey[100],
                      height: "100vh",
                      overflow: "auto",
                      // height: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
                      //   width: "100%",
                      display: 'flex',
                      justifyContent: "center",
                      alignItems: "center",
                  }}
            >
                <Paper
                    elevation={10}
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        p: 4,
                        pb: 1,
                        width: {xs: "60%", sm: "450px"}
                    }}
                >
                    <FormikProvider value={formikProps}>
                        <Form autoComplete='off'>
                            <Stack alignItems="center" sx={{position: "relative"}}>
                                <Avatar
                                    sx={{
                                        bgcolor: 'secondary.main',
                                        backgroundColor: "primary.main",
                                        position: "absolute",
                                        top: `calc(-${theme.spacing(4)} - 20px)`, // -padding - half of the avatar size
                                    }}
                                >
                                    <LockOpenIcon/>
                                </Avatar>
                                <Stack direction="row" gap={2} sx={{alignItems: "center", mb: 3}}>
                                    <Typography component="h1" variant="h5">
                                        Login
                                    </Typography>
                                </Stack>
                                <TextFieldWrapper
                                    name="username"
                                    label="Username"
                                    sx={{mb: 2.5}}
                                />
                                <TextFieldWrapper
                                    name="password"
                                    label="Password"
                                    type="password"
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" size="small"/>}
                                    label="Remember me"
                                    sx={{my: 1, alignSelf: "flex-start", color: "text.secondary"}}
                                />
                                <LoadingButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={!isValid}
                                    loading={isLoading}
                                    // loadingPosition="start"
                                    sx={{mb: 1}}
                                >
                                    Login
                                </LoadingButton>
                                <Button sx={{textTransform: "none"}}>
                                    Forgotten your username or password?
                                </Button>
                            </Stack>
                        </Form>
                    </FormikProvider>
                </Paper>
            </Grid>
        </>
    );
}

export default Login;