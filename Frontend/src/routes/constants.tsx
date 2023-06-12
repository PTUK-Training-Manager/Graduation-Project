import React from "react";
import {IAppMenuItem} from "src/routes/types";
import {UserRoleKey, MenuItemsMapKey} from "src/types";
// MUI icons
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import StoreIcon from '@mui/icons-material/Store';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
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
        label: "Landing",
        link: "/landing",
        Icon: () => <EmojiPeopleIcon/>,
    }
];

const sharedMenuItems: IAppMenuItem[] = [
    {
        label: "Home",
        link: "/me",
        Icon: () => <HomeIcon/>,
    },
    {
        label: "Dashboard",
        link: "/me/dashboard",
        Icon: () => <DashboardIcon/>,
    }
];

/**
 * Menu items shared by `University Training Officer` and `Company`
 */
const uniAndCompanySharedMenuItems: IAppMenuItem[] = [
    {
        label: "Search Trainings",
        link: "/me/all-trainings",
        // Icon: () => <ManageSearchIcon/>,
        Icon: () => <RecentActorsIcon/>,
    },
    {
        label: "Add Student",
        link: "/me/add-student",
        Icon: () => <PersonAddAlt1Icon/>,
    },
];

const uniTrainingOfficerMenuItems: IAppMenuItem[] = [
    {
        label: "Training Request",
        link: "/me/training-request",
        Icon: () => <PostAddIcon/>,
    },
    {
        label: "Company",
        Icon: () => <StoreIcon/>,
        items: [
            {
                label: "Add Company",
                link: "/me/add-company",
                // Icon: () => <AddBusinessIcon/>,
            },
            {
                label: "Add Branch",
                link: "/me/add-branch",
                // Icon: () => <DomainAddIcon/>,
            },
        ]
    },
    {
        label: "Trainees",
        Icon: () => <Groups3Icon/>,
        items: [
            {
                label: "Current",
                link: "/me/current-trainees",
                Icon: () => <PendingActionsIcon/>,
            },
            {
                label: "Completed",
                link: "/me/completed-trainees",
                Icon: () => <SchoolIcon/>,
            },
        ]
    },
    ...uniAndCompanySharedMenuItems,
];

const companyMenuItems: IAppMenuItem[] = [
    {
        label: "Accepted Requests",
        link: "/me/accepted-requests",
        Icon: () => <FactCheckIcon/>,
    },
    {
        label: "Training Requests",
        link: "/me/training-requests",
        Icon: () => <FormatListBulletedIcon/>,
    },
    {
        label: "Trainers",
        link: "/me/trainers",
        Icon: () => <Groups3Icon/>,
    },
    {
        label: "Edit Training",
        link: "/me/edit-training",
        Icon: () => <BorderColorIcon/>,
    },
    ...uniAndCompanySharedMenuItems,
];

const trainerMenuItems: IAppMenuItem[] = [
    {
        label: "Evaluation Requests",
        link: "/me/evaluation-requests",
        Icon: () => <IntegrationInstructionsIcon/>,
    },
    {
        label: "Completed Trainings",
        link: "/me/completed-trainings",
        Icon: () => <FactCheckIcon/>,
    }
];

export const MENU_ITEMS_MAP: Partial<Record<MenuItemsMapKey, IAppMenuItem[]>> = {
    Public: publicMenuItems, // requires no authentication
    Shared: sharedMenuItems, // shared by all roles
    UniTrainingOfficer: uniTrainingOfficerMenuItems,
    Company: companyMenuItems,
    Trainer: trainerMenuItems,
    SuperAdmin: [],
    Student: [],
    AdminAndRegistration: [],
}