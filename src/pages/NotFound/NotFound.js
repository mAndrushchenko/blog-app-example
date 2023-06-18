import React from 'react';

import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from '../../constants';

export const NotFound = () =>  (
  <Box>
    <Typography variant="h5">
      Nothing was found :(
    </Typography>
    <Link to={routes.ARTICLES} style={{ color: 'inherit' }}>Back to articles</Link>
  </Box>
);
