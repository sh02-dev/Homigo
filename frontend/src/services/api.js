import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
  withCredentials: true, // IMPORTANT: send cookies
})

// no Authorization header from localStorage anymore
export default api
