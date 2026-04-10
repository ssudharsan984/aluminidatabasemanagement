import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addAlumni, updateAlumni, getAlumniById } from '../api';

const DEPTS = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'Electrical', 'MBA', 'MCA'];
const empty = { name: '', email: '', phone: '', batchYear: '', department: '', company: '', designation: '', location: '', linkedin: '' };

export default function AlumniForm() {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) getAlumniById(id).then(r => setForm(r.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) await updateAlumni(id, form); else await addAlumni(form);
      navigate('/alumni');
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving alumni');
    }
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <>
      {error && <div className="alert alert-danger">❌ {error}</div>}
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group"><label>Full Name *</label><input value={form.name} onChange={set('name')} placeholder="Enter full name" required /></div>
            <div className="form-group"><label>Email *</label><input type="email" value={form.email} onChange={set('email')} placeholder="Enter email" required /></div>
            <div className="form-group"><label>Phone</label><input value={form.phone} onChange={set('phone')} placeholder="Enter phone number" /></div>
            <div className="form-group"><label>Batch Year *</label><input type="number" value={form.batchYear} onChange={set('batchYear')} placeholder="e.g. 2020" required /></div>
            <div className="form-group">
              <label>Department *</label>
              <select value={form.department} onChange={set('department')} required>
                <option value="">-- Select Department --</option>
                {DEPTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Company</label><input value={form.company} onChange={set('company')} placeholder="Current company" /></div>
            <div className="form-group"><label>Designation</label><input value={form.designation} onChange={set('designation')} placeholder="Job title" /></div>
            <div className="form-group"><label>Location</label><input value={form.location} onChange={set('location')} placeholder="City, Country" /></div>
            <div className="form-group full"><label>LinkedIn Profile</label><input value={form.linkedin} onChange={set('linkedin')} placeholder="https://linkedin.com/in/username" /></div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">💾 {id ? 'Update' : 'Save'} Alumni</button>
            <button type="button" className="btn btn-warning" onClick={() => navigate('/alumni')}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
}
