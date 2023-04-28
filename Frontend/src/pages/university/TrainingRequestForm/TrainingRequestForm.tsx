import * as React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import useAccountContext from 'src/hooks/useAccountContext';
import {Stack} from '@mui/material';
import {FormikProvider} from 'formik';
import useTrainingRequestFormController from './hooks/useTrainingRequestFormController';
import TextFieldWrapper from 'src/components/FormsUI/TextField';

const TrainingRequestForm: React.FC = () => {
    const [selectedCompany, setSelectedCompany] = React.useState('');
    const {isSidebarOpen} = useAccountContext();
    const {formikProps, isLoading} = useTrainingRequestFormController();
    const {isValid} = formikProps;

    return (
        <Grid
            container
            sx={{
                py: 5,
                display: 'flex',
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Paper elevation={10}
                   sx={{
                       justifyContent: "center",
                       alignItems: "center",
                       p: 4,
                       minWidth: {xs: "90%", sm: "500px"}
                   }}>
                <FormikProvider value={formikProps}>
                    <form>
                        <Stack gap={2} alignItems="center">
                            <Typography component="h1" variant="h5">
                                Submit Training Request
                            </Typography>

                            <TextFieldWrapper label="Student Number" name="studentId" autoFocus/>

                            <TextField
                                fullWidth
                                label="Type"
                                name="type"
                                select
                            >
                                <MenuItem value="first">First</MenuItem>
                                <MenuItem value="second">Second</MenuItem>
                                <MenuItem value="compined">Compined</MenuItem>
                            </TextField>
                            <TextField
                                fullWidth
                                label="Semester"
                                name="semester"
                                select
                            >
                                <MenuItem value="semester-1">Semester One</MenuItem>
                                <MenuItem value="semester-2">Semester Two</MenuItem>
                                <MenuItem value="summer">Summer Semester</MenuItem>
                            </TextField>

                            <TextField
                                fullWidth
                                label="Company Name"
                                select
                                name="id"
                                value={selectedCompany}
                                onChange={(e) => setSelectedCompany(e.target.value)} // Update state when company name is selected
                            >
                                <MenuItem value="F">Foothill</MenuItem>
                                <MenuItem value="E">Exalt</MenuItem>
                                <MenuItem value="A">ASAL</MenuItem>
                            </TextField>
                            {selectedCompany && ( // Conditionally render branch dropdown if a company is selected
                                <TextField
                                    fullWidth
                                    label="Branch"
                                    select
                                    name="companyBranchId"
                                >
                                    <MenuItem value="F">Nablus</MenuItem>
                                    <MenuItem value="E">Ramallah</MenuItem>
                                    <MenuItem value="A">Jenin</MenuItem>
                                </TextField>
                            )}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                // disabled={!isValid}
                                // loading={isLoading}
                            >
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </FormikProvider>
            </Paper>
        </Grid>
    );
};
export default TrainingRequestForm;
