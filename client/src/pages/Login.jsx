import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      if (res.data.success) {
        localStorage.setItem('user', res.data.user);
        navigate('/dashboard');
      }
    } catch {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>🎓 Alumni Portal</h2>
        <p>Centralized Alumni Data Management</p>
        {error && <div className="alert alert-danger">❌ {error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" placeholder="Enter username" value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })} required autoFocus />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter password" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })} required />
          </div>
          <button type="submit" className="btn btn-primary">🔐 Login</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: '#aaa' }}>Default: admin / admin123</p>
      </div>
    </div>
  );
}
