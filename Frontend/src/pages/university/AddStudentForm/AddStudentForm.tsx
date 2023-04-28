import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { NAVBAR_HEIGHT } from 'src/constants';

import useAccountContext from 'src/hooks/useAccountContext';

const AddStudentForm: React.FC = () => {
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

    const {isSidebarOpen} = useAccountContext();


    return (
        <Grid
            container
            sx={{
                justifyContent: "center",
                alignItems: "center",
                height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
            }}
        >
            <Paper
                sx={{padding:4}}>
                <Box>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
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
                                Add Student
                            </Typography>
                            <form noValidate>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="s-number"
                                    label="Student Number"
                                    name="s-number"
                                    autoFocus
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    endIcon={<PersonAddIcon />}
                                >
                                    ADD
                                </Button>
                                <Grid container>
                                    <Grid item xs></Grid>
                                </Grid>
                            </form>
                        </Box>
                    </Container>
                </Box>
            </Paper>
        </Grid>
    );
}

export default AddStudentForm;