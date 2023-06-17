import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuthContext } from '../../context';

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if password length is less than 8
    if (formData.password.length < 8) {
      setError("Password should be at least 8 characters long");
      return;
    }

    // Validate the email format
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (!formData.email.match(emailRegex)) {
      setError("Invalid email format");
      return;
    }

    setIsLoading(true);

    // Simulating network request
    setTimeout(() => {
      // Get the current list of users
      const currentUsers = JSON.parse(localStorage.getItem('users')) || [];

      // Check if email already exists
      const existingUser = currentUsers.find(user => user.email === formData.email);
      if (existingUser) {
        setError("A user with this email already exists");
        setIsLoading(false);
        return;
      }

      // Add new user to the array
      currentUsers.push(formData);
      login({ email: formData.email, name: formData.name })
      // Save updated user array back to localStorage
      localStorage.setItem('users', JSON.stringify(currentUsers));

      setError(null);
      setIsLoading(false);

      navigate('/articles'); // Assuming you have a "welcome" route that user should be redirected to
    }, 2000);
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <TextField name="email" label="Email" value={formData.email} onChange={handleChange} required />
        <TextField name="password" label="Password" type="password" value={formData.password} onChange={handleChange} required />
        <TextField name="name" label="Name" value={formData.name} onChange={handleChange} required />
        <RadioGroup name="gender" value={formData.gender} onChange={handleChange}>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Register'}
        </Button>
      </form>
    </div>
  );
};
