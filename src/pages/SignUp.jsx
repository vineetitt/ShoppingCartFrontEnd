import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, Container, Typography, Box, Paper, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import handleSignupform from '../api/signUpService';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] = useState(false);
  const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    
    if (password !== confirmPassword) {
      setPasswordsDoNotMatch(true); 
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await handleSignupform(username, email, password);
      if (response.status === 200) {
        toast.success('Signup successful! Please log in.');
        navigate('/login');
      } else {
        toast.error('Signup failed. Please try again.');
      }
    } catch (error) {
      if (error.status === 400) {
        
        const jsonError = error.response.data;
        if (jsonError.errors == null) toast.error(jsonError.toString());
        if(typeof(jsonError)==="string"){
          setIsUsernameInvalid(true);
        }
        else{

          for (const err in jsonError.errors) {
            jsonError.errors[err].map((i)=>{
              toast.error(i)
            });
            if(err.includes("Email")){
              setIsEmailInvalid(true)
            }
            else if(err.includes("Pass")){
              setIsPasswordInvalid(true)
              setIsConfirmPasswordInvalid(true);
            }
          }
        }
      } else {
        toast.error(error.response.data);
      }

    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (isUsernameInvalid) setIsUsernameInvalid(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (isEmailInvalid) setIsEmailInvalid(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordsDoNotMatch || isPasswordInvalid) {
      setPasswordsDoNotMatch(false); 
      setIsPasswordInvalid(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (passwordsDoNotMatch || isConfirmPasswordInvalid) {
      setPasswordsDoNotMatch(false); 
      setIsConfirmPasswordInvalid(false);
    }
    
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="off"
              autoFocus
              value={username}
              onChange={handleUsernameChange}
              error={isUsernameInvalid}
              helperText={isUsernameInvalid ? 'Invalid username' : ''}
              sx={{ '& .MuiOutlinedInput-root.Mui-error': { borderColor: 'red' } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              value={email}
              onChange={handleEmailChange}
              error={isEmailInvalid}
              helperText={isEmailInvalid ? 'Invalid email' : ''}
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
              autoComplete="new-password"
              value={password}
              onChange={handlePasswordChange}
              error={isPasswordInvalid}
              helperText={isPasswordInvalid ? 'Invalid password' : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root.Mui-error': { borderColor: 'red' } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={passwordsDoNotMatch || isConfirmPasswordInvalid}
              helperText={passwordsDoNotMatch ? 'Passwords do not match' : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleConfirmPasswordVisibility}>
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root.Mui-error': { borderColor: 'red' } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              disabled={!password || !email || !username || !confirmPassword}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
