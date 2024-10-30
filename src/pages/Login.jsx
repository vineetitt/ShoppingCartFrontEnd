import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, TextField, Container, Typography, Box, Grid, Paper, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { handleLogin } from '../api/LoginService';

const Login = ({ setIsLoggedIn }) => {
  const [Username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
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
      if(error.status === 400){
        toast.error("User Not Found");
        setIsUsernameInvalid(true);
        setIsPasswordInvalid(true);
      }
      else{
        toast.error("Invalid Password or Email");
        setIsPasswordInvalid(true);
        setIsUsernameInvalid(true);
      }
      
    }
  };

  const resetErrorStates = ()=>{
    setIsUsernameInvalid(false);
    setIsPasswordInvalid(false);
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    resetErrorStates();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    resetErrorStates();
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword); 
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
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              error={isPasswordInvalid}
              helperText={isPasswordInvalid ? 'Invalid password' : ''}
              sx={{ '& .MuiOutlinedInput-root.Mui-error': { borderColor: 'red' } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      onClick={toggleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
