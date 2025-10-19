import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Sparkles } from 'lucide-react';
import KanbanBoard from '../components/KanbanBoard';
import SummarizeTasks from '../components/SummarizeTasks';
import ProjectQA from '../components/ProjectQA';
import Modal from '../components/Modal';

export default function ProjectPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:5000/api/projects/${projectId}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then(res => setProject(res.data))
      .catch(err => console.error(err));
  }, [projectId]);

  if (!project) return <div className="loading-screen">Loading project...</div>;

  return (
    <div className="project-page">
      <header className="project-page-header">
        <div className="project-title-section">
          <Link to="/" className="back-link">
            <ArrowLeft size={18} />
            <span>Back to Projects</span>
          </Link>
          <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
          </div>
        </div>
        <button className="btn-primary ai-assistant-btn" onClick={() => setIsAiModalOpen(true)}>
          <Sparkles size={16} />
          <span>AI Assistant</span>
        </button>
      </header>
      <main className="project-page-main">
        <KanbanBoard projectId={projectId} />
      </main>

      <Modal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} title="AI Assistant">
        <SummarizeTasks projectId={projectId} />
        <hr className="modal-divider" />
        <ProjectQA projectId={projectId} />
      </Modal>
    </div>
  );
}
