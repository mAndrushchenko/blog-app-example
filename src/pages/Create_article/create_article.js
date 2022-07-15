import React, { useState } from 'react';
import { Box, Button, Card, CardContent, CardActions, TextField, Grid, Typography } from '@mui/material';
import { post } from '../../api/api-provider';
import { Toast } from '../../components/Toast';

export const CreateArticle = () => {

  const [article, setArticle] = useState({});
  const [isShowToast, setIsShowToast] = useState(false);
  const [message, setMessage] = useState();
  const [errors, setErrors] = useState();
  const { title, body } = article;

  const isDisabled = !title || !body;



  const onChangeHandler = (e) => {
    setArticle(prev => ({ ...prev, [e.target.name]: e.target.value }))
  };

  const onCreate = () => {
    post('/articles', article)
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          setMessage('Article created');
          setIsShowToast(true);
          setArticle({});
        } else {
          setMessage('Something went wrong. Try again later');
          setErrors(res?.errors);
          setIsShowToast(true);

        }
      });
  }
  return (
    <>
      <Grid container rowSpacing={5} columnSpacing={2}>
        <Grid align="center" item xs={12} sx={{ marginBottom: 4 }}>


          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            justifySelf: 'center',
            alignItems: 'center',
            marginBottom: 4,
            maxWidth: 500,
          }}>
            <Card sx={{
              minWidth: 275,
              boxShadow: '0px 16px 30px rgb(0 0 0 / 10%)',
              border: '1px solid rgba(0, 0, 0, 0.12)',
              borderRadius: '16px',
              maxWidth: 500,
            }}>
              <CardContent>
                <Typography variant="h2" sx={{ marginBottom: 2 }}>Create Article</Typography>
                <TextField
                  name='title'
                  value={title || ""}
                  margin="dense"
                  fullWidth id="outlined-basic"
                  label="Title*"
                  onChange={(e) => onChangeHandler(e)}
                  variant="outlined" />

                <TextField
                  margin="dense"
                  fullWidth
                  name='body'
                  value={body || ""}
                  label="Main text*"
                  onChange={(e) => onChangeHandler(e)}
                  multiline
                  maxRows={12}
                  variant="outlined" />
              </CardContent>
              <CardActions sx={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 2,
              }}>
                <Button variant="contained" size="large" disabled={isDisabled} onClick={onCreate} >Create Article</Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
      </Grid>
      <Toast status={isShowToast} type={errors ? 'error' : 'success'} message={message} setStatus={setIsShowToast} />
    </>
  );
};