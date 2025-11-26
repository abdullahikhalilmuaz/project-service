import { useState, useEffect } from 'react';
import '../styles/topics.css';

const ProjectTopics = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [projectTopics, setProjectTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'ai', name: 'AI & Machine Learning' },
    { id: 'data', name: 'Data Science' },
    { id: 'iot', name: 'IoT' },
    { id: 'blockchain', name: 'Blockchain' },
    { id: 'cybersecurity', name: 'Cybersecurity' }
  ];

  const difficulties = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  // Fetch project topics from backend
  useEffect(() => {
    const fetchProjectTopics = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/topics');
        
        if (!response.ok) {
          throw new Error('Failed to fetch project topics');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setProjectTopics(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch topics');
        }
      } catch (err) {
        console.error('Error fetching project topics:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectTopics();
  }, []);

  const filteredTopics = projectTopics
    .filter(topic => {
      const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          topic.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || topic.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.popularity - a.popularity;
        case 'duration':
          return a.duration.localeCompare(b.duration);
        case 'complexity':
          return a.complexity - b.complexity;
        default:
          return 0;
      }
    });

  const isTopicSelected = (topicId) => {
    return selectedTopics.some(topic => topic._id === topicId);
  };

  const handleAddToWishlist = (topic) => {
    if (selectedTopics.length >= 3 && !isTopicSelected(topic._id)) {
      alert('You can only select up to 3 project topics for your proposal.');
      return;
    }

    if (isTopicSelected(topic._id)) {
      setSelectedTopics(selectedTopics.filter(t => t._id !== topic._id));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleRemoveFromWishlist = (topicId) => {
    setSelectedTopics(selectedTopics.filter(topic => topic._id !== topicId));
  };

  const handleClearWishlist = () => {
    setSelectedTopics([]);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className="project-topics-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading project topics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-topics-container">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Topics</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-btn"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="project-topics-container">
      <div className="topics-header">
        <div className="header-content">
          <h1 className="page-title">Project Topics</h1>
          <p className="page-subtitle">
            Browse and select up to 3 project topics for your final year proposal
          </p>
        </div>
      </div>

      <div className="topics-layout">
        {/* Main Content */}
        <div className="topics-main">
          {/* Filters Section */}
          <div className="filters-section">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search project topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>

            {/* <div className="filter-controls">
              <div className="filter-group">
                <label htmlFor="category-filter">Category</label>
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="filter-select"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="difficulty-filter">Difficulty</label>
                <select
                  id="difficulty-filter"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="filter-select"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty.id} value={difficulty.id}>
                      {difficulty.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="sort-filter">Sort By</label>
                <select
                  id="sort-filter"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="popular">Most Popular</option>
                  <option value="duration">Duration</option>
                  <option value="complexity">Complexity</option>
                </select>
              </div>
            </div> */}
          </div>

          {/* Topics Grid */}
          <div className="topics-grid-section">
            <div className="section-header">
              <h2 className="section-title">
                Available Project Topics ({filteredTopics.length})
              </h2>
              <div className="selection-info">
                <span className="selection-count">
                  {selectedTopics.length}/{selectedTopics.length+1} topics selected
                </span>
              </div>
            </div>

            <div className="topics-grid">
              {filteredTopics.map(topic => (
                <div key={topic._id} className="topic-card">
                  {topic.isTrending && (
                    <div className="trending-badge">🔥 Trending</div>
                  )}
                  
                  <div className="topic-image-wrapper">
                    <img 
                      src={topic.image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop'} 
                      alt={topic.title} 
                      className="topic-image" 
                    />
                    <div className="topic-overlay">
                      <button 
                        className="overlay-btn"
                        onClick={() => handleAddToWishlist(topic)}
                      >
                        {isTopicSelected(topic._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      </button>
                    </div>
                  </div>

                  <div className="topic-content">
                    <div className="topic-meta">
                      <span className="topic-category">
                        {categories.find(c => c.id === topic.category)?.name || topic.category}
                      </span>
                      <span 
                        className="topic-difficulty"
                        style={{ color: getDifficultyColor(topic.difficulty) }}
                      >
                        {topic.difficulty}
                      </span>
                    </div>

                    <h3 className="topic-title">{topic.title}</h3>
                    <p className="topic-description">{topic.description}</p>

                    <div className="topic-technologies">
                      {topic.technologies?.slice(0, 3).map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                      {topic.technologies && topic.technologies.length > 3 && (
                        <span className="tech-tag">+{topic.technologies.length - 3} more</span>
                      )}
                    </div>

                    <div className="topic-stats">
                      <div className="stat">
                        <span className="stat-icon">⏱️</span>
                        <span className="stat-text">{topic.duration}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-icon">📚</span>
                        <span className="stat-text">{topic.resources || 0} resources</span>
                      </div>
                      <div className="stat">
                        <span className="stat-icon">⭐</span>
                        <span className="stat-text">{topic.popularity}% popular</span>
                      </div>
                    </div>

                    <button
                      className={`wishlist-btn ${isTopicSelected(topic._id) ? 'selected' : ''}`}
                      onClick={() => handleAddToWishlist(topic)}
                    >
                      <span className="btn-icon">
                        {isTopicSelected(topic._id) ? '✅' : '➕'}
                      </span>
                      {isTopicSelected(topic._id) ? 'Selected' : 'Add to Wishlist'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredTopics.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3>No project topics found</h3>
                <p>Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        </div>

        {/* Wishlist Sidebar */}
        <div className="wishlist-sidebar">
          <div className="wishlist-card">
            <div className="wishlist-header">
              <h3 className="wishlist-title">Your Project Proposal</h3>
              <p className="wishlist-subtitle">
                Selected Topics: {selectedTopics.length}/3
              </p>
            </div>

            <div className="wishlist-content">
              {selectedTopics.length === 0 ? (
                <div className="empty-wishlist">
                  <div className="empty-icon">📝</div>
                  <p>No topics selected yet</p>
                  <span>Browse and add up to 3 project topics</span>
                </div>
              ) : (
                <div className="selected-topics">
                  {selectedTopics.map(topic => (
                    <div key={topic._id} className="selected-topic">
                      <div className="selected-topic-content">
                        <h4 className="selected-topic-title">{topic.title}</h4>
                        <div className="selected-topic-meta">
                          <span className="topic-category">
                            {categories.find(c => c.id === topic.category)?.name || topic.category}
                          </span>
                          <span 
                            className="topic-difficulty"
                            style={{ color: getDifficultyColor(topic.difficulty) }}
                          >
                            {topic.difficulty}
                          </span>
                        </div>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveFromWishlist(topic._id)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {selectedTopics.length > 0 && (
                <div className="wishlist-actions">
                  <button className="clear-btn" onClick={handleClearWishlist}>
                    Clear All
                  </button>
                  <button 
                    className="submit-btn"
                    disabled={selectedTopics.length === 0}
                  >
                    Submit Proposal ({selectedTopics.length}/3)
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="stats-card">
            <h4>Selection Summary</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">{selectedTopics.length}</span>
                <span className="stat-label">Selected</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{3 - selectedTopics.length}</span>
                <span className="stat-label">Remaining</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {Math.round(selectedTopics.reduce((acc, topic) => acc + topic.complexity, 0) / selectedTopics.length || 0)}
                </span>
                <span className="stat-label">Avg. Complexity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTopics;