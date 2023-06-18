import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress, Box, Typography } from '@mui/material';
import { useAuthContext } from '../../context';
import { Loader } from '../../components';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulating network request
    setTimeout(() => {
      // Get the current list of users
      const currentUsers = JSON.parse(localStorage.getItem('users')) || [];

      // Check if email exists and password matches
      const existingUser = currentUsers.find(user => user.email === formData.email);
      if (existingUser && existingUser.password === formData.password) {
        setError(null);
        setIsLoading(false);
        navigate('/articles'); // Redirect to "/articles" if login is successful

        login({ email: existingUser.email, name: existingUser.name });

        return;
      }

      // If execution reaches here, it means login failed
      setError('Incorrect email or password');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <TextField
        name="email"
        label="Email"
        variant="outlined"
        required
        value={formData.email}
        onChange={handleChange}
        error={error}
      />
      <TextField
        name="password"
        type="password"
        label="Password"
        variant="outlined"
        required
        value={formData.password}
        onChange={handleChange}
        error={error}
        helperText={error}
      />
      {isLoading && <Loader />}

      <Button variant="contained" type="submit" disabled={isLoading}>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
