import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://ai-taskmate-k7qw.onrender.com/api/projects';

export default function ProjectList({ onSelect, refresh, onNewProjectClick }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');
    axios.get(API_URL, { headers: token ? { Authorization: `Bearer ${token}` } : {} }).then(res => {
      setProjects(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [refresh]);

  if (loading) return <div>Loading projects...</div>;

  const handleDeleteProject = async (e, projectId) => {
    e.stopPropagation();
    const ok = window.confirm('Delete this project and all its data?');
    if (!ok) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/${projectId}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
      setProjects(prev => prev.filter(p => p._id !== projectId));
    } catch (err) {
      alert(err?.response?.data?.error || 'Failed to delete project.');
    }
  };

  return (
    <div className="project-grid">
      {projects.length > 0 ? (
        projects.map(project => (
          <div key={project._id} className="project-card" onClick={() => onSelect(project)}>
            <button className="project-delete-btn" title="Delete project"
              onClick={(e) => handleDeleteProject(e, project._id)}>🗑️</button>
            <div className="project-card-header">
              <div className="project-card-icon">📁</div>
              <div className="project-card-meta">
                <h3>{project.name}</h3>
                <div className="project-card-tags">
                  <span className="project-tag">js</span>
                </div>
              </div>
            </div>
            <p className="project-card-desc">{project.description || 'No description'}</p>
            <div className="project-card-footer">
              <span className="project-created-label">Created {new Date(project.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="no-projects-placeholder">
          <div className="icon">➕</div>
          <h3>No projects yet</h3>
          <p>Create your first project to start organizing tasks and unlock AI-powered insights</p>
          <button className="new-project-btn" onClick={onNewProjectClick}>+ New Project</button>
        </div>
      )}
    </div>
  );
}
