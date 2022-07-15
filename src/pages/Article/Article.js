import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Loader } from '../../components/Loader';
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { get, _delete } from '../../api/api-provider';
import { format } from 'date-fns';
import { useParams, useNavigate } from 'react-router-dom';
import { Toast } from '../../components/Toast';

export const Article = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { data, isError, isLoading } = useQuery('article', () => get(`/articles/${articleId}`));

  const [isShowToast, setIsShowToast] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Loader />;
  }

  const onDelete = () => {
    _delete(`/articles/${articleId}`)
      .then(res => {
        if (res.status === 204) {
          navigate('/articles');
        } else {
          setIsShowToast(true);
        }
      });
  };

  const onEdit = () => {
    navigate(`/edit-article/${articleId}`, { state: { data } })
  }

  return (
    <>
      <Grid container rowSpacing={5} columnSpacing={2}>
        <Grid item xs={12} sx={{ marginBottom: 4, display: 'flex', justifyContent: 'center' }}>
          <Card sx={{
            minWidth: 275,
            boxShadow: '0px 16px 30px rgb(0 0 0 / 10%)',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: '16px',
            maxWidth: 500,
          }}>
            <CardContent>
              {data?.title && <Typography variant="h2" sx={{ marginBottom: 2 }}>{data.title}</Typography>}

              <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'center',
                marginBottom: 4,
              }}>
                <Box>
                  {data?.created_at &&
                    <Typography variant="body1" sx={{ marginRight: { xs: undefined, md: 2 }, fontStyle: 'italic' }}>Created: {format(
                      new Date(data.created_at),
                      'dd/MM//yyyy hh:mm:ss a')}</Typography>}

                  {data?.updated_at &&
                    <Typography variant="body1" sx={{ fontStyle: 'italic' }}>Updated: {format(
                      new Date(data?.updated_at),
                      'dd/MM/yyyy hh:mm:ss a')}</Typography>}
                </Box>

              </Box>

              {data?.body && <Typography variant="subtitle1">{data.body}</Typography>}
            </CardContent>
            <CardActions sx={{
              display: 'flex',
              justifyContent: 'center',
            }}>
              <Button
                sx={{ marginX: 1, marginY: 1 }}
                variant="contained" size="large" color="warning" onClick={onEdit}>Edit Article</Button>
              <Button sx={{ marginX: 1, marginY: 1 }} variant="contained" size="large" color="error" onClick={onDelete}>Delete</Button>
            </CardActions>
          </Card>

        </Grid>
        <Grid item xs={12}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: { xs: 'column', md: 'row' },
          }}>

          </Box>

        </Grid>
      </Grid>
      <Toast status={isShowToast} type="error" message="Something went wrong" setStatus={setIsShowToast} />
    </>
  );
};