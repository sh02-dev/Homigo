import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) { setForm(prev => ({...prev, [e.target.name]: e.target.value})); }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      // Save token (example: localStorage) and redirect based on role
      localStorage.setItem('token', data.token);
      const role = data.role || 'tenant';

      if (role === 'admin') navigate('/admin/dashboard', { replace: true });
      else navigate('/tenant/dashboard', { replace: true });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', minHeight: '80vh' }}>
      <form onSubmit={handleSubmit} style={{ width:420, padding:28, boxShadow:'0 10px 30px rgba(0,0,0,0.07)', borderRadius:10 }}>
        <h2>Login</h2>

        <label style={{ display:'block', marginTop:12 }}>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} required style={{ width:'100%', padding:10, marginTop:6 }} />

        <label style={{ display:'block', marginTop:12 }}>Password</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} required style={{ width:'100%', padding:10, marginTop:6 }} />

        <button type="submit" disabled={loading} style={{ marginTop:18, padding:'10px 16px', width:'100%', background:'#111827', color:'#fff', border:'none', borderRadius:6 }}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
