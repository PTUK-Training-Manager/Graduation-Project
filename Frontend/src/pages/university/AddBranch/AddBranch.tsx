import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { getContentPaddingLeft } from 'src/constants';
import useAccountContext from 'src/hooks/useAccountContext';
import { LoadingButton } from '@mui/lab';
import { MenuItem, Stack } from '@mui/material';
import { FormikProvider } from 'formik';
import TextFieldWrapper from 'src/components/FormsUI/TextField';
import useAddBranchController from './hooks/useAddBranchController';

const AddBranch: React.FC = () => {
  const { isSidebarOpen } = useAccountContext();
  const { formikProps, isLoading } = useAddBranchController();
  const { isValid } = formikProps;
  const options = [
    { value: 'company1', label: 'Company 1' },
    { value: 'company2', label: 'Company 2' },
    { value: 'company3', label: 'Company 3' },
  ];
  return (
    <>
      <Grid
        container
        sx={{
          transition: '.25s',
          pt: 15,
          paddingLeft: isSidebarOpen
            ? `${getContentPaddingLeft(isSidebarOpen)}px`
            : '8px',
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
            p: 3.5,
            minWidth: { xs: '90%', sm: '60%', md: '30%' },
          }}
        >
          <FormikProvider value={formikProps}>
            <form>
              <Stack gap={2} alignItems="center">
                <Typography component="h1" variant="h5">
                  Add Branch
                </Typography>

                <TextFieldWrapper
                  select
                  label="Company Name"
                  name="id"
                  options={options}
                  autoFocus                  
>               
 {/* <MenuItem aria-valuetext='Exalt'>Exalt</MenuItem> */}
</TextFieldWrapper>
                <TextFieldWrapper label="Location" name="location" />

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
            </form>
          </FormikProvider>
        </Paper>
      </Grid>
    </>
  );
};
export default AddBranch;
