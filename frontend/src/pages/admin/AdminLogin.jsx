import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export default function AdminLogin(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const { loginAdmin } = useAuth()
  const nav = useNavigate()

  async function submit(e){ e.preventDefault(); setLoading(true)
    try{
      await loginAdmin(email,password)
      nav('/admin/dashboard')
    }catch(err){ alert('Login failed') }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md panel p-8">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={submit} className="space-y-4">
          <label className="block text-sm">Email
            <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full mt-2 p-3 rounded bg-transparent border border-gray-700" placeholder="admin@pg.local" />
          </label>
          <label className="block text-sm">Password
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full mt-2 p-3 rounded bg-transparent border border-gray-700" />
          </label>
          <div>
            <button className="w-full py-3 rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white">{loading? 'Signing...' : 'Sign in'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
