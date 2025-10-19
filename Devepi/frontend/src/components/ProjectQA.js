import React, { useState } from 'react';
import axios from 'axios';

export default function ProjectQA({ projectId }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');
    try {
      const res = await axios.post(`http://localhost:5000/api/ai/project-qa/${projectId}`, { question });
      setAnswer(res.data.answer || 'No answer provided.');
    } catch (e) {
      const serverMsg = e?.response?.data?.error;
      setAnswer(serverMsg || 'Failed to get an answer from the AI assistant.');
    }
    setLoading(false);
  };

  return (
    <div className="project-qa-section">
      <h4>Ask About This Project</h4>
      <textarea
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="e.g., 'What is the main goal of this project?' or 'Which tasks are currently in progress?'"
      />
      <button onClick={handleAsk} disabled={loading}>
        {loading ? 'Thinking...' : 'Ask AI'}
      </button>
      {answer && (
        <div className="ai-answer">
          <strong>AI Assistant:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
