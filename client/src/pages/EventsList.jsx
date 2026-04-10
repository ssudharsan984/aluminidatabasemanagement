import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents, deleteEvent } from '../api';

export default function EventsList() {
  const [eventList, setEventList] = useState([]);
  const [msg, setMsg] = useState('');

  const fetchEvents = async () => { const res = await getEvents(); setEventList(res.data); };

  useEffect(() => { fetchEvents(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    await deleteEvent(id);
    setMsg('Deleted successfully');
    fetchEvents();
  };

  return (
    <>
      {msg && <div className="alert alert-success">✅ {msg}</div>}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Link to="/events/add" className="btn btn-success">➕ Add Event</Link>
      </div>
      <div className="card">
        <div className="card-header"><h3>📅 All Events</h3></div>
        <table>
          <thead><tr><th>#</th><th>Title</th><th>Date</th><th>Location</th><th>Description</th><th>Actions</th></tr></thead>
          <tbody>
            {eventList.map((e, i) => (
              <tr key={e._id}>
                <td>{i + 1}</td>
                <td><strong>{e.title}</strong></td>
                <td><span className="badge badge-green">{e.eventDate}</span></td>
                <td>{e.location}</td>
                <td>{e.description}</td>
                <td>
                  <Link to={`/events/edit/${e._id}`} className="btn btn-warning btn-sm">✏️ Edit</Link>{' '}
                  <button onClick={() => handleDelete(e._id)} className="btn btn-danger btn-sm">🗑️ Delete</button>
                </td>
              </tr>
            ))}
            {!eventList.length && <tr><td colSpan="6" style={{ textAlign: 'center', color: '#aaa', padding: '40px' }}>No events found</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
