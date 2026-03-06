import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');
  if (token && userType) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Volunteers
export const volunteerRegister = (data) => api.post('/volunteers/register', data);
export const volunteerLogin = (email, password) => api.post('/volunteers/login', { email, password });
export const getVolunteerMe = () => api.get('/volunteers/me');

// Organizations
export const orgRegister = (data) => api.post('/org/register', data);
export const orgLogin = (email, password) => api.post('/org/login', { email, password });
export const getOrgNeeds = () => api.get('/needs/org/my');

// Admin
export const adminLogin = (email, password) => api.post('/admin/login', { email, password });
export const adminGetVolunteers = () => api.get('/admin/volunteers');
export const adminGetOrganizations = () => api.get('/admin/organizations');
export const adminGetNeeds = () => api.get('/admin/needs');
export const adminApproveOrg = (id) => api.put(`/admin/organizations/${id}/approve`);
export const adminRemoveNeed = (id) => api.delete(`/admin/needs/${id}`);
export const adminCompleteNeed = (id) => api.put(`/admin/needs/${id}/complete`);

// Volunteer Needs (public + auth)
export const getNeeds = (params) => api.get('/needs', { params });
export const getNeedById = (id) => api.get(`/needs/${id}`);
export const createNeed = (data) => api.post('/needs', data);
export const volunteerForNeed = (id) => api.post(`/needs/${id}/volunteer`);

export default api;
