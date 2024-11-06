import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const searchResult = async (rollNumber: string) => {
  try {
    const { data } = await api.get(`/results/${rollNumber}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const adminLogin = async (credentials: {
  username: string;
  password: string;
}) => {
  try {
    const { data } = await api.post('/admin/login', credentials);
    return data;
  } catch (error) {
    throw error;
  }
};

export const addResult = async (resultData: any) => {
  try {
    const { data } = await api.post('/admin/results', resultData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateResult = async (id: string, resultData: any) => {
  try {
    const { data } = await api.put(`/admin/results/${id}`, resultData);
    return data;
  } catch (error) {
    throw error;
  }
};
