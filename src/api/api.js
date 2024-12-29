import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getTasks = () => axios.get(`${API_URL}/tasks`);
export const createTask = (task) => axios.post(`${API_URL}/tasks`, task);
