import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, TextField, Container, Typography, Box, Paper } from '@mui/material';
import handleSignupform from '../api/signUpService';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      const response = await handleSignupform(username, email, password);
      if (response.status === 200) {
        toast.success('Signup successful! Please log in.');
      } else {
        toast.error('Signup failed. Please try again.');
      }
    } catch (error) {
      if(error.status === 400){
        var jsonError = error.response.data;
        if (jsonError.errors == null) toast.error(jsonError.toString());
        for (var err in jsonError.errors) {
            toast.error(jsonError.errors[err][0]);
        }
      }
      else{
        toast.error(error.response.data);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">Sign Up</Typography>
          <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
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
