import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar } from '@mui/material';
import PTUK_Logo from '/assets/PTUK-Logo.png';
import { ImageListItem, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import './Gstyle.css';

const Gnavbar = () => {
  return (
    <div>
      <Grid sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" className="bar">
          <Toolbar className="tbar">
            <Grid position="fixed" display="flex">
              <ImageListItem>
                <img className="ptuk" src={PTUK_Logo}></img>
              </ImageListItem>
            </Grid>

            <Grid className="pside">
              <Avatar
                sx={{ width: '3.5rem', height: '3.5rem', marginTop: '28%' }}
                sizes="large"
                alt="avatar"
                src="https://randomuser.me/api/portraits/women/79.jpg"
              ></Avatar>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </div>
  );
};

export default Gnavbar;
