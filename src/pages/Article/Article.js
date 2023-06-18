import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Loader } from '../../components/Loader';
import { Box, Button, Container, Typography } from '@mui/material';
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
    navigate(`/edit-article/${articleId}`, { state: { data } });
  };

  return (
    <Container maxWidth={'md'}>
      {data?.title && <Typography variant="h4" sx={{ marginBottom: 2 }}>{data.title}</Typography>}

      {data?.body && <Typography>{data.body}</Typography>}

      <Box mt={'24px'}>
        {data?.created_at && (
          <Typography component='p' variant="caption" sx={{ marginRight: 2, fontStyle: 'italic' }}>
            Created: {format(new Date(data.created_at), 'dd/MM//yyyy hh:mm:ss a')}
          </Typography>
        )}

        {data?.updated_at && (
          <Typography component='p' variant="caption" sx={{ fontStyle: 'italic' }}>
            Updated: {format(new Date(data?.updated_at), 'dd/MM/yyyy hh:mm:ss a')}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', gap: '16px', mt: '32px' }}>
        <Button variant="contained" onClick={onEdit}>Edit Article</Button>
        <Button variant="outlined" color="error" onClick={onDelete}>Delete</Button>
      </Box>
      <Toast status={isShowToast} type="error" message="Something went wrong" setStatus={setIsShowToast} />
    </Container>
  );
};
