import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';
import {Autocomplete} from '@mui/material';
import {Form, FormikProvider} from 'formik';
import {getCompany} from 'src/getCompany/index';
import TextFieldWrapper from 'src/components/FormsUI/TextField';
import useAddBranchFormController from './hooks/useAddBranchFormController';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {useEffect, useState} from 'react';

interface CompanyOption {
    id: string;
    name: string;
}

const AddBranchForm: React.FC = () => {
    const {formikProps, isLoading} = useAddBranchFormController();
    const {isValid} = formikProps;

    const [companyOptions, setCompanyOptions] = useState<CompanyOption[]>([]);
    useEffect(() => {
        getCompany().then((res) => {
            if (res.success) {
                const options = res.data.map((company) => ({
                    id: company.id.toString(),
                    name: company.name,
                })) as CompanyOption[];
                setCompanyOptions(options);
            }
        });
    }, []);

    return (
        <>
            <Grid
                container
                sx={{
                    height: '100vh',
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
                        minWidth: {xs: "90%", md: "400px"},
                    }}
                >
                    <FormikProvider value={formikProps}>
                        <Form>
                            <Stack gap={2} alignItems="center">
                                <Typography component="h1" variant="h5">
                                    Add Branch
                                </Typography>

                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={companyOptions}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, newValue) => {
                                        formikProps.setFieldValue('id', newValue?.id || '');
                                    }}
                                    sx={{width: '100%'}}
                                    renderInput={(params) => (
                                        <TextField name="id" {...params} label="Company Name"/>
                                    )}
                                />
                                <TextFieldWrapper label="Location" name="location"/>

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
export default AddBranchForm;
