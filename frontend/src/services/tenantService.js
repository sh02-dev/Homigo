import api from './api'
export const getTenants = ()=> api.get('/tenants/all').then(r=>r.data)
export const createTenant = (data)=> api.post('/tenants/add', data).then(r=>r.data)
export const moveoutTenant = (id)=> api.put(`/tenants/moveout/${id}`)
