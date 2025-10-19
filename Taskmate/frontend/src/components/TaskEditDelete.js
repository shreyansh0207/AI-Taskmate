import React, { useState } from 'react';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';

export default function TaskEditDelete({ task, columns, onUpdated }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async e => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/tasks/${task._id}`, 
      { title, description, status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setEditing(false);
    setLoading(false);
    onUpdated && onUpdated();
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Delete this task? This cannot be undone.');
    if (!confirmed) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/tasks/${task._id}`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onUpdated && onUpdated();
    } catch (e) {
      const msg = e?.response?.data?.error || 'Failed to delete task.';
      alert(msg);
    }
    setLoading(false);
  };

  if (!editing) {
    return (
      <div className="task-actions">
        <button onClick={() => setEditing(true)} disabled={loading} className="btn-icon">
          <Pencil size={16} />
        </button>
        <button onClick={handleDelete} disabled={loading} className="btn-icon btn-danger">
          {loading ? '...' : <Trash2 size={16} />}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleUpdate} className="task-edit-form">
      <input value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} required />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        {columns.map(col => (
          <option key={col._id} value={col.name}>{col.name}</option>
        ))}
      </select>
      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
        <button type="button" className="btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
      </div>
    </form>
  );
}
