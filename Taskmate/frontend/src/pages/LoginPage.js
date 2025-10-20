import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
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
      const res = await axios.post('https://ai-taskmate-2wce.vercel.app/api/auth/login', { email: email.toLowerCase(), password });
      localStorage.setItem('token', res.data.token);
      if (res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }
      navigate('/');
    } catch (e) {
      setError(e?.response?.data?.error || 'Failed to sign in');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Welcome Back</h1>
        <p>Sign in to access your projects</p>
        {error && <div className="form-error" style={{marginBottom:12}}>{error}</div>}
        <div className="form-field">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" required />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button className="btn-primary" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
        <div className="auth-switch">Don't have an account? <Link to="/signup">Sign up</Link></div>
      </form>
    </div>
  );
}


