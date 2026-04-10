import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAlumni, deleteAlumni } from '../api';

export default function AlumniList() {
  const [alumniList, setAlumniList] = useState([]);
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('');

  const fetchAlumni = async (q = '') => {
    const res = await getAlumni(q);
    setAlumniList(res.data);
  };

  useEffect(() => { fetchAlumni(); }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return;
    await deleteAlumni(id);
    setMsg('Deleted successfully');
    fetchAlumni(search);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAlumni(search);
  };

  return (
    <>
      {msg && <div className="alert alert-success">✅ {msg}</div>}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <form onSubmit={handleSearch} className="search-bar" style={{ margin: 0, flex: 1, marginRight: '16px' }}>
          <input type="text" placeholder="🔍 Search by name, email, department, company..." value={search}
            onChange={e => setSearch(e.target.value)} />
          <button type="submit" className="btn btn-primary">Search</button>
          {search && <button type="button" className="btn btn-warning" onClick={() => { setSearch(''); fetchAlumni(); }}>Clear</button>}
        </form>
        <Link to="/alumni/add" className="btn btn-success">➕ Add Alumni</Link>
      </div>

      <div className="card">
        <div className="card-header"><h3>👥 Alumni Records ({alumniList.length} found)</h3></div>
        <table>
          <thead>
            <tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Batch</th><th>Department</th><th>Company</th><th>Designation</th><th>Location</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {alumniList.map((a, i) => (
              <tr key={a._id}>
                <td>{i + 1}</td>
                <td><strong>{a.name}</strong></td>
                <td>{a.email}</td>
                <td>{a.phone}</td>
                <td><span className="badge badge-blue">{a.batchYear}</span></td>
                <td>{a.department}</td>
                <td>{a.company}</td>
                <td>{a.designation}</td>
                <td>{a.location}</td>
                <td>
                  <Link to={`/alumni/edit/${a._id}`} className="btn btn-warning btn-sm">✏️ Edit</Link>{' '}
                  <button onClick={() => handleDelete(a._id, a.name)} className="btn btn-danger btn-sm">🗑️ Delete</button>
                </td>
              </tr>
            ))}
            {!alumniList.length && <tr><td colSpan="10" style={{ textAlign: 'center', color: '#aaa', padding: '40px' }}>No alumni records found</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
