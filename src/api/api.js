import axios from 'axios';

// Update API_URL to the Railway backend domain
const API_URL = 'https://backend-production-b84e.up.railway.app';

export const login = (credentials) => axios.post(`${API_URL}/admin/login`, credentials);
export const logout = () => axios.post(`${API_URL}/admin/logout`);
export const addQA = (data) => axios.post(`${API_URL}/admin/add`, data);
export const updateQA = (data) => axios.put(`${API_URL}/admin/update`, data);
export const deleteQA = (data) => axios.delete(`${API_URL}/admin/delete`, { data });
