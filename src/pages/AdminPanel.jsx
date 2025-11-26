import { useState, useEffect } from 'react';
import '../styles/admin.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('topics');
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Form state for new topic
  const [topicForm, setTopicForm] = useState({
    title: '',
    description: '',
    category: 'web',
    difficulty: 'beginner',
    duration: '',
    technologies: [],
    resources: 0,
    complexity: 1,
    image: '',
    learningObjectives: [],
    prerequisites: [],
    expectedOutcomes: [],
    isTrending: false,
    popularity: 50
  });

  // Fetch all topics
  const fetchTopics = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/topics');
      const data = await response.json();
      
      if (data.success) {
        setTopics(data.data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to fetch topics: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'topics') {
      fetchTopics();
    }
  }, [activeTab]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTopicForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle array fields (technologies, etc.)
  const handleArrayInput = (field, value) => {
    const values = value.split(',').map(v => v.trim()).filter(v => v);
    setTopicForm(prev => ({
      ...prev,
      [field]: values
    }));
  };

  // Create new topic
  const handleCreateTopic = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:5000/api/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(topicForm)
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Topic created successfully!' });
        setTopicForm({
          title: '',
          description: '',
          category: 'web',
          difficulty: 'beginner',
          duration: '',
          technologies: [],
          resources: 0,
          complexity: 1,
          image: '',
          learningObjectives: [],
          prerequisites: [],
          expectedOutcomes: [],
          isTrending: false,
          popularity: 50
        });
        fetchTopics(); // Refresh the list
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to create topic: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  // Delete topic
  const handleDeleteTopic = async (topicId) => {
    if (!window.confirm('Are you sure you want to delete this topic?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/topics/${topicId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Topic deleted successfully!' });
        fetchTopics(); // Refresh the list
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete topic: ' + error.message });
    }
  };

  // Categories for dropdown
  const categories = [
    { value: 'web', label: 'Web Development' },
    { value: 'mobile', label: 'Mobile Apps' },
    { value: 'ai', label: 'AI & Machine Learning' },
    { value: 'data', label: 'Data Science' },
    { value: 'iot', label: 'IoT' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'cybersecurity', label: 'Cybersecurity' }
  ];

  const difficulties = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Admin Panel</h1>
        <p className="admin-subtitle">Manage project topics and system settings</p>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-tabs">
        <button 
          className={`tab ${activeTab === 'topics' ? 'active' : ''}`}
          onClick={() => setActiveTab('topics')}
        >
          📋 Manage Topics
        </button>
        <button 
          className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📊 Analytics
        </button>
        <button 
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          ⚙️ Settings
        </button>
      </div>

      {/* Message Display */}
      {message.text && (
        <div className={`admin-message ${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Topics Management */}
      {activeTab === 'topics' && (
        <div className="admin-content">
          <div className="content-grid">
            {/* Create Topic Form */}
            <div className="form-section">
              <h2 className="section-title">Create New Project Topic</h2>
              <form onSubmit={handleCreateTopic} className="topic-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="title">Title *</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={topicForm.title}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter project title"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category *</label>
                    <select
                      id="category"
                      name="category"
                      value={topicForm.category}
                      onChange={handleInputChange}
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={topicForm.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    placeholder="Enter project description"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="difficulty">Difficulty *</label>
                    <select
                      id="difficulty"
                      name="difficulty"
                      value={topicForm.difficulty}
                      onChange={handleInputChange}
                      required
                    >
                      {difficulties.map(diff => (
                        <option key={diff.value} value={diff.value}>
                          {diff.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="duration">Duration *</label>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      value={topicForm.duration}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 3-4 months"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="complexity">Complexity (1-10)</label>
                    <input
                      type="number"
                      id="complexity"
                      name="complexity"
                      value={topicForm.complexity}
                      onChange={handleInputChange}
                      min="1"
                      max="10"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="resources">Resources</label>
                    <input
                      type="number"
                      id="resources"
                      name="resources"
                      value={topicForm.resources}
                      onChange={handleInputChange}
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="popularity">Popularity (%)</label>
                    <input
                      type="number"
                      id="popularity"
                      name="popularity"
                      value={topicForm.popularity}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                    />
                  </div>
                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="isTrending"
                        checked={topicForm.isTrending}
                        onChange={handleInputChange}
                      />
                      <span className="checkmark"></span>
                      Trending Topic
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="technologies">Technologies (comma-separated)</label>
                  <input
                    type="text"
                    id="technologies"
                    name="technologies"
                    onChange={(e) => handleArrayInput('technologies', e.target.value)}
                    placeholder="e.g., React, Node.js, MongoDB"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="image">Image URL</label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={topicForm.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="learningObjectives">Learning Objectives (comma-separated)</label>
                  <textarea
                    id="learningObjectives"
                    name="learningObjectives"
                    onChange={(e) => handleArrayInput('learningObjectives', e.target.value)}
                    rows="3"
                    placeholder="What students will learn from this project"
                  />
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Topic'}
                </button>
              </form>
            </div>

            {/* Topics List */}
            <div className="list-section">
              <h2 className="section-title">Existing Topics ({topics.length})</h2>
              
              {loading ? (
                <div className="loading">Loading topics...</div>
              ) : (
                <div className="topics-list">
                  {topics.map(topic => (
                    <div key={topic._id} className="topic-item">
                      <div className="topic-info">
                        <h4 className="topic-title">{topic.title}</h4>
                        <div className="topic-meta">
                          <span className="topic-category">{topic.category}</span>
                          <span className="topic-difficulty">{topic.difficulty}</span>
                          <span className="topic-duration">{topic.duration}</span>
                          {topic.isTrending && <span className="trending-badge">Trending</span>}
                        </div>
                        <p className="topic-description">{topic.description}</p>
                      </div>
                      <div className="topic-actions">
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeleteTopic(topic._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {topics.length === 0 && (
                    <div className="empty-state">
                      <p>No topics found. Create your first project topic!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="admin-content">
          <h2 className="section-title">Analytics Dashboard</h2>
          <div className="analytics-grid">
            <div className="stat-card">
              <h3>Total Topics</h3>
              <p className="stat-number">{topics.length}</p>
            </div>
            <div className="stat-card">
              <h3>Trending Topics</h3>
              <p className="stat-number">{topics.filter(t => t.isTrending).length}</p>
            </div>
            <div className="stat-card">
              <h3>Average Complexity</h3>
              <p className="stat-number">
                {topics.length > 0 
                  ? (topics.reduce((acc, t) => acc + t.complexity, 0) / topics.length).toFixed(1)
                  : '0'
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="admin-content">
          <h2 className="section-title">System Settings</h2>
          <div className="settings-section">
            <p>System configuration options will be available here.</p>
            {/* Add settings form fields as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;