import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import useAddCompanyFormController from './hooks/useAddCompanyFormController';
import LoadingButton from '@mui/lab/LoadingButton';
import {Form, FormikProvider} from 'formik';
import TextFieldWrapper from 'src/components/FormsUI/TextField';
import Stack from '@mui/material/Stack';

const AddCompanyForm: React.FC = () => {
    const {formikProps, isLoading} = useAddCompanyFormController();
    const {isValid} = formikProps;

    return (
        <>
            <Grid
                container
                sx={{
                    py: 5, // paddingY
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Paper
                    elevation={5}
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 3.5,
                        minWidth: {xs: "90%", md: "500px"},
                    }}
                >
                    <FormikProvider value={formikProps}>
                        <Form>
                            <Stack gap={2} alignItems="center">
                                <Typography component="h1" variant="h5">
                                    Add Company
                                </Typography>

                                <TextFieldWrapper label="Company Id" name="id" autoFocus/>
                                <TextFieldWrapper label="Company Name" name="name"/>
                                <TextFieldWrapper label="Phone Number" name="phoneNumber"/>
                                <TextFieldWrapper label="E-mail" type="email" name="email"/>
                                <TextFieldWrapper label="Location" name="location"/>
                                <TextFieldWrapper label="Manager Name" name="managerName"/>

                                <LoadingButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={!isValid}
                                    loading={isLoading}
                                >
                                    Generate Account
                                </LoadingButton>
                            </Stack>
                        </Form>
                    </FormikProvider>
                </Paper>
            </Grid>
        </>
    );
};
export default AddCompanyForm;
