import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? '';

export const apiClient = axios.create({
  baseURL: apiBaseUrl ? `${apiBaseUrl}/api` : '/api'
});
