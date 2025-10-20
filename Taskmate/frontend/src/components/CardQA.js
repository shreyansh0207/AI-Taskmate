import React, { useState } from 'react';
import axios from 'axios';
import { Sparkles } from 'lucide-react';

export default function CardQA({ taskId }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`https://ai-taskmate-k7qw.onrender.com/api/ai/qa/${taskId}`, 
        { question }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAnswer(res.data.answer || 'No answer provided.');
    } catch (e) {
      const serverMsg = e?.response?.data?.error;
      setAnswer(serverMsg || 'Failed to get answer.');
    }
    setLoading(false);
  };

  if (!taskId) return null;
  return (
    <div className="card-qa">
      <div className="qa-input-group">
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Ask about this task..."
          disabled={loading}
        />
        <button onClick={handleAsk} className="btn-primary" disabled={loading}>
          {loading ? '...' : <Sparkles size={16} />}
          <span>{loading ? 'Asking...' : 'Ask AI'}</span>
        </button>
      </div>
      {answer && (
        <div className="ai-answer">
          <strong>AI Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
