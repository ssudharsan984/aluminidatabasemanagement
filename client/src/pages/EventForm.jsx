import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addEvent, updateEvent, getEvents } from '../api';

const empty = { title: '', description: '', eventDate: '', location: '' };

export default function EventForm() {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) getEvents().then(r => {
      const ev = r.data.find(e => e._id === id);
      if (ev) setForm(ev);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) await updateEvent(id, form); else await addEvent(form);
      navigate('/events');
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving event');
    }
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <>
      {error && <div className="alert alert-danger">❌ {error}</div>}
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full"><label>Event Title *</label><input value={form.title} onChange={set('title')} placeholder="Enter event title" required /></div>
            <div className="form-group"><label>Event Date *</label><input type="date" value={form.eventDate} onChange={set('eventDate')} required /></div>
            <div className="form-group"><label>Location</label><input value={form.location} onChange={set('location')} placeholder="Event venue" /></div>
            <div className="form-group full"><label>Description</label><textarea value={form.description} onChange={set('description')} rows="4" placeholder="Event description..." /></div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">💾 {id ? 'Update' : 'Save'} Event</button>
            <button type="button" className="btn btn-warning" onClick={() => navigate('/events')}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
}
