import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DashboardPage.css'; // We'll style this separately

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Creator Dashboard</h2>
        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/feed">Feed</a>
          <a href="/" onClick={() => { localStorage.removeItem('token'); }}>Logout</a>
        </nav>
      </aside>

      <main className="main-content">
        <h1>Welcome {user ? user.email : ''}</h1>

        <div className="cards">
          <div className="card">
            <h3>Credits</h3>
            <p>{user ? user.credits : 0}</p>
          </div>

          <div className="card">
            <h3>Saved Posts</h3>
            <p>{user && user.savedPosts ? user.savedPosts.length : 0}</p>
          </div>
        </div>

        <h2>Saved Posts</h2>
        <div className="posts">
          {user && user.savedPosts && user.savedPosts.length > 0 ? (
            user.savedPosts.map((post) => (
              <div key={post._id} className="post-card">
                <h4>{post.title}</h4>
                <p>{post.description}</p>
              </div>
            ))
          ) : (
            <p>No saved posts yet.</p>
          )}
        </div>
      </main>
    </div>
  );
}
