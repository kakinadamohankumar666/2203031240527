import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert
} from '@mui/material';
import axios from 'axios';

const REGISTER_URL = 'http://20.244.56.144/evaluation-service/register';
const AUTH_URL = 'http://20.244.56.144/evaluation-service/auth';

const RegisterAndAuth = () => {
  const [form, setForm] = useState({
    email: '',
    name: '',
    mobileNo: '',
    githubUsername: '',
    rollNo: '',
    collegeName: '',
    accessCode: ''
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post(REGISTER_URL, form);
      const { clientID, clientSecret } = res.data;

      localStorage.setItem('clientID', clientID);
      localStorage.setItem('clientSecret', clientSecret);
      setMessage('✅ Registered successfully. Now getting access token...');
      await getToken(clientID, clientSecret);
    } catch (err) {
      setError('❌ Registration failed. Maybe already registered?');
    }
  };

  const getToken = async (clientID, clientSecret) => {
    try {
      const authRes = await axios.post(AUTH_URL, {
        ...form,
        clientID,
        clientSecret
      });

      localStorage.setItem('accessToken', authRes.data.access_token);
      setToken(authRes.data.access_token);
      setMessage('✅ Access token retrieved and stored. Ready to use protected APIs.');
    } catch (err) {
      setError('❌ Failed to get token. Check credentials or try again.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>🎓 Registration & Auth</Typography>

        {['email', 'name', 'mobileNo', 'githubUsername', 'rollNo', 'collegeName', 'accessCode'].map((field) => (
          <TextField
            key={field}
            name={field}
            label={field.replace(/([A-Z])/g, ' $1')}
            value={form[field]}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        ))}

        <Button variant="contained" fullWidth onClick={handleRegister}>
          Submit & Get Token
        </Button>

        {message && <Alert sx={{ mt: 2 }} severity="success">{message}</Alert>}
        {error && <Alert sx={{ mt: 2 }} severity="error">{error}</Alert>}
        {token && <Alert sx={{ mt: 2 }} severity="info">Token (partial): {token.slice(0, 20)}...</Alert>}
      </Paper>
    </Box>
  );
};

export default RegisterAndAuth;
