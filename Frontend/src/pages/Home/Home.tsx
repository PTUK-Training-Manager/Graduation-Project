import React, { FC } from 'react';
import Stack from '@mui/material/Stack';
import { Typography, Chip, Avatar, Box, IconButton, Grid } from '@mui/material';
import Playground from '@mui/lab';
import PostAddIcon from '@mui/icons-material/PostAdd';
// import backgroundImage from './9e9303661f991a048054650aaaee2d50.jpg';
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import StoreSharpIcon from '@mui/icons-material/StoreSharp';
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp';
import RecentActorsSharpIcon from '@mui/icons-material/RecentActorsSharp';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const styles = {
  root: {
    position: 'relative',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `linear-gradient(to bottom right, #00c6ff, #0072ff)`,
    backgroundSize: 'cover',
    overflow: 'hidden',
    color: 'white',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: '50%',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgb(66,165,245)',
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 50,
    color: '#136a8a',
  },
};

interface HomeProps {}

const Home: FC<HomeProps> = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <Box sx={styles.root}>
        <Box sx={styles.overlay}></Box>
        <Stack gap={5} sx={{ zIndex: 1 }}>
          <Typography variant="h1">{t('Welcome')}</Typography>
          <Chip avatar={<Avatar>A</Avatar>} label="Arafat" variant="outlined" />
          <Grid
            container
            alignItems="center"
            spacing={2}
            gap={8}
            sx={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: '5px',
              padding: '32px',
            }}
          >
            <Grid item>
              <Link to={'/university/AllTrainings'}>
                <IconButton sx={{ ...styles.circle, m: 'auto' }}>
                  <PostAddIcon sx={styles.icon} />
                </IconButton>
              </Link>
              <Typography
                variant="h6"
                sx={{ color: '#217A94', fontSize: '18px' }}
              >
                {t("Requests")}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton sx={{ ...styles.circle, m: 'auto' }}>
                <PeopleAltSharpIcon sx={styles.icon} />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ color: '#217A94', fontSize: '18px' }}
              >
                {t('SubmittedTrainees')}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton sx={{ ...styles.circle }}>
                <StoreSharpIcon sx={styles.icon} />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ color: '#217A94', fontSize: '18px' }}
              >
                Companies
              </Typography>
            </Grid>
            <Grid item>
              <IconButton sx={{ ...styles.circle }}>
                <GroupsSharpIcon sx={styles.icon} />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ color: '#217A94', fontSize: '18px' }}
              >
                Trainees
              </Typography>
            </Grid>
            <Grid item>
              <IconButton sx={{ ...styles.circle }}>
                <RecentActorsSharpIcon sx={styles.icon} />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ color: '#217A94', fontSize: '18px' }}
              >
                Archive
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </>
  );
};

export default Home;
