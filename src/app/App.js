import { Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { Articles } from '../pages/Articles';
import { Drawer } from '../components/Drawer';
import { NotFound } from '../pages/NotFound';

import './App.css';
import { Article } from '../pages/Article';

function App () {
  return (
    <div className="App">
      <CssBaseline/>
      <Drawer>
        <Routes>
          <Route path="/articles" element={<Articles/>}/>
          <Route path="/articles/:articleId" element={<Article/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Drawer>
    </div>
  );
}

export default App;
