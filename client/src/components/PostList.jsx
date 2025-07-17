import React, { useEffect, useState } from 'react';
import api from '../services/api';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/posts')
      .then(res => setPosts(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{textAlign: 'center', marginTop: '2rem'}}>Loading...</div>;
  if (error) return <div style={{color: 'red', textAlign: 'center', marginTop: '2rem'}}>Error: {error}</div>;

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', padding: '2rem', background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2d3748' }}>Blog Posts</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map(post => (
          <li key={post._id} style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: 8, background: '#f7fafc', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ margin: 0, color: '#3182ce' }}>{post.title}</h3>
            <p style={{ margin: '0.5rem 0', color: '#4a5568' }}>{post.content?.slice(0, 100)}{post.content?.length > 100 ? '...' : ''}</p>
            <span style={{ fontSize: 12, color: '#718096' }}>Category: {post.category?.name || 'Uncategorized'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList; 