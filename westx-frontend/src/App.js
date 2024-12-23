import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Button, 
  Card, 
  Grid, 
  Typography,
  Modal,
  TextField,
  Stack,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  Twitter, 
  Schedule, 
  Analytics,
  Close as CloseIcon
} from '@mui/icons-material';
import API_URL from './config/api';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function App() {
  const [generateOpen, setGenerateOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [tweetContent, setTweetContent] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [analytics, setAnalytics] = useState({
    totalTweets: 0,
    scheduledTweets: 0,
    engagement: 0
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const showNotification = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handlePostTweet = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tweets/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: tweetContent })
      });
      
      const data = await response.json();
      
      if (data.success) {
        await updateAnalytics();
        setGenerateOpen(false);
        setTweetContent('');
        showNotification('Tweet posted successfully!');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error posting tweet:', error);
      showNotification('Failed to post tweet: ' + error.message, 'error');
    }
  };

  const handleScheduleTweet = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tweets/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          content: tweetContent,
          scheduledFor: scheduleDate 
        })
      });

      const data = await response.json();

      if (data.success) {
        setAnalytics(prev => ({
          ...prev,
          scheduledTweets: prev.scheduledTweets + 1
        }));
        setScheduleOpen(false);
        setTweetContent('');
        setScheduleDate('');
        showNotification('Tweet scheduled successfully!');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error scheduling tweet:', error);
      showNotification('Failed to schedule tweet: ' + error.message, 'error');
    }
  };

  const updateAnalytics = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tweets/analytics`);
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error updating analytics:', error);
      showNotification('Failed to update analytics', 'error');
    }
  };

  const handleGenerateTweet = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tweets/generate`, {
        method: 'POST'
      });
      const data = await response.json();
      setTweetContent(data.content);
      showNotification('Tweet generated successfully!');
    } catch (error) {
      console.error('Error generating tweet:', error);
      showNotification('Failed to generate tweet', 'error');
    }
  };

  // Load analytics when component mounts
  React.useEffect(() => {
    updateAnalytics();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        WestX AI Dashboard
      </Typography>

      {/* Control Panel */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item>
            <Button 
              variant="contained" 
              startIcon={<Twitter />}
              onClick={() => setGenerateOpen(true)}
            >
              Generate Tweet
            </Button>
          </Grid>
          <Grid item>
            <Button 
              variant="outlined" 
              startIcon={<Schedule />}
              onClick={() => setScheduleOpen(true)}
            >
              Schedule Tweet
            </Button>
          </Grid>
          <Grid item>
            <Button 
              variant="outlined" 
              startIcon={<Analytics />}
              onClick={() => setAnalyticsOpen(true)}
            >
              Analytics
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Total Tweets</Typography>
            <Typography variant="h3">{analytics.totalTweets}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Scheduled</Typography>
            <Typography variant="h3">{analytics.scheduledTweets}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Engagement</Typography>
            <Typography variant="h3">{analytics.engagement}%</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Generate Tweet Modal */}
      <Modal
        open={generateOpen}
        onClose={() => setGenerateOpen(false)}
      >
        <Box sx={modalStyle}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Generate Tweet</Typography>
            <IconButton onClick={() => setGenerateOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={tweetContent}
            onChange={(e) => setTweetContent(e.target.value)}
            placeholder="Tweet content..."
            sx={{ mb: 2 }}
          />
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleGenerateTweet}>
              Generate
            </Button>
            <Button variant="contained" onClick={handlePostTweet}>
              Post Tweet
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Schedule Tweet Modal */}
      <Modal
        open={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
      >
        <Box sx={modalStyle}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Schedule Tweet</Typography>
            <IconButton onClick={() => setScheduleOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={tweetContent}
            onChange={(e) => setTweetContent(e.target.value)}
            placeholder="Tweet content..."
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="datetime-local"
            value={scheduleDate}
            onChange={(e) => setScheduleDate(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleScheduleTweet}>
            Schedule Tweet
          </Button>
        </Box>
      </Modal>

      {/* Analytics Modal */}
      <Modal
        open={analyticsOpen}
        onClose={() => setAnalyticsOpen(false)}
      >
        <Box sx={modalStyle}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Analytics</Typography>
            <IconButton onClick={() => setAnalyticsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Typography>
            Tweet Analytics Dashboard Coming Soon!
          </Typography>
        </Box>
      </Modal>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;