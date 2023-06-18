import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';

export const Login = () => {

  return (
    <Container maxWidth={'xs'}>
      <LoginForm />
      <Box mt={'24px'} display={'flex'} gap={'8px'}>
        <Typography>Have no account yet? </Typography>
        <Link to={'/registration'}><Typography color={'primary.main'}>Register</Typography></Link>
      </Box>
    </Container>
  );
};
