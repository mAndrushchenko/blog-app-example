import React from 'react';
import { useQuery } from 'react-query';
import { Loader } from '../../components/Loader';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { get } from '../../api/api-provider';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';

export const Article = () => {
  const { articleId } = useParams();
  const { data, error, isError, isLoading } = useQuery('article', () => get(`/articles/${articleId}`));

  if (isLoading) {
    return <Loader/>;
  }

  if (isError) {
    return <Loader/>;
  }

  const clickOnArticleHandler = () => {
    debugger
  };

  return (
    <Grid container rowSpacing={5} columnSpacing={2}>
      <Grid item xs={12} sx={{ marginBottom: 4 }}>
        {data?.title && <Typography variant="h2" sx={{ marginBottom: 2 }}>{data.title}</Typography>}

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          marginBottom: 4,
        }}>
          {data?.created_at &&
            <Typography variant="body1" sx={{ marginRight: { xs: undefined, md: 2 }, fontStyle: 'italic' }}>Created: {format(
              new Date(data.created_at),
              'dd/MM//yyyy hh:mm:ss a')}</Typography>}

          {data?.updated_at &&
            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>Updated: {format(
              new Date(data?.updated_at),
              'dd/MM/yyyy hh:mm:ss a')}</Typography>}
        </Box>

        {data?.body && <Typography variant="subtitle1">{data.body}</Typography>}
      </Grid>
    </Grid>
  );
};