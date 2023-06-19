import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './app/App';
import { ProviderAuth, ProviderTheme } from './context';

import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: Number(process.env.REACT_APP_STALE_TIME)
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProviderAuth>
        <ProviderTheme>
          <Router>
            <App />
          </Router>
        </ProviderTheme>
      </ProviderAuth>
    </QueryClientProvider>
  </React.StrictMode>,
);
