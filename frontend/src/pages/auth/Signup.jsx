import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');

      // Signup success -> redirect to tenant login
      navigate('/tenant/login', { replace: true });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '78vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
      <form onSubmit={handleSubmit} style={{ width: 420, padding: 24, borderRadius: 10, boxShadow: '0 8px 24px rgba(11,18,32,0.06)' }}>
        <h2 style={{ marginBottom: 8 }}>Create an account</h2>
        <p style={{ marginTop: 0, color: '#6b7280' }}>Create a tenant account to access tenant features.</p>

        <label style={{ display: 'block', marginTop: 12 }}>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required style={{ width: '100%', padding: 10, marginTop: 6 }} />

        <label style={{ display: 'block', marginTop: 12 }}>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} required style={{ width: '100%', padding: 10, marginTop: 6 }} />

        <label style={{ display: 'block', marginTop: 12 }}>Password</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} required style={{ width: '100%', padding: 10, marginTop: 6 }} />

        <button type="submit" disabled={loading} style={{ marginTop: 16, width: '100%', padding: '10px 12px', borderRadius: 6, border: 'none', background: '#111827', color: '#fff' }}>
          {loading ? 'Creating...' : 'Create account'}
        </button>
      </form>
    </div>
  );
}
