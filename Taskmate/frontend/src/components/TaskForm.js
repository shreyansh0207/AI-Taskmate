import React, { useState } from 'react';
import axios from 'axios';

export default function TaskForm({ projectId, columns, initialStatus, onTaskCreated, onCancel }) {
  const defaultStatus = initialStatus || columns[0]?.name || 'To Do';
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(defaultStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://ai-taskmate-2wce.vercel.app/api/tasks', {
        projectId,
        title,
        description,
        status
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTitle('');
      setDescription('');
      setStatus(defaultStatus);
      if (onTaskCreated) onTaskCreated();
    } catch (e) {
      const msg = e?.response?.data?.error || 'Failed to create task.';
      setError(msg);
    }
    setLoading(false);
  };

  if (!projectId) return null;
  return (
    <form onSubmit={handleSubmit} className="task-form">
      <p className="project-form-subtitle">Add a new task to your project</p>

      <div className="form-field">
        <label>Task Title</label>
        <input
          required
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Task name"
        />
      </div>

      <div className="form-field">
        <label>Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="What needs to be done?"
        />
      </div>

      <div className="form-field">
        <label>Status</label>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          {columns.map(col => (
            <option key={col._id} value={col.name}>{col.name}</option>
          ))}
        </select>
      </div>

      {error && <div className="form-error">{error}</div>}

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-primary">{loading ? 'Creating...' : 'Create Task'}</button>
      </div>
    </form>
  );
}
