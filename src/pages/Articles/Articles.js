import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Loader } from '../../components/Loader';
import { get } from '../../api/api-provider';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';
import { Toast } from '../../components/Toast';
import { addImagesToArray } from '../../utils';
import { posterImages } from '../../__mock__/article-images';
import { routes } from '../../constants';
import { CardArticle } from '../../components';

export const Articles = () => {
  const { data, isError, isLoading } = useQuery('articles', () => get('/articles'));
  const [isShowToast, setIsShowToast] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    setIsShowToast(true);
    return <Toast status={isShowToast} type="error" message="Something went wrong" setStatus={setIsShowToast} />;
  }

  const articlesWithImages = addImagesToArray(data, posterImages);

  return (
    <Container gutter={0} maxWidth={'md'}>
      <Typography variant="h2" sx={{ marginBottom: 5 }}>Articles</Typography>

      <Grid container rowSpacing={5} columnSpacing={4}>
        {articlesWithImages.map(({ id, created_at, updated_at, ...restArticleProps }) => (
          <Grid key={id} item xs={12} md={6}>
            <Link
              to={routes.ARTICLE.replace(':articleId', id)}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
            >
              <CardArticle dateCreated={created_at} dateUpdated={updated_at} {...restArticleProps} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
