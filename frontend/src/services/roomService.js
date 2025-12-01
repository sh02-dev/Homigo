import api from './api'

export const getRooms = () =>
  api.get('/rooms/all').then(r => r.data)

export const createRoom = (data) =>
  api.post('/rooms/add', data).then(r => r.data)

export const updateRoom = (id, data) =>
  api.put(`/rooms/update/${id}`, data).then(r => r.data)

export const deleteRoom = (id) =>
  api.delete(`/rooms/delete/${id}`).then(r => r.data)
