import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Paper } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Grid from '@mui/material/Grid';
import Joi from 'joi';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Gnavbar from './Gnavbar';

interface User {
  email: string;
  password: string;
  [key: string]: string; // index signature
}

interface ValidationError {
  message: string;
  path: (string | number)[];
  type: string;
}

export default function SignIn() {
  // const navigate = useNavigate();
  const [errorList, setErrorList] = useState<ValidationError[]>([]);
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
  });

  function getUserData(e: React.ChangeEvent<HTMLInputElement>) {
    const myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  async function submitRegister(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    const result = validationReg(user);
    if (result.error) {
      console.log(result.error);
      setErrorList(
        result.error.details.map((err) => ({
          message: err.message,
          path: err.path.map(String),
          type: err.type,
        }))
      );
    } else {
      const { data } = await axios.post('', user);
      if (data.message === 'success') {
        localStorage.setItem('userToken', data.token);
        // navigate('./login');
      }
    }
  }

  function validationReg(user: User): Joi.ValidationResult {
    const schema = Joi.object({
      name: Joi.string().min(4).max(20).required(),
      password: Joi.string()
        .required()
        .pattern(/[A-Z][a-z]{3,8}/)
        .message('Invalid password pattern or empty password'),
    });
    return schema.validate(user);
  }

  return (
    <>
      {errorList &&
        errorList.map((err, index) => (
          <div key={index} className="alert alert-danger">
            {err.message}
          </div>
        ))}
      <Gnavbar />
      <Box sx={{ display: 'flex' }}>
        <Paper
          sx={{ padding: '32px', margin: '55 auto', marginTop: '10%' }}
          elevation={10}
        >
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
                <Avatar
                  sx={{
                    m: 1,
                    bgcolor: 'secondary.main',
                    backgroundColor: '#30ADD1 ',
                  }}
                >
                  <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form onSubmit={submitRegister}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    onChange={getUserData}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    onChange={getUserData}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link
                        href="#"
                        variant="body2"
                        sx={{ textAlign: 'center' }}
                      >
                        Forgotten your username or password?
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Container>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
