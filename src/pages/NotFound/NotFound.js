import React from 'react';

import { Box } from '@mui/material';

export const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 'calc(100vh - 30px * 2)',
        typography: 'h1',
      }}
    >
      Nothing was found
    </Box>
  );
};
