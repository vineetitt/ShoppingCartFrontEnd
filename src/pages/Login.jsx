import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, TextField, Container, Typography, Box, Grid, Paper } from '@mui/material';
import { handleLogin } from '../api/LoginService';

const Login = ({ setIsLoggedIn }) => {
  const [Username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const navigate = useNavigate();

  const handleLoginForm = async (e) => {
    e.preventDefault();
    try {
      const response = await handleLogin(Username, password);
      const { token, userId } = response;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      setIsLoggedIn(true);
      toast.success('Login successful!');
      navigate('/Home');
    } catch (error) {
      setIsLoggedIn(false);
      toast.error('Invalid username or password!');

      
      setIsUsernameInvalid(true);
      setIsPasswordInvalid(true);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (isUsernameInvalid) {
      setIsUsernameInvalid(false); 
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (isPasswordInvalid) {
      setIsPasswordInvalid(false); 
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleLoginForm} noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              name="Username"
              autoComplete="Username"
              autoFocus
              value={Username}
              onChange={handleUsernameChange}
              error={isUsernameInvalid} 
              helperText={isUsernameInvalid ? 'Invalid username' : ''}
              sx={{ '& .MuiOutlinedInput-root.Mui-error': { borderColor: 'red' } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              error={isPasswordInvalid} 
              helperText={isPasswordInvalid ? 'Invalid password' : ''}
              sx={{ '& .MuiOutlinedInput-root.Mui-error': { borderColor: 'red' } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!Username || !password}
              sx={{ mt: 2, mb: 2 }}
            >
              Login
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signup" style={{ textDecoration: 'none', color: 'blue' }}>
                  Not a user? Register here
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
