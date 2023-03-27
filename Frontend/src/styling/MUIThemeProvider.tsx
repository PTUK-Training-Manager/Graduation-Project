import React, {FC, PropsWithChildren} from 'react';
import {ThemeProvider, useTheme} from '@mui/material/styles';
import customTheme from "./customTheme";

interface MUIThemeProviderProps {
}

const MUIThemeProvider: FC<PropsWithChildren<MUIThemeProviderProps>> = ({children}) => {
    
    return (
        <ThemeProvider theme={customTheme}>
            {children}
        </ThemeProvider>
    );
};

export default MUIThemeProvider;
