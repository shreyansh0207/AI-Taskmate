import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('https://ai-taskmate-k7qw.onrender.com/api/auth/register', { name, email: email.toLowerCase(), password });
      localStorage.setItem('token', res.data.token);
      if (res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }
      navigate('/');
    } catch (e) {
      setError(e?.response?.data?.error || 'Failed to sign up');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <p>Start organizing your tasks</p>
        {error && <div className="form-error" style={{marginBottom:12}}>{error}</div>}
        <div className="form-field">
          <label>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required />
        </div>
        <div className="form-field">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" required />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button className="btn-primary" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
        <div className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></div>
      </form>
    </div>
  );
}


