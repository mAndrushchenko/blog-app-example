import React, { useState } from 'react';
import { Loader } from '../../components/Loader';
import { Box, Button, TextField, Grid, Typography } from '@mui/material';
import { post } from '../../api/api-provider';
import { useNavigate } from 'react-router-dom';


export const CreateArticle = () => {
  const navigate = useNavigate();

  const [article, setArticle] = useState({});
  const { title, body } = article;

  const isDisabled = !title || !body;

  const onChangeHandler = (e) => {
    setArticle(prev => ({ ...prev, [e.target.name]: e.target.value }))
  };

  const onCreate = () => {
    post('/articles', article)
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          alert("Article created");
          navigate('/articles');
          setArticle({});
        } else {
          alert("Comething went wrong");
        }
      });
  }
  return (
    <Grid container rowSpacing={5} columnSpacing={2}>
      <Grid align="center" item xs={12} sx={{ marginBottom: 4 }}>
        <Typography variant="h2" sx={{ marginBottom: 2 }}>Create Article</Typography>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          justifySelf: 'center',
          alignItems: 'center',
          marginBottom: 4,
          maxWidth: 500,
        }}>

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

        </Box>

        <Button variant="contained" size="large" disabled={isDisabled} onClick={onCreate} >Create Article</Button>

      </Grid>
    </Grid>
  );
};