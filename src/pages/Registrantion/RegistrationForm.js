import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useAuthContext } from '../../context';
import { Box, FormControl, FormLabel } from '@mui/material';
import { Loader } from '../../components';
import { auth } from '../../constants';

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    gender: 'male',
  });
  const { login } = useAuthContext();

  const handleChange = (e) => {
    setError(null);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name.length < 3) {
      setError((prev) => ({ ...prev, name: 'Please, write your full name' }));
      return;
    }

    // Validate the email format
    if (!formData.email.match(auth.EMAIL_REGEXP)) {
      setError((prev) => ({ ...prev, email: 'Invalid email format' }));

      return;
    }

    // Check if password length is less than 8
    if (formData.password.length < 8) {
      setError((prev) => ({ ...prev, password: 'Password should be at least 8 characters long' }));
      return;
    }

    setError(null);
    setIsLoading(true);

    // Simulating network request
    setTimeout(() => {
      // Get the current list of users
      const currentUsers = JSON.parse(localStorage.getItem('users')) || [];

      // Check if email already exists
      const existingUser = currentUsers.find(user => user.email === formData.email);
      if (existingUser) {
        setError((prev) => ({ ...prev, email: 'A user with this email already exists' }));
        setIsLoading(false);
        return;
      }

      // Add new user to the array
      currentUsers.push(formData);
      login({ email: formData.email, name: formData.name });
      // Save updated user array back to localStorage
      localStorage.setItem('users', JSON.stringify(currentUsers));

      setError(null);
      setIsLoading(false);

      navigate('/articles'); // Assuming you have a "welcome" route that user should be redirected to
    }, 2000);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <TextField
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        error={error?.name}
        required
        helperText={error?.name}
      />
      <TextField
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        error={error?.email}
        helperText={error?.email}
        required
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        error={error?.password}
        helperText={error?.password}
      />
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          row
          onChange={handleChange}
          aria-labelledby="demo-radio-buttons-group-label"
          value={formData.gender}
          name="gender"
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
      <Box mt={'16px'}>
        <Button type="submit" disabled={isLoading} variant="contained" fullWidth>
          Register
        </Button>
      </Box>

      {isLoading && <Loader />}
    </Box>
  );
};
