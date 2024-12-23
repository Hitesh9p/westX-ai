import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

function StatsCard({ stats }) {
  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Total Tweets</Typography>
          <Typography variant="h3">{stats.totalTweets}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Engagement Rate</Typography>
          <Typography variant="h3">{stats.engagement}%</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Scheduled Tweets</Typography>
          <Typography variant="h3">{stats.scheduledTweets}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default StatsCard;