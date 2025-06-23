import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { generateShortcode } from '../utils/urlUtils';
import { saveShortUrl } from '../utils/storage';
import Logger from './LoggerMiddleware';

const MAX_ROWS = 5;

const UrlShortenerForm = () => {
  const [rows, setRows] = useState([
    { longUrl: '', validity: '', shortcode: '', error: '' },
  ]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const addRow = () => {
    if (rows.length < MAX_ROWS) {
      setRows([...rows, { longUrl: '', validity: '', shortcode: '', error: '' }]);
    }
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = () => {
    const updatedResults = [];
    const updatedRows = rows.map((row) => {
      let error = '';
      if (!row.longUrl) error = 'URL is required';
      else if (!validateUrl(row.longUrl)) error = 'Invalid URL';
      else if (row.validity && isNaN(row.validity)) error = 'Validity must be a number';
      else if (row.shortcode && !/^[a-zA-Z0-9]+$/.test(row.shortcode)) error = 'Shortcode must be alphanumeric';

      if (error) return { ...row, error };

      const shortcode = row.shortcode || generateShortcode();
      const expiry = row.validity ? parseInt(row.validity) : 30;

      saveShortUrl(shortcode, row.longUrl, expiry);
      Logger.log('Short URL Created', { shortcode, longUrl: row.longUrl, expiry });

      updatedResults.push({
        shortcode,
        longUrl: row.longUrl,
        expiry: new Date(Date.now() + expiry * 60000).toLocaleString(),
      });

      return { longUrl: '', validity: '', shortcode: '', error: '' };
    });

    setRows(updatedRows);
    setResults([...results, ...updatedResults]);
  };

  return (
    <Box sx={{ maxWidth: 900, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        🔗 URL Shortener
      </Typography>

      {rows.map((row, index) => (
        <Paper key={index} sx={{ p: 2, my: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                label="Long URL"
                value={row.longUrl}
                onChange={(e) => handleChange(index, 'longUrl', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Validity (mins)"
                value={row.validity}
                onChange={(e) => handleChange(index, 'validity', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Custom Shortcode"
                value={row.shortcode}
                onChange={(e) => handleChange(index, 'shortcode', e.target.value)}
              />
            </Grid>
            {row.error && (
              <Grid item xs={12}>
                <Alert severity="error">{row.error}</Alert>
              </Grid>
            )}
          </Grid>
        </Paper>
      ))}

      <Box sx={{ textAlign: 'center', my: 2 }}>
        <Button variant="outlined" onClick={addRow} disabled={rows.length >= MAX_ROWS}>
          + Add Another URL
        </Button>
      </Box>

      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Button variant="contained" onClick={handleSubmit}>
          Shorten All URLs
        </Button>
      </Box>

      {results.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Shortened URLs:
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Original URL</TableCell>
                  <TableCell>Short URL</TableCell>
                  <TableCell>Expiry Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((res, i) => (
                  <TableRow key={i}>
                    <TableCell>{res.longUrl}</TableCell>
                    <TableCell>
                      <a href={`/${res.shortcode}`} target="_blank" rel="noreferrer">
                        http://localhost:3000/{res.shortcode}
                      </a>
                    </TableCell>
                    <TableCell>{res.expiry}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default UrlShortenerForm;


