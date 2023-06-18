import { Route, Routes, Navigate } from 'react-router-dom';

import './App.css';
import { Registration, Article, Articles, ArticleForm, Login, NotFound } from '../pages';
import { Header } from '../components';
import { useAuthContext } from '../context';
import { Container } from '@mui/material';
import { routes } from '../constants';

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
      <Header />
      <Container sx={{ mb: '104px' }}>
        <Routes>
          <Route path="/" element={<Navigate replace to={routes.ARTICLES} />} />
          <Route path={routes.ARTICLES} element={<Articles />} />
          <Route path={routes.ARTICLE} element={<Article />} />
          <Route
            path={routes.CREATE_ARTICLE}
            element={<RouteProtected redirectPath={routes.LOGIN} element={<ArticleForm />} />}
          />
          <Route path={routes.EDIT_ARTICLE} element={<ArticleForm />} />
          <Route
            path={routes.REGISTRATION}
            element={<RouteProtected isPublic element={<Registration />} />}
          />
          <Route
            path={routes.LOGIN}
            element={<RouteProtected isPublic element={<Login />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
