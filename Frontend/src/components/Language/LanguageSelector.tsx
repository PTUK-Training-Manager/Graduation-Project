import React, { useEffect } from 'react';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import i18next from 'i18next';
import { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const languages = [
    { code: 'en', name: 'English', country_code: 'us' },
    { code: 'ar', name: 'العربية', country_code: 'sa', dir: 'rtl' },
  ];
  const { t } = useTranslation()

  const handleLanguageChange = (code: string) => {
    i18next.changeLanguage(code);
  };

  const handleClick = (event: SelectChangeEvent<string>) => {
    const selectedCode = event.target.value;
    handleLanguageChange(selectedCode);
  };

  useEffect(() => {
    console.log('Setting page stuff');
    document.body.dir = i18next.language === 'ar' ? 'rtl' : 'ltr';
    document.title = t('app_title');
  }, [t]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        IconComponent={LanguageIcon}
        onChange={handleClick}
        defaultValue={i18next.language}
      >
        {languages.map(({ code, name, country_code }) => (
          <MenuItem key={country_code} value={code}>
            <Typography>{name}</Typography>
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default LanguageSelector;
