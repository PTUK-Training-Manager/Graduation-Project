/* eslint-disable react/react-in-jsx-scope */
import { PanelButtonProps } from './types';
import { SxProps } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import StoreSharpIcon from '@mui/icons-material/StoreSharp';
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp';
import RecentActorsSharpIcon from '@mui/icons-material/RecentActorsSharp';
import { blue, pink, green, orange } from '@mui/material/colors';
import SchoolIcon from '@mui/icons-material/School';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import BarChartIcon from '@mui/icons-material/BarChart';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Groups3Icon from '@mui/icons-material/Groups3';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
const panelButtonIconSx: SxProps = {
  width: 48,
  height: 48,
};

export const panelButtonsForUniversity: PanelButtonProps[] = [
  {
    link: '/me/training-request',
    label: 'Requests',
    Icon: <PostAddIcon sx={panelButtonIconSx} />,
    bgcolor: blue[500],
  },
  {
    link: '/me/submitted-trainees',
    label: 'Submitted Trainees',
    Icon: <PeopleAltSharpIcon sx={panelButtonIconSx} />,
    bgcolor: pink[500],
  },
  {
    link: '/me/companies',
    label: 'Companies',
    Icon: <StoreSharpIcon sx={panelButtonIconSx} />,
    bgcolor: green[500],
  },
  {
    link: '/me/current-trainees',
    label: 'Current Trainees',
    Icon: <GroupsSharpIcon sx={panelButtonIconSx} />,
    bgcolor: blue[900],
  },
  {
    link: '/me/completed-trainees',
    label: 'Completed Trainees',
    Icon: <SchoolIcon sx={panelButtonIconSx} />,
    bgcolor: blue[900],
  },
  {
    link: '/me/all-trainings',
    label: 'Archive',
    Icon: <RecentActorsSharpIcon sx={panelButtonIconSx} />,
    bgcolor: orange[500],
  },
  {
    link: '/me/charts',
    label: 'Charts',
    Icon: <BarChartIcon sx={panelButtonIconSx} />,
    bgcolor: orange[500],
  },
];

export const panelButtonsForCompany: PanelButtonProps[] = [
  {
    link: '/me/training-requests',
    label: 'Training Requests',
    Icon: <FormatListBulletedIcon sx={panelButtonIconSx} />,
    bgcolor: blue[500],
  },
  {
    link: '/me/accepted-requests',
    label: 'Accepted Requests',
    Icon: <FactCheckIcon sx={panelButtonIconSx} />,
    bgcolor: pink[500],
  },
  {
    link: '/me/trainers',
    label: 'Trainers',
    Icon: <Groups3Icon sx={panelButtonIconSx} />,
    bgcolor: green[500],
  },
  {
    link: '/me/company-current-trainees',
    label: 'Current Trainees',
    Icon: <PendingActionsIcon sx={panelButtonIconSx} />,
    bgcolor: blue[900],
  },
  {
    link: '/me/company-completed-trainees',
    label: 'Completed Trainees',
    Icon: <SchoolIcon sx={panelButtonIconSx} />,
    bgcolor: blue[900],
  },
  {
    link: '/me/edit-training',
    label: 'Edit Training',
    Icon: <BorderColorIcon sx={panelButtonIconSx} />,
    bgcolor: orange[500],
  },
  {
    link: '/me/company-all-trainings',
    label: 'Archive',
    Icon: <RecentActorsIcon sx={panelButtonIconSx} />,
    bgcolor: orange[500],
  },
];

export const panelButtonsForTrainer: PanelButtonProps[] = [
  {
    link: '/me/evaluation-requests',
    label: 'Evaluation Requests',
    Icon: <IntegrationInstructionsIcon sx={panelButtonIconSx} />,
    bgcolor: blue[500],
  },
  {
    link: '/me/trainer-current-trainees',
    label: 'Current Trainers',
    Icon: <PendingActionsIcon sx={panelButtonIconSx} />,
    bgcolor: green[500],
  },
  {
    link: '/me/finished-200-hours',
    label: 'Finished Required Hours',
    Icon: <SchoolIcon sx={panelButtonIconSx} />,
    bgcolor: blue[900],
  },
  {
    link: '/me/trainer-completed-trainees',
    label: 'Completed Trainees',
    Icon: <FactCheckIcon sx={panelButtonIconSx} />,
    bgcolor: orange[500],
  },
  {
    link: '/me/trainer-all-trainings',
    label: 'Archive',
    Icon: <RecentActorsIcon sx={panelButtonIconSx} />,
    bgcolor: orange[500],
  },
];

export const panelButtonsForStudent: PanelButtonProps[] = [
  {
    link: '/me/all-training-student',
    label: 'All Trainings',
    Icon: <IntegrationInstructionsIcon sx={panelButtonIconSx} />,
    bgcolor: blue[500],
  },
  {
    link: '/me/Progress',
    label: 'Progress',
    Icon: <IntegrationInstructionsIcon sx={panelButtonIconSx} />,
    bgcolor: pink[500],
  },
];

export const panelButtonsForAdmin: PanelButtonProps[] = [
  {
    link: '/me/processes',
    label: 'Admin Processes',
    Icon: <IntegrationInstructionsIcon sx={panelButtonIconSx} />,
    bgcolor: blue[500],
  },
];
