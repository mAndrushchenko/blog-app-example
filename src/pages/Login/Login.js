import LoginForm from './LoginForm';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export const Login = () => {

  return (
    <>
      <LoginForm/>
      <Box>
        <Typography>Have no account yet?</Typography>
        <Link to={'/registration'}><Typography>Register</Typography></Link>
      </Box>
    </>
  );
}
