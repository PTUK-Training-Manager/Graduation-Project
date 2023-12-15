import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { getBranch } from 'src/api/getBranch';
import {
  Autocomplete,
  Button,
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
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCompanies } from './api';

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
  const navigate = useNavigate();
  //@ts-ignore
  const { t } = useTranslation();

  const PaperComponentCustom: React.FC<{
    containerProps: any;
    children: CompanyOption;
  }> = ({ containerProps, children }) => {
    return (
      <Paper {...containerProps}>
        {children}
        <Button
          fullWidth
          color="primary"
          variant="contained"
          startIcon={<AddBusinessIcon sx={{ color: 'white' }} />}
          onClick={navigateToAnotherPage}
          onMouseDown={(event) => {
            event.preventDefault();
          }}
        >
          {t('AddNewCompany')}
        </Button>
      </Paper>
    );
  };

  const PaperComponentBranch: React.FC<{
    containerProps: any;
    children: CompanyOption;
  }> = ({ containerProps, children }) => {
    return (
      <Paper {...containerProps}>
        {children}
        <Button
          fullWidth
          color="primary"
          variant="contained"
          startIcon={<AddBusinessIcon sx={{ color: 'white' }} />}
          onClick={navigateToAnotherPage}
          onMouseDown={(event) => {
            event.preventDefault();
          }}
        >
          {t('Add New Branch')}
        </Button>
      </Paper>
    );
  };
  const [companyOptions, setCompanyOptions] = useState<CompanyOption[]>([]);
  const [branchOptions, setBranchOptions] = useState<BranchOption[]>([]);
  useEffect(() => {
    getCompanies({ pageIndex:0, pageSize:999}).then((res) => {
      const options = res.items.map((company) => ({
        id: company.id.toString(),
        name: company.name,
      })) as CompanyOption[];
      setCompanyOptions(options);
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

  const navigateToAnotherPage = () => {
    navigate('/me/companies');
  };

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
            minWidth: { xs: '90%', sm: '60%', md: '30%' },
          }}
        >
          <FormikProvider value={formikProps}>
            <Form>
              <Stack gap={2} alignItems="center">
                <Typography component="h1" variant="h5" fontWeight={500}>
                  {t('title')}
                </Typography>
                <TextFieldWrapper label={t('Student Number')} name="studentId" />

                <FormControl fullWidth>
                  <InputLabel>{t('TrainingType')}</InputLabel>
                  <Select
                    fullWidth
                    label={t('TrainingType')}
                    name="type"
                    value={formikProps.values.type}
                    onChange={formikProps.handleChange}
                  >
                    <MenuItem value="First">{t('value1')}</MenuItem>
                    <MenuItem value="Second">{t('value2')}</MenuItem>
                    <MenuItem value="Compound">{t('value3')}</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>{t('Semester')}</InputLabel>
                  <Select
                    label={t('Semester')}
                    name="semester"
                    value={formikProps.values.semester}
                    onChange={formikProps.handleChange}
                  >
                    <MenuItem value="first">{t('FirstSemester')}</MenuItem>
                    <MenuItem value="second">{t('SecondSemester')}</MenuItem>
                    <MenuItem value="summer">{t('SummerSemester')}</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <Autocomplete
                    disablePortal
                    //@ts-ignore
                    PaperComponent={PaperComponentCustom}
                    options={companyOptions}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                      formikProps.setFieldValue(
                        'companyId',
                        newValue?.id || ''
                      );
                      setSelectedCompany(newValue?.id || '');
                    }}
                    sx={{ width: '100%' }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="companyId"
                        label={t('Company Name')}
                      />
                    )}
                  />
                </FormControl>
                {selectedCompany && (
                  <FormControl fullWidth>
                    <Autocomplete
                      disablePortal
                      //@ts-ignore
                      PaperComponent={PaperComponentBranch}
                      options={branchOptions}
                      getOptionLabel={(option) => option.location}
                      onChange={(event, newValue) => {
                        formikProps.setFieldValue(
                          'companyBranchId',
                          newValue?.id || ''
                        );
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
                  {t('Submit')}
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
