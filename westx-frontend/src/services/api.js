// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
});

export const generateTweet = async () => {
    try {
        const response = await api.post('/tweets/generate');
        return response.data;
    } catch (error) {
        console.error('Error generating tweet:', error);
        throw error;
    }
};

export const postTweet = async (content) => {
    try {
        const response = await api.post('/tweets/post', { content });
        return response.data;
    } catch (error) {
        console.error('Error posting tweet:', error);
        throw error;
    }
};

export const scheduleTweet = async (content, scheduledFor) => {
    try {
        const response = await api.post('/tweets/schedule', { content, scheduledFor });
        return response.data;
    } catch (error) {
        console.error('Error scheduling tweet:', error);
        throw error;
    }
};

export const getAnalytics = async () => {
    try {
        const response = await api.get('/tweets/analytics');
        return response.data;
    } catch (error) {
        console.error('Error fetching analytics:', error);
        throw error;
    }
};