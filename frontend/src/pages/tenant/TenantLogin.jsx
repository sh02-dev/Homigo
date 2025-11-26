import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export default function TenantLogin(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const { loginTenant } = useAuth()
  const nav = useNavigate()

  async function submit(e){ e.preventDefault(); try{ await loginTenant(email,password); nav('/tenant/dashboard') }catch(e){ alert('Login failed') } }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md panel p-8">
        <h2 className="text-2xl font-bold mb-4">Tenant Login</h2>
        <form onSubmit={submit} className="space-y-4">
          <label className="block text-sm">Email
            <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full mt-2 p-3 rounded bg-transparent border border-gray-700" />
          </label>
          <label className="block text-sm">Password
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full mt-2 p-3 rounded bg-transparent border border-gray-700" />
          </label>
          <div>
            <button className="w-full py-3 rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  )
}
