import React, { FC } from 'react';
import Stack from '@mui/material/Stack';
import { Typography, IconButton, Grid, Box } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import StoreSharpIcon from '@mui/icons-material/StoreSharp';
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp';
import RecentActorsSharpIcon from '@mui/icons-material/RecentActorsSharp';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const styles = {
  root: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    color: 'white',
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: '50%',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgb(66, 165, 245)',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1,
  },
  icon: {
    fontSize: 50,
    color: '#136a8a',
  },
  label: {
    color: '#136A8A',
    fontSize: '18px',
    marginTop: '8px',
  },
  imageContainer: {
    display: 'flex',
  },
  image: {
    width: '200px',
  },
};
interface HomeProps {}

const Home: FC<HomeProps> = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <Box sx={styles.root}>
        <Stack
          gap={2}
          sx={{
            backgroundColor: '#1CA7EC',
            borderRadius: '100% 0% 100% 0% / 0% 0% 100% 100% ',
            justifyContent: 'center',
            marginRight: '35%',
          }}
        >
          <Typography sx={{ marginBottom: '20px', textAlign: 'center' }} variant="h1">
            {t('Welcome')}
          </Typography>

          <Grid
            container
            alignItems="center"
            spacing={1}
            gap={8}
            sx={{
              marginTop: '30%',
              borderRadius: '5px',
              zIndex: 1,
              marginLeft: '50%',
              justifyContent: 'center', // Align the grid items in the center horizontally
              flexWrap: 'nowrap',
            }}
          >
            <Grid item>
              <Link to="/training-request">
                <IconButton sx={{ ...styles.circle, m: 'auto' }}>
                  <PostAddIcon sx={styles.icon} />
                </IconButton>
              </Link>
              <Typography variant="h6" sx={styles.label}>
                {t('Requests')}
              </Typography>
            </Grid>
            <Grid item>
              <Link to="/submitted-trainees">
                <IconButton sx={{ ...styles.circle, m: 'auto' }}>
                  <PeopleAltSharpIcon sx={styles.icon} />
                </IconButton>
              </Link>
              <Typography variant="h6" sx={styles.label}>
                {t('Submitted Trainees')}
              </Typography>
            </Grid>
            <Grid item>
              <Link to="/companies">
                <IconButton sx={styles.circle}>
                  <StoreSharpIcon sx={styles.icon} />
                </IconButton>
              </Link>
              <Typography variant="h6" sx={styles.label}>
                {t('Companies')}
              </Typography>
            </Grid>
            <Grid item>
              <Link to="/current-trainees">
                <IconButton sx={styles.circle}>
                  <GroupsSharpIcon sx={styles.icon} />
                </IconButton>
              </Link>
              <Typography variant="h6" sx={styles.label}>
                {t('Trainees')}
              </Typography>
            </Grid>
            <Grid item>
              <Link to="/all-trainings">
                <IconButton sx={styles.circle}>
                  <RecentActorsSharpIcon sx={styles.icon} />
                </IconButton>
              </Link>
              <Typography variant="h6" sx={styles.label}>
                {t('Archive')}
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      <Box sx={styles.imageContainer}>
   
      </Box>
          <img
            src="src\pages\Home\My project.png"
            alt="Project"
            style={styles.image}
          />
        </Box>
    </>
  );
};


export default Home;