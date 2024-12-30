import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Authentication Helper
export const setToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const removeToken = () => localStorage.removeItem('token');
export const isLoggedIn = () => !!getToken();

// API Object
export const api = {
    login: (credentials) => axios.post(`${API_URL}/auth/login`, credentials),
    register: (credentials) => axios.post(`${API_URL}/auth/register`, credentials),
    getTasks: () => axios.get(`${API_URL}/tasks`, { headers: { Authorization: `Bearer ${getToken()}` } }),
    createTask: (task) => axios.post(`${API_URL}/tasks`, task, { headers: { Authorization: `Bearer ${getToken()}` } }),
    updateTask: (id, task) => axios.put(`${API_URL}/tasks/${id}`, task, { headers: { Authorization: `Bearer ${getToken()}` } }),
    deleteTask: (id) => axios.delete(`${API_URL}/tasks/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } })
};
