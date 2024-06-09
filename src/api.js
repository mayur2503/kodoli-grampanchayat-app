// api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.1.8/kodoli/api/',
});
// baseURL: 'https://gpkodoli.excellentautomationservice.in/api/',
// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    // Get token from AsyncStorage
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific status codes
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors
      // E.g., Redirect to login screen or refresh token
    }
    return Promise.reject(error);
  }
);

export default api;
