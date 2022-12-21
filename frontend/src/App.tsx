import './App.css';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Slideshows from './pages/Slideshows';
import Upload from './pages/Upload';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Slideshows />}></Route>
        <Route path="/upload" element={<Upload />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
