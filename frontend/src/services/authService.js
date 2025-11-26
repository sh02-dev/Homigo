import api from './api'

export const adminLogin = async (email, password) => {
  const res = await api.post('/auth/admin/login', { email, password })
  return res.data
}

export const tenantLogin = async (email, password) => {
  const res = await api.post('/auth/tenant/login', { email, password })
  return res.data
}
