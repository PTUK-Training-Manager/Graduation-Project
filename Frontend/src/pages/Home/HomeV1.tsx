import React, {FC} from 'react';
import Stack from '@mui/material/Stack';
import {Typography, IconButton, Grid, Box} from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import StoreSharpIcon from '@mui/icons-material/StoreSharp';
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp';
import RecentActorsSharpIcon from '@mui/icons-material/RecentActorsSharp';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import HomePageImage from './home.jpg';
import useAccountContext from 'src/hooks/useAccountContext';

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
        backgroundColor: '#136a8a',
        boxShadow: '0 2px 4px rgb(66, 165, 245)',
    },
    icon: {
        color: '#fff',
        fontSize: 50,
    },
    label: {
        fontSize: '18px',
        marginTop: '8px',
        color: '#136a8a',
    },
    rtl: {
        flexDirection: 'row-reverse',
        marginRight: '-80%',
        marginBottom: '-10%',
    },
};

const HomeV1: FC = () => {
    // @ts-ignore
    const {t} = useTranslation();
    const {isSidebarOpen, getUser} = useAccountContext();
    const user = getUser();

    return (
        <Box sx={styles.root}>
            <Stack
                gap={2}
                sx={{
                    backgroundImage: `url(${HomePageImage})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    borderRadius: '100% 0% 100% 0% / 0% 0% 100% 100%',
                    justifyContent: 'center',
                    marginRight: '60%',
                    position: 'relative',
                    height: '100vh',
                    marginTop: '-65px',
                    fontSize: '50px',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <Box
                    sx={{
                        borderRadius: '100% 0% 100% 0% / 0% 0% 100% 100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',

                    }}
                />
                <Typography
                    sx={{
                        zIndex: '1',
                        marginLeft: '100%',
                        color: '#136a8a',
                        marginTop: '10%',

                    }}
                    variant="h1"
                >
                    Welcome
                </Typography>
                <Typography
                    sx={{
                        zIndex: '1',
                        marginLeft: '130%',
                        color: '#136a8a',
                        marginBottom: '10%',


                    }}
                    variant="h2"
                >
                    Arafat
                </Typography>
                <Grid
                    container
                    spacing={4}
                    gap={8}
                    sx={{
                        marginLeft: '75%',
                        flexWrap: 'nowrap',
                        marginTop: '10px',


                    }}
                >
                    <Grid xs={1} item>
                        <Link to="/training-request">
                            <IconButton sx={styles.circle}>
                                <PostAddIcon sx={styles.icon}/>
                            </IconButton>
                        </Link>
                        <Typography variant="h6" sx={styles.label}>
                            {t('Requests')}
                        </Typography>
                        <Grid
                            container
                            spacing={4}
                            gap={8}
                            sx={{
                                marginLeft: '75%',
                                flexWrap: 'nowrap',
                                marginTop: '10px'
                            }}
                        >
                            <Grid xs={1} item>
                                <Link to="/training-request">
                                    <IconButton sx={styles.circle}>
                                        <PostAddIcon sx={styles.icon}/>
                                    </IconButton>
                                </Link>
                                <Typography variant="h6" sx={styles.label}>
                                    {t('Requests')}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Link to="/submitted-trainees">
                                    <IconButton sx={styles.circle}>
                                        <PeopleAltSharpIcon sx={styles.icon}/>
                                    </IconButton>
                                </Link>
                                <Typography variant="h6" sx={styles.label}>
                                    {t('Submitted Trainees')}
                                </Typography>
                            </Grid>
                            <Grid xs={1} item>
                                <Link to="/companies">
                                    <IconButton sx={styles.circle}>
                                        <StoreSharpIcon sx={styles.icon}/>
                                    </IconButton>
                                </Link>
                                <Typography variant="h6" sx={styles.label}>
                                    {t('Companies')}
                                </Typography>
                            </Grid>
                            <Grid xs={1} item>
                                <Link to="/current-trainees">
                                    <IconButton sx={styles.circle}>
                                        <GroupsSharpIcon sx={styles.icon}/>
                                    </IconButton>
                                </Link>
                                <Typography variant="h6" sx={styles.label}>
                                    {t('Trainees')}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Link to="/all-trainings">
                                    <IconButton sx={styles.circle}>
                                        <RecentActorsSharpIcon sx={styles.icon}/>
                                    </IconButton>
                                </Link>
                                <Typography variant="h6" sx={styles.label}>
                                    {t('Archive')}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Stack>
        </Box>
// COMPANY


// {/* <Box sx={styles.root}>
// <Stack
//   gap={2}
//   sx={{

//     backgroundImage: `url(${bg})`,
//     backgroundPosition: 'center',
//     backgroundSize: 'cover',
//     borderRadius: '100% 0% 100% 0% / 0% 0% 100% 100%',
//     justifyContent: 'center',
//     marginRight: '60%',
//     position: 'relative',
//     height: '100vh',
//     marginTop: '-65px',
//     fontSize: '50px',
//     backgroundRepeat: 'no-repeat',
//   }}
// >
//   <Box
//     sx={{

//       borderRadius: '100% 0% 100% 0% / 0% 0% 100% 100%',
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       backgroundColor: 'rgba(0, 0, 0, 0.3)',
//     }}
//   />
//   <Typography
//     sx={{
//       zIndex: '1',
//       marginLeft: '100%',
//       color: '#136a8a',
//       marginTop: '10%',

//     }}
//     variant="h1"
//   >
//     {t('Welcome')}
//   </Typography>
//   <Typography
//     sx={{
//       zIndex: '1',
//       marginLeft: '130%',
//       color: '#136a8a',
//       marginBottom: '10%',

//     }}
//     variant="h2"
//   >
// Arafat
// </Typography>
//   <Grid
//     container
//     spacing={4}
//     gap={8}
//     sx={{
//       marginLeft: '65%',
//       flexWrap: 'nowrap',
//       marginTop: '10px'
//     }}
//   >
//     <Grid xs={1} item>
//       <Link to="/training-requests">
//         <IconButton sx={styles.circle}>
//           <PostAddIcon sx={styles.icon} />
//         </IconButton>
//       </Link>
//       <Typography variant="h6" sx={styles.label}>
//         {t('TrainingRequests')}
//       </Typography>
//     </Grid>
//     <Grid item xs={1} >
//       <Link to="/accepted-requests">
//         <IconButton sx={styles.circle}>
//           <PeopleAltSharpIcon sx={styles.icon} />
//         </IconButton>
//       </Link>
//       <Typography variant="h6" sx={styles.label}>
//         {t('AcceptedRequests')}
//       </Typography>
//     </Grid>
//     <Grid xs={1} item>
//       <Link to="/trainers">
//         <IconButton sx={styles.circle}>
//           <StoreSharpIcon sx={styles.icon} />
//         </IconButton>
//       </Link>
//       <Typography variant="h6" sx={styles.label}>
//         {t('Trainers')}
//       </Typography>
//     </Grid>
//     <Grid xs={1} item>
//       <Link to="/edit-training">
//         <IconButton sx={styles.circle}>
//           <GroupsSharpIcon sx={styles.icon} />
//         </IconButton>
//       </Link>
//       <Typography variant="h6" sx={styles.label}>
//         {t('EditTraining')}
//       </Typography>
//     </Grid>
//     <Grid xs={1} item>
//       <Link to="/current-trainees">
//         <IconButton sx={styles.circle}>
//           <GroupsSharpIcon sx={styles.icon} />
//         </IconButton>
//       </Link>
//       <Typography variant="h6" sx={styles.label}>
//         {t('Trainees')}
//       </Typography>
//     </Grid>
//     <Grid item>
//       <Link to="/all-trainings">
//         <IconButton sx={styles.circle}>
//           <RecentActorsSharpIcon sx={styles.icon} />
//         </IconButton>
//       </Link>
//       <Typography variant="h6" sx={styles.label}>
//         {t('Archive')}
//       </Typography>
//     </Grid>
//   </Grid>
// </Stack>
// </Box> */}


    );
};

export default HomeV1;