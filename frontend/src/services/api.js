import axios from 'axios'

// axios ka custom instance create kr rhe hain
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
  withCredentials: true, 
})

export default api
