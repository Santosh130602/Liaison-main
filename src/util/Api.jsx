import axios from 'axios';

const API_URL = 'http://localhost:4000/api/message';

const token = localStorage.getItem('token');
const config = token
  ? {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    }
  : {};

export const createChat = (senderId, receiverId) => {
  return axios.post(`${API_URL}/`, { senderId, receiverId }, config);
};

export const getUserChats = (userId) => {
  return axios.get(`${API_URL}/${userId}`, config);
};

export const findChat = (firstId, secondId) => {
  return axios.get(`${API_URL}/find/${firstId}/${secondId}`, config);
};

export const addMessage = (chatId, senderId, text) => {
  return axios.post(`${API_URL}/addmessage`, { chatId, senderId, text }, config);
};

export const getMessages = (chatId) => {
  return axios.get(`${API_URL}/find/${chatId}`, config);
};
