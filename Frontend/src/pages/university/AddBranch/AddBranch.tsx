import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { getContentPaddingLeft } from 'src/constants';
import useAccountContext from 'src/hooks/useAccountContext';

const AddBranch: React.FC = () => {
  const {isSidebarOpen} = useAccountContext();

  return (
    <>

<Grid container sx={{
              transition: ".25s",
              pt: 10,
              paddingLeft: isSidebarOpen ? `${getContentPaddingLeft(isSidebarOpen)}px` : "24px",
              // height: "100vh",
              // width: "100%",
              display: 'flex',
              justifyContent: "center",
              alignItems: "center"
        }}>    
            <Paper
             sx={{padding:4}}>
          <Box>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  margin: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography component="h1" variant="h5">
                  Add Branch 
                </Typography>
                <form >
               
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="s-number"
                    label="Company Name"
                    name="company-name"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="branch"
                    label="Branch"
                    name="branch"
                    autoFocus
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Add Branch
                  </Button>
                  <Grid container>
                    <Grid item xs></Grid>
                  </Grid>
                </form>
              </Box>
            </Container>
          </Box>
        </Paper>
      </Grid>
    </>
  );
}
export default AddBranch;
