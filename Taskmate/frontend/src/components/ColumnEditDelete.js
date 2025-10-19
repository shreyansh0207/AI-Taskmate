import React, { useState } from 'react';
import axios from 'axios';

export default function ColumnEditDelete({ column, onUpdated }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(column.name);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async e => {
    e.preventDefault();
    setLoading(true);
    await axios.put(`http://localhost:5000/api/columns/${column._id}`, { name, order: column.order });
    setEditing(false);
    setLoading(false);
    onUpdated && onUpdated();
  };

  const handleDelete = async () => {
    setLoading(true);
    await axios.delete(`http://localhost:5000/api/columns/${column._id}`);
    setLoading(false);
    onUpdated && onUpdated();
  };

  if (!editing) {
    return (
      <span style={{ marginLeft: 8 }}>
        <button onClick={() => setEditing(true)} style={{ marginRight: 4, background: '#3182ce', color: '#fff', border: 'none', padding: '2px 8px', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>Edit</button>
        <button onClick={handleDelete} style={{ background: '#e53e3e', color: '#fff', border: 'none', padding: '2px 8px', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>Delete</button>
      </span>
    );
  }

  return (
    <form onSubmit={handleUpdate} style={{ display: 'inline', marginLeft: 8 }}>
      <input value={name} onChange={e => setName(e.target.value)} style={{ width: 80, marginRight: 4 }} required />
      <button type="submit" style={{ background: '#38a169', color: '#fff', border: 'none', padding: '2px 8px', borderRadius: 4, cursor: 'pointer', fontSize: 12, marginRight: 4 }}>{loading ? 'Saving...' : 'Save'}</button>
      <button type="button" onClick={() => setEditing(false)} style={{ background: '#a0aec0', color: '#fff', border: 'none', padding: '2px 8px', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>Cancel</button>
    </form>
  );
}
