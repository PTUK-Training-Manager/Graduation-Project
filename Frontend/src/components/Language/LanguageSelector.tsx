import React, {MouseEvent, useEffect, useState} from 'react';
import {Box, MenuItem, Typography} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import Menu from '@mui/material/Menu';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import {amber} from "@mui/material/colors";
import {cyan, grey, pink} from "@mui/material/colors";

const LanguageSelector = () => {
    const languages = [
        {code: 'en', name: 'English', country_code: 'us'},
        {code: 'ar', name: 'العربية', country_code: 'sa', dir: 'rtl'},
    ];

    // @ts-ignore
    const {t} = useTranslation();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    const handleSelectLanguage = (code: string) => () => i18next.changeLanguage(code);

    useEffect(() => {
        document.body.dir = i18next.language === "ar" ? "rtl" : "ltr";
        document.title = t("Trainerize");
    }, [t]);

    return (
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Tooltip title="Change Language">
                <IconButton
                    onClick={handleClick}
                    // size="small"
                    // sx={{ ml: 2 }}
                    aria-controls={open ? "language-selector-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    {/*<LanguageIcon sx={{color: 'white'}}/>*/}
                    <Avatar sx={{ bgcolor: pink[500] }}>
                        <LanguageIcon sx={{color: 'white'}}/>
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                id="language-selector-menu"
                // IconComponent={LanguageIcon}
                // onChange={handleClick}
                onClose={handleClose}
                onClick={handleClose}
                defaultValue={i18next.language}
                sx={{color: 'white'}}
                transformOrigin={{horizontal: 'left', vertical: 'top'}}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            >
                {languages.map(({code, name, country_code}) => (
                    <MenuItem
                        key={country_code}
                        value={code}
                        onClick={handleSelectLanguage(code)}
                        // onClick={(event) => onSelectLanguage(event)}
                        // onClick={onSelectLanguage}
                    >
                        <Typography>{name}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default LanguageSelector;
