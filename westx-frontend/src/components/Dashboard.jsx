// src/components/Dashboard.jsx
import React from 'react';
import { Container, Grid } from '@mui/material';
import StatsCard from './StatsCard';
import ControlPanel from './ControlPanel';
import RecentTweets from './RecentTweets';
import SettingsPanel from './SettingsPanel';

function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StatsCard />
        </Grid>
        <Grid item xs={12}>
          <ControlPanel />
        </Grid>
        <Grid item xs={12} md={8}>
          <RecentTweets />
        </Grid>
        <Grid item xs={12} md={4}>
          <SettingsPanel />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;