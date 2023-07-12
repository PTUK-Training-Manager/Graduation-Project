import React from 'react';
import {IAppMenuItem} from 'src/routes/types';
import {UserRoleKey, MenuItemsMapKey} from 'src/types';
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
        Icon: () => <EmojiPeopleIcon/>,
    },
];

const sharedMenuItems: IAppMenuItem[] = [
    {
        label: 'Home',
        link: '/me',
        Icon: () => <HomeIcon/>,
    },
    {
        label: 'Dashboard',
        link: '/me/dashboard',
        Icon: () => <DashboardIcon/>,
    },
];


const uniTrainingOfficerMenuItems: IAppMenuItem[] = [
    {
        label: 'Requests',
        Icon: () => <PostAddIcon/>,
        items: [
            {
                label: 'Training Request',
                link: '/me/training-request',
                Icon: () => <PostAddIcon/>,
            },
            {
                label: 'Pending Requests',
                link: '/me/pending-requests',
                Icon: () => <PostAddIcon/>,
            },
        ],
    },

    {
        label: 'Submitted Trainees',
        link: '/me/submitted-trainees',
        Icon: () => <GroupIcon/>,
    },

    {
        label: 'Companies',
        link: '/me/companies',
        Icon: () => <StoreIcon/>,
    },

    {
        label: 'Trainees',
        Icon: () => <Groups3Icon/>,
        items: [
            {
                label: 'Current',
                link: '/me/current-trainees',
                Icon: () => <PendingActionsIcon/>,
            },
            {
                label: 'Completed',
                link: '/me/completed-trainees',
                Icon: () => <SchoolIcon/>,
            },
            //   {
            //     label: "CurrentV2",
            //     link: "/current-trainees-v2",
            //     Icon: () => <PendingActionsIcon/>,
            // },
        ],
    },
    {
        label: 'Search Trainings',
        link: '/me/all-trainings',
        Icon: () => <RecentActorsIcon/>,
    },
    {
        label: "Charts",
        link: "/me/charts",
        Icon: () => <BarChartIcon/>,
    }
];

const companyMenuItems: IAppMenuItem[] = [
    {
        label: 'Training Requests',
        link: '/me/training-requests',
        Icon: () => <FormatListBulletedIcon/>,
    },

    {
        label: 'Accepted Requests',
        link: '/me/accepted-requests',
        Icon: () => <FactCheckIcon/>,
    },

    {
        label: 'Trainers',
        link: '/me/trainers',
        Icon: () => <Groups3Icon/>,
    },
    {
        label: 'Trainees',
        Icon: () => <Groups3Icon/>,
        items: [
            {
                label: 'Current',
                link: '/me/company-current-trainees',
                Icon: () => <PendingActionsIcon/>,
            },
            {
                label: 'Completed',
                link: '/me/company-completed-trainees',
                Icon: () => <SchoolIcon/>,
            },
        ],
    },
    {
        label: 'Edit Training',
        link: '/me/edit-training',
        Icon: () => <BorderColorIcon/>,
    },
    {
        label: 'Search Trainings',
        link: '/me/company-all-trainings',
        Icon: () => <RecentActorsIcon/>,
    },
];

const trainerMenuItems: IAppMenuItem[] = [
    {
        label: "Evaluation Requests",
        link: "/me/evaluation-requests",
        Icon: () => <IntegrationInstructionsIcon/>,
    },
    {
        label: 'Trainees',
        Icon: () => <Groups3Icon/>,
        items: [
            {
                label: 'Current',
                link: '/me/trainer-current-trainees',
                Icon: () => <PendingActionsIcon/>,
            },
            {
                label: 'Finished Required Hours',
                link: '/me/finished-200-hours',
                Icon: () => <SchoolIcon/>,
            },
            {
                label: "Completed",
                link: "/me/trainer-completed-trainees",
                Icon: () => <FactCheckIcon/>,
            },
        ],
    },

    {
        label: 'Search Trainings',
        link: '/me/trainer-all-trainings',
        Icon: () => <RecentActorsIcon/>,
    },
];

const studentMenuItems: IAppMenuItem[] = [
    {
        label: "All Trainings",
        link: "/me/all-training-student",
        Icon: () => <IntegrationInstructionsIcon/>,
    },

    {
        label: "Progress",
        link: "/me/Progress",
        Icon: () => <IntegrationInstructionsIcon/>,

    },

];
const AdminMenuItems: IAppMenuItem[] = [
    {
        label: "Admin Processes",
        link: "/me/add-faculty",
        Icon: () => <IntegrationInstructionsIcon/>,
    },
    {
        label: "Charts",
        link: "/me/charts",
        Icon: () => <IntegrationInstructionsIcon/>,
    },
    {
        label: 'Charts',
        link: '/submitted-trainees',
        Icon: () => <BarChartIcon />,
    },
];

export const MENU_ITEMS_MAP: Partial<Record<MenuItemsMapKey, IAppMenuItem[]>> =
    {
        Public: publicMenuItems, // requires no authentication
        Shared: sharedMenuItems, // shared by all roles
        UniTrainingOfficer: uniTrainingOfficerMenuItems,
        Company: companyMenuItems,
        Trainer: trainerMenuItems,
        SuperAdmin: AdminMenuItems,
        Student: studentMenuItems,
        AdminAndRegistration: [],
    };