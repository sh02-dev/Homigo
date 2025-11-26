// import api from './api'
// export const getRooms = ()=> api.get('/rooms/all').then(r=>r.data)
// export const createRoom = (data)=> api.post('/rooms/add', data).then(r=>r.data)
// export const updateRoom = (id,data)=> api.put(`/rooms/update/${id}`, data)
// export const deleteRoom = (id)=> api.delete(`/rooms/delete/${id}`)

// src/services/roomService.js
import api from './api'

export const getRooms = () => api.get('/rooms/all').then(r => r.data)

/**
 * createRoom returns the created room object (res.data) and
 * dispatches a 'roomsChanged' event so other parts of app can refresh.
 */
export const createRoom = async (data) => {
  const res = await api.post('/rooms/add', data)
  // Notify the rest of the app that rooms changed
  try { window.dispatchEvent(new Event('roomsChanged')) } catch(e) {}
  return res.data
}

export const updateRoom = async (id, data) => {
  const res = await api.put(`/rooms/update/${id}`, data)
  try { window.dispatchEvent(new Event('roomsChanged')) } catch(e) {}
  return res.data
}

export const deleteRoom = async (id) => {
  const res = await api.delete(`/rooms/delete/${id}`)
  try { window.dispatchEvent(new Event('roomsChanged')) } catch(e) {}
  return res.data
}
