import API_URL from './config/api';

// Update handlePostTweet
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

// Update handleScheduleTweet
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

// Update updateAnalytics
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