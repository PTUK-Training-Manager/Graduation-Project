import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import './ustyle.css';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import UNavbar from './UNavbar';
const drawerWidth = 240;

export default function AddCompany() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event: {
    currentTarget: React.SetStateAction<any>;
  }): void => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <UNavbar />

      <Box sx={{ display: 'flex' }}>
        <Paper sx={{ padding: '32px', marginTop: '10%' }} elevation={10}>
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
                  Add Company
                </Typography>
                <form >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="s-number"
                    label="Company Name"
                    name="s-number"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="E-mail"
                    type="email"
                    name="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="m-number"
                    label="Manager Name"
                    name="m-number"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="location"
                    label="Location"
                    name="location"
                    autoFocus
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Generate Account
                  </Button>
                  <Grid container>
                    <Grid item xs></Grid>
                  </Grid>
                </form>
              </Box>
            </Container>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
