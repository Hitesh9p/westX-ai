import React from 'react';
import { Paper, Typography, Grid, Box, Switch, Button } from '@mui/material';
import { Add, Timeline } from '@mui/icons-material';

function ControlPanel({ isAutoPosting, setIsAutoPosting, onGenerateTweet }) {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Control Panel</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 2 }}>Auto Posting</Typography>
            <Switch
              checked={isAutoPosting}
              onChange={(e) => setIsAutoPosting(e.target.checked)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={onGenerateTweet}
            sx={{ mr: 2 }}
          >
            Generate Tweet
          </Button>
          <Button
            variant="outlined"
            startIcon={<Timeline />}
          >
            View Schedule
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ControlPanel;