import React from 'react';
import { useQuery } from 'react-query';
import { Loader } from '../../components/Loader';
import { get } from '../../api/api-provider';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import { format } from 'date-fns';

export const Articles = () => {
  const navigate = useNavigate();
  const { data, isError, isLoading } = useQuery('articles', () => get('/articles'));

  if (isLoading) {
    return <Loader/>;
  }

  if (isError) {
    return <Loader/>;
  }

  const clickOnArticleHandler = (articleId) => {
    navigate(`/articles/${articleId}`);
  };

  return (
    <Grid container rowSpacing={5} columnSpacing={2}>
      <Grid item xs={12} sx={{ marginBottom: 4 }}>
        <Typography variant="h2" sx={{ marginBottom: 2 }}>Articles</Typography>
      </Grid>

      {
        data.map((article, index) => {
          return <Grid key={index} item xs={12} md={6} textAlign="left">
            <Card sx={{
              minWidth: 275,
              boxShadow: '0px 16px 30px rgb(0 0 0 / 10%)',
              border: '1px solid rgba(0, 0, 0, 0.12)',
              borderRadius: '16px',
            }}>
              <CardActionArea onClick={() => clickOnArticleHandler(article.id)}>
                <CardContent>
                  <Typography variant="h4" sx={{ marginBottom: 2 }}>{article.title}</Typography>

                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, marginBottom: 1 }}>
                    <Typography variant="body1"
                                sx={{ marginRight: { xs: undefined, lg: 2 }, fontStyle: 'italic' }}>Created: {format(
                      new Date(article.created_at),
                      'dd/MM//yyyy hh:mm:ss a')}</Typography>
                    <Typography variant="body1" sx={{ fontStyle: 'italic' }}>Updated: {format(
                      new Date(article.updated_at),
                      'dd/MM/yyyy hh:mm:ss a')}</Typography>
                  </Box>

                  <Typography variant="subtitle1">{article.body}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>;
        })
      }
    </Grid>
  );
};