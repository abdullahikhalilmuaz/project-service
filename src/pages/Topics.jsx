import { useState, useEffect } from 'react';
import '../styles/topics.css';

const ProjectTopics = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

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

  const projectTopics = [
    {
      id: 1,
      title: 'Smart Home Automation System with Voice Control',
      description: 'Build an IoT-based home automation system that can be controlled via voice commands and mobile app. Includes features like lighting control, temperature monitoring, and security integration.',
      category: 'iot',
      difficulty: 'intermediate',
      duration: '4-5 months',
      popularity: 95,
      isTrending: true,
      technologies: ['Arduino', 'Node.js', 'React Native', 'AWS IoT'],
      resources: 12,
      complexity: 7,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: 'AI-Powered Educational Chatbot',
      description: 'Develop an intelligent chatbot that assists students with course materials, assignment help, and personalized learning recommendations using natural language processing.',
      category: 'ai',
      difficulty: 'advanced',
      duration: '5-6 months',
      popularity: 88,
      isTrending: true,
      technologies: ['Python', 'TensorFlow', 'React', 'MongoDB'],
      resources: 15,
      complexity: 8,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'E-Commerce Platform with Real-time Analytics',
      description: 'Create a full-stack e-commerce solution with real-time sales analytics, inventory management, and customer behavior tracking dashboard.',
      category: 'web',
      difficulty: 'intermediate',
      duration: '3-4 months',
      popularity: 92,
      isTrending: false,
      technologies: ['React', 'Node.js', 'PostgreSQL', 'D3.js'],
      resources: 10,
      complexity: 6,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop'
    },
    {
      id: 4,
      title: 'Blockchain-based Voting System',
      description: 'Implement a secure and transparent voting system using blockchain technology to ensure vote integrity and prevent fraud.',
      category: 'blockchain',
      difficulty: 'advanced',
      duration: '5-6 months',
      popularity: 78,
      isTrending: true,
      technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
      resources: 8,
      complexity: 9,
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop'
    },
    {
      id: 5,
      title: 'Fitness Tracking Mobile Application',
      description: 'Build a cross-platform fitness app with workout plans, progress tracking, social features, and AI-based personal training recommendations.',
      category: 'mobile',
      difficulty: 'beginner',
      duration: '2-3 months',
      popularity: 85,
      isTrending: false,
      technologies: ['React Native', 'Firebase', 'Redux', 'Chart.js'],
      resources: 6,
      complexity: 4,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop'
    },
    {
      id: 6,
      title: 'Predictive Analytics Dashboard for Business',
      description: 'Create a comprehensive data visualization dashboard for business intelligence with predictive analytics and real-time reporting features.',
      category: 'data',
      difficulty: 'advanced',
      duration: '4-5 months',
      popularity: 82,
      isTrending: false,
      technologies: ['Python', 'Django', 'React', 'Tableau'],
      resources: 14,
      complexity: 7,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop'
    },
    {
      id: 7,
      title: 'Cybersecurity Threat Detection System',
      description: 'Develop an intelligent system that detects and prevents cybersecurity threats using machine learning algorithms and real-time monitoring.',
      category: 'cybersecurity',
      difficulty: 'advanced',
      duration: '6-7 months',
      popularity: 75,
      isTrending: true,
      technologies: ['Python', 'TensorFlow', 'Elasticsearch', 'Kibana'],
      resources: 16,
      complexity: 9,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop'
    },
    {
      id: 8,
      title: 'Smart Agriculture Monitoring System',
      description: 'Create an IoT solution for precision agriculture with soil monitoring, automated irrigation, and crop health analysis using sensors and drones.',
      category: 'iot',
      difficulty: 'intermediate',
      duration: '4-5 months',
      popularity: 70,
      isTrending: false,
      technologies: ['Arduino', 'Python', 'React', 'AWS'],
      resources: 9,
      complexity: 6,
      image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129fe?w=400&h=250&fit=crop'
    }
  ];

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
    return selectedTopics.some(topic => topic.id === topicId);
  };

  const handleAddToWishlist = (topic) => {
    if (selectedTopics.length >= 3 && !isTopicSelected(topic.id)) {
      alert('You can only select up to 3 project topics for your proposal.');
      return;
    }

    if (isTopicSelected(topic.id)) {
      setSelectedTopics(selectedTopics.filter(t => t.id !== topic.id));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleRemoveFromWishlist = (topicId) => {
    setSelectedTopics(selectedTopics.filter(topic => topic.id !== topicId));
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

          {/* Topics Grid */}
          <div className="topics-grid-section">
            <div className="section-header">
              <h2 className="section-title">
                Available Project Topics ({filteredTopics.length})
              </h2>
              <div className="selection-info">
                <span className="selection-count">
                  {selectedTopics.length}/3 topics selected
                </span>
              </div>
            </div>

            <div className="topics-grid">
              {filteredTopics.map(topic => (
                <div key={topic.id} className="topic-card">
                  {topic.isTrending && (
                    <div className="trending-badge">🔥 Trending</div>
                  )}
                  
                  <div className="topic-image-wrapper">
                    <img src={topic.image} alt={topic.title} className="topic-image" />
                    <div className="topic-overlay">
                      <button 
                        className="overlay-btn"
                        onClick={() => handleAddToWishlist(topic)}
                      >
                        {isTopicSelected(topic.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      </button>
                    </div>
                  </div>

                  <div className="topic-content">
                    <div className="topic-meta">
                      <span className="topic-category">{categories.find(c => c.id === topic.category)?.name}</span>
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
                      {topic.technologies.slice(0, 3).map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                      {topic.technologies.length > 3 && (
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
                        <span className="stat-text">{topic.resources} resources</span>
                      </div>
                      <div className="stat">
                        <span className="stat-icon">⭐</span>
                        <span className="stat-text">{topic.popularity}% popular</span>
                      </div>
                    </div>

                    <button
                      className={`wishlist-btn ${isTopicSelected(topic.id) ? 'selected' : ''}`}
                      onClick={() => handleAddToWishlist(topic)}
                    >
                      <span className="btn-icon">
                        {isTopicSelected(topic.id) ? '✅' : '➕'}
                      </span>
                      {isTopicSelected(topic.id) ? 'Selected' : 'Add to Wishlist'}
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
                    <div key={topic.id} className="selected-topic">
                      <div className="selected-topic-content">
                        <h4 className="selected-topic-title">{topic.title}</h4>
                        <div className="selected-topic-meta">
                          <span className="topic-category">{categories.find(c => c.id === topic.category)?.name}</span>
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
                        onClick={() => handleRemoveFromWishlist(topic.id)}
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
                  {selectedTopics.reduce((acc, topic) => acc + topic.complexity, 0) / selectedTopics.length || 0}
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