import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { getCompany } from 'src/getCompany/index';
import { getBranch } from 'src/getBranch/index';
import {
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  Stack,
} from '@mui/material';
import { Form, FormikProvider } from 'formik';
import useTrainingRequestFormController from './hooks/useTrainingRequestFormController';
import { LoadingButton } from '@mui/lab';
import TextFieldWrapper from 'src/components/FormsUI/TextField';
import { useEffect, useState } from 'react';

interface CompanyOption {
  id: string;
  name: string;
}

interface BranchOption {
  id: string;
  location: string;
}

const TrainingRequestForm: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = React.useState('');
  const { formikProps, isLoading } = useTrainingRequestFormController();
  const { isValid } = formikProps;

  const [companyOptions, setCompanyOptions] = useState<CompanyOption[]>([]);
  const [branchOptions, setBranchOptions] = useState<BranchOption[]>([]);

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

  useEffect(() => {
    if (selectedCompany) {
      getBranch({ companyId: selectedCompany }).then((res) => {
        if (res.success) {
          const options = res.data.map((branch) => ({
            id: branch.id.toString(),
            location: branch.location,
          })) as BranchOption[];
          setBranchOptions(options);
        }
      });
    }
  }, [selectedCompany]);

  console.log(formikProps.errors);


  return (
    <>
      <Grid
        container
        sx={{
            py: 5,
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
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
                  Submit Request
                </Typography>

                <TextFieldWrapper
                  label="Student Number"
                  name="studentId"
                  autoFocus
                />
                

                <FormControl fullWidth>
  <InputLabel>Type</InputLabel>
  <Select fullWidth label="Type" name="type" value={formikProps.values.type} onChange={formikProps.handleChange}>
    <MenuItem value="first">first</MenuItem>
    <MenuItem value="second">second</MenuItem>
    <MenuItem value="compound">Compound</MenuItem>
  </Select>
</FormControl>

<FormControl fullWidth>
  <InputLabel>Semester</InputLabel>
  <Select label="Semester" name="semester" value={formikProps.values.semester} onChange={formikProps.handleChange}>
    <MenuItem value="first">first</MenuItem>
    <MenuItem value="second">second</MenuItem>
    <MenuItem value="summer">summer</MenuItem>
  </Select>
</FormControl>

<FormControl fullWidth>
<Autocomplete
  disablePortal
  options={companyOptions}
  getOptionLabel={(option) => option.name}
  onChange={(event, newValue) => {
    formikProps.setFieldValue('companyId', newValue?.id || '');
    setSelectedCompany(newValue?.id || '');
  }}
  sx={{ width: '100%' }} 
  renderInput={(params) => (
    <TextField  
      {...params} 
      name="companyId" 
      label="Company Name" 
    />
  )}
/>
</FormControl>

{selectedCompany && (
  <FormControl fullWidth>
  <Autocomplete
    disablePortal
    options={branchOptions}
    getOptionLabel={(option) => option.location}
    onChange={(event, newValue) => {
      formikProps.setFieldValue('companyBranchId', newValue?.id || '');
    }}
    sx={{ width: '100%' }} 
    renderInput={(params) => (
      <TextField
        {...params}
        name="companyBranchId"
        label="Location"
      />
    )}
  />
  </FormControl>
)}

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
export default TrainingRequestForm;