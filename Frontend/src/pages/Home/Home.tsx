import React, {FC} from 'react';
import Stack from "@mui/material/Stack";
import theme from "src/styling/customTheme";
import { Card, CardContent, Typography, makeStyles, Theme, Chip, Avatar } from '@mui/material';
import { Icon } from '@mui/material';
interface HomeProps {
}
const Home: FC<HomeProps> = (props) => {

    return (
        <Stack gap={2} sx={{
            height: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Typography variant="h1">
                Welcome 
            </Typography>
            <Chip
  avatar={<Avatar>A</Avatar>}
  label="Avatar"
  variant="outlined"
/>
            <Card sx={{ maxWidth: 300, margin: '0 auto' }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Icon sx={{ marginRight: 1 }}>star</Icon>
        <Typography variant="body1">
          This is a sample text inside the Card component.
        </Typography>
      </CardContent>
    </Card>
        </Stack>
    );
};

export default Home;
