import React from 'react';
import { Paper, Typography, Grid, TextField } from '@mui/material';

function SettingsPanel() {
  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Settings</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Tweet Frequency (hours)"
            type="number"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Content Theme"
            select
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SettingsPanel;