import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootswatch/dist/journal/bootstrap.min.css';
import './index.css';
import App from './App';
import SelectedBucketProvider from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <SelectedBucketProvider>
      <App />
    </SelectedBucketProvider>
  </React.StrictMode>
);
