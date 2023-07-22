
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FC } from 'react';
interface DashboardProps {
}

const Dashboard: FC<DashboardProps> = (props) => {

    return (
        // <Stack gap={2} sx={{
        //     height: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
        //     justifyContent: "center",
        //     alignItems: "center",
        // }}>
        //     <Typography variant="h1">
        //         Dashboard
        //     </Typography>
        //     <Typography variant="h5">
        //         Not implemented yet...
        //     </Typography>
        // </Stack>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Basic date picker" />
      </DemoContainer>
    </LocalizationProvider>
    );
};

export default Dashboard;
