import { Route, Routes, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { Articles } from '../pages/Articles';
import { CreateArticle } from '../pages/Create_article';
import { Drawer } from '../components/Drawer';
import { NotFound } from '../pages/NotFound';

import './App.css';
import { Article } from '../pages/Article';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Drawer>
        <Routes>
          <Route path="/" element={<Navigate replace to="/articles" />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:articleId" element={<Article />} />
          <Route path="/create-article" element={<CreateArticle />} />
          <Route path="/edit-article/:articleId" element={<CreateArticle />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Drawer>
    </div>
  );
}

export default App;
