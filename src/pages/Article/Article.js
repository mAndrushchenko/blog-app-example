import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Button, Container, Typography, useMediaQuery } from '@mui/material';
import { format } from 'date-fns';

import { Loader, Toast } from '../../components';
import { get, _delete } from '../../api/api-provider';
import { posterImages } from '../../__mock__/article-images';
import { useTheme } from '@mui/material/styles';

export const Article = () => {
  const { articleId } = useParams();
  const [searchParams] = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();
  const {
    data,
    isError,
    isLoading
  } = useQuery('article', () => get(`/articles/${articleId}`));

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
    <Container maxWidth={'sm'}>
      {data?.title && <Typography variant="h4" sx={{ marginBottom: '32px' }}>{data.title}</Typography>}

      <Box width={'100%'} height={isMobile ? '224px' : '300px'} mb={'32px'}>
        <img
          src={posterImages[Number(searchParams.get('image')) % posterImages.length]}
          alt={data?.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
      </Box>

      {data?.body && <Typography>{data.body}</Typography>}

      <Box mt={'24px'}>
        {data?.created_at && (
          <Typography component="p" variant="caption" sx={{ marginRight: 2, fontStyle: 'italic' }}>
            Created: {format(new Date(data.created_at), 'dd/MM//yyyy hh:mm:ss a')}
          </Typography>
        )}

        {data?.updated_at && (
          <Typography component="p" variant="caption" sx={{ fontStyle: 'italic' }}>
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
