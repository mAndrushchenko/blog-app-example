import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { post, put } from '../../api/api-provider';
import { Toast } from '../../components/Toast';
import { useParams, useLocation, useNavigate, useMatch } from 'react-router-dom';

export const ArticleForm = () => {
  const { articleId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const isCreateRoute = useMatch('/create-article');

  const [article, setArticle] = useState(state ? {
    title: state.data.title ?? '',
    body: state.data.body ?? '',
  } : {});

  useEffect(() => {
    if (!!isCreateRoute) {
      setArticle({});
    }

  }, [isCreateRoute]);

  const [isShowToast, setIsShowToast] = useState(false);
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState();

  const { title, body } = article;

  const isDisabled = !title || !body || isLoading;

  const onChangeHandler = (e) => {
    setArticle(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSave = () => {
    setIsLoading(true);
    post('/articles', article)
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          setMessage('Article created');
          setIsShowToast(true);
          setIsLoading(false);
          setArticle({});
          navigate(`/articles/${articleId}`);
        } else {
          setMessage('Something went wrong. Try again later');
          setErrors(res?.errors);
          setIsShowToast(true);
          setIsLoading(false);
        }
      });
  };

  const onEdit = () => {
    setIsLoading(true);
    put(`/articles/${articleId}`, article)
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          setMessage('Article updated');
          setIsShowToast(true);
          setIsLoading(false);
        } else {
          setMessage('Something went wrong. Try again later');
          setErrors(res?.errors);
          setIsShowToast(true);
          setIsLoading(false);

        }
      });
  };

  const onCancel = () => {
    navigate(`/articles/${articleId}`);
    setArticle({});
  };

  return (
    <Container maxWidth={'xs'}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>{articleId ? 'Edit' : 'Create'} Article</Typography>
      <TextField
        name="title"
        value={title}
        margin="dense"
        fullWidth id="outlined-basic"
        label="Title*"
        onChange={(e) => onChangeHandler(e)}
        variant="outlined" />

      <TextField
        margin="dense"
        fullWidth
        name="body"
        value={body}
        label="Main text*"
        onChange={(e) => onChangeHandler(e)}
        multiline
        maxRows={12}
        variant="outlined" />

      <Box mt={'24px'} display={'flex'} gap={'16px'}>
        <Button variant="contained" disabled={isDisabled} onClick={articleId ? onEdit : onSave}>Save</Button>
        {articleId && (<Button variant="outlined" color="error"  onClick={onCancel}>Cancel</Button>)}
      </Box>

      <Toast status={isShowToast} type={errors ? 'error' : 'success'} message={message} setStatus={setIsShowToast} />
    </Container>
  );
};
