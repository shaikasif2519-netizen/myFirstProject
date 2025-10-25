// frontend/src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
// -----------------------------------
// Send message
export const sendMessage = (sender_id, receiver_id, content) => {
  return axios.post(`${API_URL}/messages/send`, {  // ✅ plural "messages"
    sender_id,
    receiver_id,
    content
  });
};

// Get messages between users
export const getMessages = (user1, user2) => {
  return axios.get(`${API_URL}/messages/${user1}/${user2}`);
};
// -------------------------------------------

export const register = (userName,userId, email,mobile, password) => {
  return axios.post(`${API_URL}/auth/register`, { userName,userId, email,mobile, password });
};

export const loginWithEmail = (email, password) => {
  return axios.post(`${API_URL}/auth/email`, { email, password });
};
export const loginWithMobile = (mobile, password) => {
  return axios.post(`${API_URL}/auth/login`, { mobile, password });
};

export const getProfile = (token) => {
  return axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
