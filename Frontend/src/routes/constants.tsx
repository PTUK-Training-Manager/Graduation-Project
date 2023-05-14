import React from 'react';
import { IAppMenuItem } from 'src/routes/types';
import { UserRoleKey, MenuItemsMapKey } from 'src/types';
// MUI icons
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import GroupIcon from '@mui/icons-material/Group';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import StoreIcon from '@mui/icons-material/Store';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddchartIcon from '@mui/icons-material/Addchart';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HailIcon from '@mui/icons-material/Hail';
import Groups3Icon from '@mui/icons-material/Groups3';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

const publicMenuItems: IAppMenuItem[] = [
  {
    label: 'Landing',
    link: '/landing',
    Icon: () => <EmojiPeopleIcon />,
  },
];

const sharedMenuItems: IAppMenuItem[] = [
  {
    label: 'Home',
    link: '/',
    Icon: () => <HomeIcon />,
  },
  {
    label: 'Dashboard',
    link: '/dashboard',
    Icon: () => <DashboardIcon />,
  },
];

/**
 * Menu items shared by `University Training Officer` and `Company`
 */
const uniAndCompanySharedMenuItems: IAppMenuItem[] = [
  // {
  //     label: "Search Trainings",
  //     link: "/all-trainings",
  //     // Icon: () => <ManageSearchIcon/>,
  //     Icon: () => <RecentActorsIcon/>,
  // },
  // {
  //     label: "Add Student",
  //     link: "/add-student",
  //     Icon: () => <PersonAddAlt1Icon/>,
  // },
];

const uniTrainingOfficerMenuItems: IAppMenuItem[] = [
  {
    label: 'Requests',
    Icon: () => <PostAddIcon />,
    items: [
      {
        label: 'Training Request',
        link: '/training-request',
        Icon: () => <PostAddIcon />,
      },
      {
        label: 'Pending Requests',
        link: '/pending-requests',
        Icon: () => <PostAddIcon />,
      },
    ],
  },

  {
    label: 'Submitted Trainees',
    link: '/submitted-trainees',
    Icon: () => <GroupIcon />,
  },

  {
    label: 'Companies',
    link: '/add-company',
    Icon: () => <StoreIcon />,
  },

  {
    label: 'Trainees',
    Icon: () => <Groups3Icon />,
    items: [
      {
        label: 'Current',
        link: '/current-trainees',
        Icon: () => <PendingActionsIcon />,
      },
      {
        label: 'Completed',
        link: '/completed-trainees',
        Icon: () => <SchoolIcon />,
      },
    ],
  },
  {
    label: 'Search Trainings',
    link: '/all-trainings',
    // Icon: () => <ManageSearchIcon/>,
    Icon: () => <RecentActorsIcon />,
  },
  // ...uniAndCompanySharedMenuItems,
];

const companyMenuItems: IAppMenuItem[] = [
  {
    label: 'Training Requests',
    link: '/training-requests',
    Icon: () => <FormatListBulletedIcon />,
  },

  {
    label: 'Accepted Requests',
    link: '/accepted-requests',
    Icon: () => <FactCheckIcon />,
  },

  {
    label: 'Trainers',
    link: '/trainers',
    Icon: () => <Groups3Icon />,
  },
  {
    label: 'Trainees',
    Icon: () => <Groups3Icon />,
    items: [
      {
        label: 'Current',
        link: '/company-current-trainees',
        Icon: () => <PendingActionsIcon />,
      },
      {
        label: 'Completed',
        link: '/company-completed-trainees',
        Icon: () => <SchoolIcon />,
      },
    ],
  },
  {
    label: 'Edit Training',
    link: '/edit-training',
    Icon: () => <BorderColorIcon />,
  },
  {
    label: 'Search Trainings',
    link: '/company-all-trainings',
    // Icon: () => <ManageSearchIcon/>,
    Icon: () => <RecentActorsIcon />,
  },
  // ...uniAndCompanySharedMenuItems,
];

const trainerMenuItems: IAppMenuItem[] = [
    {
        label: "Evaluation Requests",
        link: "/evaluation-requests",
        Icon: () => <IntegrationInstructionsIcon/>,
    },
  {
    label: 'Trainees',
    Icon: () => <Groups3Icon />,
    items: [
      {
        label: 'Current',
        link: '/trainer-current-trainees',
        Icon: () => <PendingActionsIcon />,
      },
      {
        label: 'Finished 200 Hours',
        link: '/finished-200-hours',
        Icon: () => <SchoolIcon />,
      },
      {
        label: "Completed",
        link: "/trainer-completed-trainees",
        Icon: () => <FactCheckIcon/>,
    },
    ],
  },
 
  {
    label: 'Search Trainings',
    link: '/trainer-all-trainings',
    Icon: () => <RecentActorsIcon />,
  },
];

const studentMenuItems: IAppMenuItem[] = [
  {
      label: "All Trainings",
      link: "/all-training-student",
      Icon: () => <IntegrationInstructionsIcon/>,
  },
  
  {
    label:"Progress",
    link: "/Progress",
    Icon: () => <IntegrationInstructionsIcon/>,
    
      },

];

export const MENU_ITEMS_MAP: Partial<Record<MenuItemsMapKey, IAppMenuItem[]>> =
  {
    Public: publicMenuItems, // requires no authentication
    Shared: sharedMenuItems, // shared by all roles
    UniTrainingOfficer: uniTrainingOfficerMenuItems,
    Company: companyMenuItems,
    Trainer: trainerMenuItems,
    SuperAdmin: [],
    Student: studentMenuItems,
    AdminAndRegistration: [],
  };
