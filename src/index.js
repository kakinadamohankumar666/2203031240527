import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UrlShortenerForm from './components/UrlShortenerForm';
import RedirectHandler from './pages/RedirectHandler';
import RegisterAndAuth from './components/RegisterAndAuth';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<UrlShortenerForm />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
        <Route path="/register" element={<RegisterAndAuth />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

