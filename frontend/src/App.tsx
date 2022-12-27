import './App.css';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Slideshows from './pages/Slideshows';
import Upload from './pages/Upload';
import { useActiveUser } from './store/user';
import { useEffect } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback';

function App() {
  const { loadUser } = useActiveUser();

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Router>
      <Navigation />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path="/" element={<Slideshows />}></Route>
          <Route path="/upload" element={<Upload />}></Route>
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
