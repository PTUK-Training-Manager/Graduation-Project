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
import { signIn } from './api';
import useAuth from 'src/hooks/useAuth';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const SignIn: React.FC= () => {

  const { setAuth } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/landing';

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  if (userRef.current) {
    userRef.current.focus();
  }
}, []);


  // useEffect(() => {
  //   setErrMsg('');
  // }, [username, password]);
  useEffect(() => {
    if (!formSubmitted) {
      setErrMsg('');
    }
  }, [username,password,formSubmitted]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!username || !password) {
      setUsername('');
      setPassword('');
      setErrMsg('Please enter both username and password');
      // clear error message when user starts typing again
      setTimeout(() => setErrMsg(''), 1500);
      return;
    }
    setUsername('');
    setPassword('');
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      password: data.get('password'),
    });
    signIn({
      username: data.get('username') as string,
      password: data.get('password') as string,
    }).then((res) => {
      console.log(res);
      const accessToken = res?.tokenData;
      const role = res?.tokenData.roleId;
      setAuth({ username, password, role, accessToken });
      navigate(from, { replace: true });

      }).catch((err) => {
       if (err) {
          setErrMsg("! Invalid login, please try again");
      } 
      errRef.current?.focus();
    });
  };

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper sx={{ padding: 4 }} elevation={10}>
      <Box sx={{justifyContent:"center",textAlign:"center",color:"red"}} ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</Box>

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
              <form onSubmit={handleSubmit} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  ref={userRef}
                  label="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
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
                      href="Frontend/src/components/company#"
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
    </Grid>
  );
};

export default SignIn;
