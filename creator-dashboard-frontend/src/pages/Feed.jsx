import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/posts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to load feed:', err);
      }
    };
    fetchFeed();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Feed</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h4>{post.title}</h4>
            <p>{post.description}</p>
            <p><strong>Type:</strong> {post.type}</p>
            <p><strong>Date:</strong> {new Date(post.createdAt).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}
