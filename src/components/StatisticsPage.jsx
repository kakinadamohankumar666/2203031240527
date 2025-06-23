import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StatisticsPage = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('shortUrls') || '{}');
    const allStats = Object.entries(stored).map(([shortcode, data]) => {
      return {
        shortcode,
        ...data
      };
    });
    setStats(allStats);
  }, []);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        📊 Link Statistics
      </Typography>

      {stats.length === 0 ? (
        <Typography>No data found. Create some short links first.</Typography>
      ) : (
        stats.map((stat, i) => (
          <Paper key={i} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6">
              🔗 Short URL: <a href={`/${stat.shortcode}`} target="_blank" rel="noreferrer">
                http://localhost:3000/{stat.shortcode}
              </a>
            </Typography>
            <Typography>🌐 Original URL: {stat.longUrl}</Typography>
            <Typography>📅 Created At: {new Date(stat.createdAt).toLocaleString()}</Typography>
            <Typography>⏳ Expires At: {new Date(stat.expiryAt).toLocaleString()}</Typography>
            <Typography>👁️ Clicks: {stat.clicks?.length || 0}</Typography>

            {stat.clicks?.length > 0 && (
              <Accordion sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Click Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>⏱️ Time</TableCell>
                          <TableCell>🌐 Referrer</TableCell>
                          <TableCell>📍 Location</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {stat.clicks.map((click, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{new Date(click.timestamp).toLocaleString()}</TableCell>
                            <TableCell>{click.referrer}</TableCell>
                            <TableCell>{click.location}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            )}
          </Paper>
        ))
      )}
    </Box>
  );
};

export default StatisticsPage;
