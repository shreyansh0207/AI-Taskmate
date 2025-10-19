import React, { useState } from 'react';
import axios from 'axios';

export default function ColumnForm({ projectId, onColumnCreated }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/columns', {
        projectId,
        name,
        order: Date.now()
      });
      setName('');
      if (onColumnCreated) onColumnCreated();
    } catch (e) {}
    setLoading(false);
  };

  if (!projectId) return null;
  return (
    <form onSubmit={handleSubmit} style={{marginBottom: 24, background: '#e2e8f0', padding: 12, borderRadius: 8, display: 'inline-block'}}>
      <input
        required
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="New column name"
        style={{padding: 7, width: '180px', marginRight: 8, borderRadius: 4, border: '1px solid #cbd5e1'}}
      />
      <button type="submit" style={{background: '#3182ce', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: 6, cursor: 'pointer', fontWeight: 500}}>
        {loading ? 'Adding...' : 'Add Column'}
      </button>
    </form>
  );
}
