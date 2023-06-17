import { Route, Routes, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import './App.css';
import { Registration, Article, Articles, ArticleForm, Login, NotFound } from '../pages';
import { Drawer } from '../components';
import { useAuthContext } from '../context';

const RouteProtected = ({ element, redirectPath, isPublic }) => {
  const { isLogged } = useAuthContext();

  if ((isLogged && isPublic) || !(isLogged || isPublic)) {
    return <Navigate to={redirectPath ?? '/articles'} />;
  }

  return element;
};

function App () {
  return (
    <div className="App">
      <CssBaseline />
      <Drawer>
        <Routes>
          <Route path="/" element={<Navigate replace to="/articles" />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:articleId" element={<Article />} />
          <Route
            path="/create-article"
            element={<RouteProtected redirectPath={'/login'} element={<ArticleForm />} />}
          />
          <Route path="/edit-article/:articleId" element={<ArticleForm />} />
          <Route
            path="/registration"
            element={<RouteProtected isPublic element={<Registration />} />}
          />
          <Route
            path="/login"
            element={<RouteProtected isPublic element={<Login />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Drawer>
    </div>
  );
}

export default App;
