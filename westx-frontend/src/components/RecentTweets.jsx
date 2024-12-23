import React from 'react';
import { Paper, Typography, Card, CardContent, Box, CircularProgress } from '@mui/material';

function RecentTweets({ tweets, loading }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Recent Tweets</Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        tweets.map((tweet, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="body1">{tweet.content}</Typography>
              <Typography variant="caption" color="textSecondary">
                {tweet.timestamp}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Paper>
  );
}

export default RecentTweets;