import React, { useState } from 'react';
import axios from 'axios';

export default function SummarizeTasks({ projectId }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://ai-taskmate-k7qw.onrender.com/api/ai/summarize/${projectId}`);
      setSummary(res.data.summary || 'No summary returned.');
    } catch (e) {
      const serverMsg = e?.response?.data?.error;
      setSummary(serverMsg || 'Failed to summarize tasks.');
    }
    setLoading(false);
  };

  if (!projectId) return null;
  return (
    <div style={{margin: '24px 0'}}>
      <button onClick={handleSummarize} style={{background: '#3182ce', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: 6, cursor: 'pointer', fontWeight: 500}}>
        {loading ? 'Summarizing...' : 'Summarize All Tasks (AI)'}
      </button>
      {summary && (
        <div style={{marginTop: 16, background: '#f7fafc', padding: 14, borderRadius: 6, color: '#2d3748'}}>
          <strong>Summary:</strong>
          <div>{summary}</div>
        </div>
      )}
    </div>
  );
}
