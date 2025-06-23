import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUrl } from '../utils/storage';
import Logger from '../components/LoggerMiddleware';

function RedirectHandler() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const longUrl = getUrl(shortcode);
    if (longUrl) {
      Logger.log('Redirecting', { shortcode, longUrl });
      window.location.href = longUrl;
    } else {
      alert('URL not found or expired');
      navigate('/');
    }
  }, [shortcode, navigate]);

  return <p>Redirecting...</p>;
}

export default RedirectHandler;
