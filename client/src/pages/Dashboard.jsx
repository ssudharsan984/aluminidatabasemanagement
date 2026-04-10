import { useEffect, useState } from 'react';
import { getDashboard } from '../api';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => { getDashboard().then(r => setData(r.data)); }, []);

  if (!data) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;

  return (
    <>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-icon blue">👥</div><div className="stat-info"><h3>{data.totalAlumni}</h3><p>Total Alumni</p></div></div>
        <div className="stat-card"><div className="stat-icon green">📅</div><div className="stat-info"><h3>{data.totalEvents}</h3><p>Total Events</p></div></div>
        <div className="stat-card"><div className="stat-icon orange">🏢</div><div className="stat-info"><h3>{data.totalDepts}</h3><p>Departments</p></div></div>
        <div className="stat-card"><div className="stat-icon purple">📍</div><div className="stat-info"><h3>{data.totalLocations}</h3><p>Locations</p></div></div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>👥 Recent Alumni</h3>
          <Link to="/alumni" className="btn btn-primary btn-sm">View All</Link>
        </div>
        <table>
          <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Batch</th><th>Department</th><th>Company</th></tr></thead>
          <tbody>
            {data.recentAlumni.map((a, i) => (
              <tr key={a._id}>
                <td>{i + 1}</td>
                <td><strong>{a.name}</strong></td>
                <td>{a.email}</td>
                <td><span className="badge badge-blue">{a.batchYear}</span></td>
                <td>{a.department}</td>
                <td>{a.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>📅 Upcoming Events</h3>
          <Link to="/events" className="btn btn-success btn-sm">View All</Link>
        </div>
        <table>
          <thead><tr><th>#</th><th>Title</th><th>Date</th><th>Location</th></tr></thead>
          <tbody>
            {data.upcomingEvents.map((e, i) => (
              <tr key={e._id}>
                <td>{i + 1}</td>
                <td><strong>{e.title}</strong></td>
                <td><span className="badge badge-green">{e.eventDate}</span></td>
                <td>{e.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
