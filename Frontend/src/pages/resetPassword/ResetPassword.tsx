import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Stack} from '@mui/material';
import {Form, FormikProvider} from 'formik';
import {LoadingButton} from '@mui/lab';
import TextFieldWrapper from 'src/components/FormsUI/TextField';
import useResetPasswordController from './hooks/useResetPasswordController';

const ForgetPassword: React.FC = () => {
    const {formikProps, isLoading} = useResetPasswordController();
    const {isValid} = formikProps;

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
                        minWidth: {xs: '90%', sm: '60%', md: '30%'},
                    }}
                >
                    <FormikProvider value={formikProps}>
                        <Form>
                            <Stack gap={2} alignItems="center">
                                <Typography component="h1" variant="h5">
                                    Set New Password
                                </Typography>
                                <TextFieldWrapper type='password' label="Old Password" name="oldPassword"/>
                                <TextFieldWrapper type='password' label="Password" name="newPassword"/>
                                <TextFieldWrapper type='password' label="Password" name="confirmNewPassword"/>

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
