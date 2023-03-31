import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
// import './ustyle.css';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import UNavbar from './UNavbar';

const drawerWidth = 240;

export default function SubmitRequest() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event: {
        currentTarget: React.SetStateAction<any>;
    }): void => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Grid container sx={{
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Paper
                sx={{padding: 4}}
                elevation={10}
            >
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            margin: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Submit Request
                        </Typography>
                        <form noValidate>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="s-number"
                                // type="number"
                                label="Student Number"
                                name="s-number"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="semester"
                                label="Semester"
                                name="semester"
                                select
                                autoFocus
                            >
                                <MenuItem value="semester-1">Semester One</MenuItem>
                                <MenuItem value="semester-2">Semester Two</MenuItem>
                                <MenuItem value="summer">Summer Semester</MenuItem>
                            </TextField>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="type"
                                label="Type"
                                name="type"
                                select
                                autoFocus
                            >
                                <MenuItem value="first">First</MenuItem>
                                <MenuItem value="second">Second</MenuItem>
                                <MenuItem value="compined">Compined</MenuItem>
                            </TextField>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="c-name"
                                label="Company Name"
                                select
                                name="c-name"
                                autoFocus
                            >
                                <MenuItem value="F">Foothill</MenuItem>
                                <MenuItem value="E">Exalt</MenuItem>
                                <MenuItem value="A">ASAL</MenuItem>
                            </TextField>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Submit
                            </Button>
                            <Grid container>
                                <Grid item xs></Grid>
                            </Grid>
                        </form>
                    </Box>
                </Container>
            </Paper>
        </Grid>
    );
}
