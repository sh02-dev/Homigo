import api from './api'
export const createRent = (data)=> api.post('/rent/create', data)
export const payRent = (id)=> api.put(`/rent/pay/${id}`)
export const getPending = ()=> api.get('/rent/pending').then(r=>r.data)
