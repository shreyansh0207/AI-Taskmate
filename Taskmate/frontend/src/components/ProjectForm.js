import React, { useState } from 'react';
import axios from 'axios';

export default function ProjectForm({ onProjectCreated, onCancel }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://ai-taskmate-2wce.vercel.app/api/projects', { name, description }, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setName('');
      setDescription('');
      onProjectCreated && onProjectCreated();
    } catch (err) {
      const msg = err?.response?.data?.error || 'Failed to create project. Please try again.';
      setError(msg);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <p className="project-form-subtitle">Add a new project to organize your tasks</p>

      <div className="form-field">
        <label>Project Name</label>
        <input
          required
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="My Awesome Project"
        />
      </div>

      <div className="form-field">
        <label>Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="What is this project about?"
        />
      </div>

      {error && <div className="form-error">{error}</div>}

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-primary">{loading ? 'Creating...' : 'Create Project'}</button>
      </div>
    </form>
  );
}
