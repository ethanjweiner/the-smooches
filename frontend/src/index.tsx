import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootswatch/dist/journal/bootstrap.min.css';
import './index.css';
import App from './App';
import SelectedBucketProvider from './store/bucket';
import UserProvider from './store/user';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <SelectedBucketProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </SelectedBucketProvider>
  </React.StrictMode>
);
