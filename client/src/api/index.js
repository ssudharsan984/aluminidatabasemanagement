import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

export const login         = (data)     => API.post('/auth/login', data);
export const getDashboard  = ()         => API.get('/dashboard');
export const getAlumni     = (search)   => API.get(`/alumni${search ? `?search=${search}` : ''}`);
export const getAlumniById = (id)       => API.get(`/alumni/${id}`);
export const addAlumni     = (data)     => API.post('/alumni', data);
export const updateAlumni  = (id, data) => API.put(`/alumni/${id}`, data);
export const deleteAlumni  = (id)       => API.delete(`/alumni/${id}`);
export const getEvents     = ()         => API.get('/events');
export const addEvent      = (data)     => API.post('/events', data);
export const updateEvent   = (id, data) => API.put(`/events/${id}`, data);
export const deleteEvent   = (id)       => API.delete(`/events/${id}`);
