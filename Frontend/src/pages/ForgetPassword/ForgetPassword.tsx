import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Stack} from '@mui/material';
import {Form, FormikProvider} from 'formik';
import {LoadingButton} from '@mui/lab';
import TextFieldWrapper from 'src/components/FormsUI/TextField';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useForgetController from './hooks/useForgetController';
import { useTranslation } from 'react-i18next';

const ForgetPassword: React.FC = () => {
    const [selectedCompany, setSelectedCompany] = React.useState('');
    const {formikProps, isLoading} = useForgetController();
    const {isValid, values} = formikProps;
    const navigate = useNavigate();
    const [response, setResponse] = useState(null);

    const {newPassword, confirmNewPassword} = values;

    const isSubmitEnabled = isValid && (newPassword === confirmNewPassword);
//@ts-ignore
    const {t} = useTranslation();

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
                                    {t("Set New Password")}
                                </Typography>

                                <TextFieldWrapper
                                    type="password"
                                    label={t("Password")}
                                    name="newPassword"
                                />
                                <TextFieldWrapper
                                    type="password"
                                    label={t("Confirm Password")}
                                    name="confirmNewPassword"
                                />

                                <LoadingButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={!isSubmitEnabled}
                                    loading={isLoading}
                                >
                                    {t("Submit")}
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
