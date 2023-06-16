import {FC} from 'react';
import Grid from '@mui/material/Grid';
import {Form, FormikProvider} from 'formik';
import theme from 'src/styling/customTheme';
import AppNavbar from 'src/components/AppNavbar';
import AppSideDrawerMultiLevel from 'src/components/AppSideDrawerMultiLevel';
import useAccountContext from 'src/hooks/useAccountContext';
import LoginForm from "./components/LoginForm";
import ForgetPasswordDialog from "./components/ForgetPasswordDialog";
import {LoginProvider} from "./context/LoginContext";
import useLoginForm from "./hooks/useLoginForm";
import WavyBackground from "./components/WavyBackground";
import useStyles from "./styles";

const Login: FC = () => {

    const {formikProps, isLoading} = useLoginForm();

    const {isSidebarOpen, user} = useAccountContext();

    const classes = useStyles({
        isSidebarOpen,
    });

    // const {isVerifying} = useVerifyAccessToken();

    // if (isVerifying) return <BlockUI/>;

    // if (user) return <Navigate to="/me" replace state={{from: location.pathname}}/>;

    return (
        <LoginProvider>
            <AppNavbar/>
            <AppSideDrawerMultiLevel/>
            <FormikProvider value={formikProps}>
                <Form autoComplete="off">
                    <Grid
                        container
                        className={classes.root}
                        sx={{bgcolor: theme.palette.grey[100]}}
                    >
                        <Grid item xs={6} sx={{display: {xs: "none", md: "flex"}}}>
                            <WavyBackground/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <LoginForm isLoggingIn={isLoading}/>
                        </Grid>
                    </Grid>
                </Form>
                <ForgetPasswordDialog/>
            </FormikProvider>
        </LoginProvider>
    );
};

export default Login;
