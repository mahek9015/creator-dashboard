import React, { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        alert('Login Successful!');
        window.location.href = '/dashboard';
      } else {
        const res = await axios.post('http://localhost:5000/api/auth/signup', { username, email, password });
        localStorage.setItem('token', res.data.token);
        alert('Registered! Redirecting...');
        window.location.href = '/dashboard';
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{isLogin ? 'Login' : 'Register'}</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary w-100">{isLogin ? 'Login' : 'Register'}</button>
          </form>
          <p className="mt-3 text-center">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Register here' : 'Login here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
