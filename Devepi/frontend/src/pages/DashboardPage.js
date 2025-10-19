import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, LogOut, Plus } from 'lucide-react';
import ProjectList from '../components/ProjectList';
import Modal from '../components/Modal';
import ProjectForm from '../components/ProjectForm';

export default function DashboardPage() {
  const [refreshProjects, setRefreshProjects] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleProjectCreated = () => {
    setRefreshProjects(p => !p);
    setIsModalOpen(false);
  };

  const handleProjectSelect = (project) => {
    navigate(`/project/${project._id}`);
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="logo-section">
          <h2>TaskFlow AI</h2>
          <span className="user-email">{JSON.parse(localStorage.getItem('user') || '{}')?.email || ''}</span>
        </div>
        <button className="btn-secondary sign-out-btn" onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}>
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </header>

      <div className="ai-banner">
        <div className="ai-icon">
          <Sparkles size={32} />
        </div>
        <div className="ai-banner-content">
          <h3>AI Assistant at Your Service</h3>
          <p>Summarize tasks, ask questions, and get intelligent insights on any project, powered by Gemini.</p>
          <div className="ai-tags">
            <span>Task Summarization</span>
            <span>Project Q&A</span>
            <span className="tag-gemini">Powered by Gemini</span>
          </div>
        </div>
      </div>

      <section className="projects-section">
        <div className="projects-header">
          <div>
            <h2>Your Projects</h2>
            <p>Select a project to get started or create a new one.</p>
          </div>
          <button className="btn-primary new-project-btn" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} />
            <span>New Project</span>
          </button>
        </div>
        <ProjectList 
          onSelect={handleProjectSelect} 
          refresh={refreshProjects} 
          onNewProjectClick={() => setIsModalOpen(true)}
        />
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Project">
        <ProjectForm onProjectCreated={handleProjectCreated} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
