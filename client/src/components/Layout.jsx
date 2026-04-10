import { Outlet, NavLink, useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  const logout = () => { localStorage.removeItem('user'); navigate('/login'); };

  return (
    <div style={{ display: 'flex' }}>
      <div className="sidebar">
        <div className="sidebar-logo">
          <h2>🎓 AlumniHub</h2>
          <p>Management Portal</p>
        </div>
        <nav>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
            <span className="icon">📊</span><span>Dashboard</span>
          </NavLink>
          <NavLink to="/alumni" className={({ isActive }) => isActive ? 'active' : ''}>
            <span className="icon">👥</span><span>Alumni</span>
          </NavLink>
          <NavLink to="/events" className={({ isActive }) => isActive ? 'active' : ''}>
            <span className="icon">📅</span><span>Events</span>
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <button onClick={logout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef9a9a', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🚪</span><span>Logout</span>
          </button>
        </div>
      </div>
      <div className="main">
        <div className="topbar">
          <h1 style={{ fontSize: '20px', color: '#1a237e', fontWeight: 600 }}>Alumni Portal</h1>
          <div className="user-info">
            <div className="avatar">A</div>
            <span>Welcome, <strong>{user}</strong></span>
          </div>
        </div>
        <div className="content"><Outlet /></div>
      </div>
    </div>
  );
}
