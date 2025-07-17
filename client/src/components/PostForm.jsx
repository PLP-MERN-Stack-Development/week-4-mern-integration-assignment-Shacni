import React, { useState, useEffect } from 'react';
import api from '../services/api';

const PostForm = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => setError('Failed to load categories'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post('/posts', { title, content, category });
      setTitle('');
      setContent('');
      setCategory('');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: '2rem auto', padding: '2rem', background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2d3748' }}>Create Post</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: 4 }}>Title:</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #cbd5e1' }} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: 4 }}>Content:</label>
        <textarea value={content} onChange={e => setContent(e.target.value)} required rows={5} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #cbd5e1' }} />
      </div>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: 4 }}>Category:</label>
        <select value={category} onChange={e => setCategory(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #cbd5e1' }}>
          <option value="">Select category</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={loading} style={{ width: '100%', padding: 10, borderRadius: 6, background: '#3182ce', color: 'white', fontWeight: 600, border: 'none', fontSize: 16 }}>
        {loading ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
};

export default PostForm; 