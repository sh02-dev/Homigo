import api from './api'
export const createComplaint = (data)=> api.post('/complaints/add', data)
export const getComplaints = ()=> api.get('/complaints/all').then(r=>r.data)
export const updateComplaint = (id, payload)=> api.put(`/complaints/update/${id}`, payload)
