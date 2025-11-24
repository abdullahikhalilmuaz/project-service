import { useState, useEffect } from 'react';
import '../styles/home.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [user, setUser] = useState({
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    role: 'Computer Science Student'
  });

  const categories = [
    { id: 'all', name: 'All Projects', count: 12, icon: '📁' },
    { id: 'web', name: 'Web Development', count: 5, icon: '🌐' },
    { id: 'mobile', name: 'Mobile Apps', count: 3, icon: '📱' },
    { id: 'ai', name: 'AI & ML', count: 2, icon: '🤖' },
    { id: 'data', name: 'Data Science', count: 1, icon: '📊' },
    { id: 'iot', name: 'IoT', count: 1, icon: '🔌' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Smart Home Automation System',
      description: 'Build an IoT-based home automation system with voice control and mobile app integration.',
      category: 'iot',
      difficulty: 'Intermediate',
      duration: '3-4 months',
      likes: 124,
      isLiked: true,
      isSaved: true,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: 'AI-Powered Chatbot for Education',
      description: 'Create an intelligent chatbot that helps students with course materials and assignments.',
      category: 'ai',
      difficulty: 'Advanced',
      duration: '4-5 months',
      likes: 89,
      isLiked: false,
      isSaved: true,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'E-Commerce Platform with Analytics',
      description: 'Develop a full-stack e-commerce solution with real-time analytics dashboard.',
      category: 'web',
      difficulty: 'Intermediate',
      duration: '3-4 months',
      likes: 156,
      isLiked: true,
      isSaved: false,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop'
    },
    {
      id: 4,
      title: 'Fitness Tracking Mobile App',
      description: 'Build a cross-platform fitness app with workout plans and progress tracking.',
      category: 'mobile',
      difficulty: 'Beginner',
      duration: '2-3 months',
      likes: 67,
      isLiked: false,
      isSaved: false,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop'
    },
    {
      id: 5,
      title: 'Predictive Analytics Dashboard',
      description: 'Create a data visualization dashboard for business intelligence and predictions.',
      category: 'data',
      difficulty: 'Advanced',
      duration: '4-6 months',
      likes: 92,
      isLiked: false,
      isSaved: true,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop'
    },
    {
      id: 6,
      title: 'Blockchain Voting System',
      description: 'Implement a secure voting system using blockchain technology for transparency.',
      category: 'web',
      difficulty: 'Advanced',
      duration: '5-6 months',
      likes: 178,
      isLiked: true,
      isSaved: true,
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop'
    }
  ];

  const savedProjects = projects.filter(project => project.isSaved);
  const likedProjects = projects.filter(project => project.isLiked);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    
    if (activeTab === 'saved') {
      return matchesSearch && matchesCategory && project.isSaved;
    } else if (activeTab === 'liked') {
      return matchesSearch && matchesCategory && project.isLiked;
    }
    return matchesSearch && matchesCategory;
  });

  const handleLike = (projectId) => {
    console.log('Liked project:', projectId);
    // Implement like functionality
  };

  const handleSave = (projectId) => {
    console.log('Saved project:', projectId);
    // Implement save functionality
  };

  const handleViewDetails = (projectId) => {
    console.log('View details:', projectId);
    // Implement view details functionality
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="welcome-text">
              Welcome back, <span className="gradient-text">{user.name}</span>!
            </h1>
            <p className="welcome-subtitle">Ready to find your next amazing project?</p>
          </div>
          <div className="header-right">
            <div className="user-profile">
              <img src={user.avatar} alt={user.name} className="user-avatar" />
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-role">{user.role}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📁</div>
            <div className="stat-content">
              <div className="stat-number">{projects.length}</div>
              <div className="stat-label">Total Projects</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">❤️</div>
            <div className="stat-content">
              <div className="stat-number">{savedProjects.length}</div>
              <div className="stat-label">Saved Projects</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👍</div>
            <div className="stat-content">
              <div className="stat-number">{likedProjects.length}</div>
              <div className="stat-label">Liked Projects</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <div className="stat-number">3</div>
              <div className="stat-label">In Progress</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="home-main">
        <div className="main-content">
          {/* Search and Filters */}
          <div className="filters-section">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>

            <div className="tabs-container">
              <div className="tabs">
                <button
                  className={`tab ${activeTab === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveTab('all')}
                >
                  All Projects
                </button>
                <button
                  className={`tab ${activeTab === 'saved' ? 'active' : ''}`}
                  onClick={() => setActiveTab('saved')}
                >
                  Saved Projects
                </button>
                <button
                  className={`tab ${activeTab === 'liked' ? 'active' : ''}`}
                  onClick={() => setActiveTab('liked')}
                >
                  Liked Projects
                </button>
              </div>
            </div>
          </div>

          {/* Categories */}
          <section className="categories-section">
            <h2 className="section-title">Browse by Category</h2>
            <div className="categories-grid">
              {categories.map(category => (
                <div
                  key={category.id}
                  className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="category-icon">{category.icon}</div>
                  <div className="category-info">
                    <h3 className="category-name">{category.name}</h3>
                    <p className="category-count">{category.count} projects</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Grid */}
          <section className="projects-section">
            <div className="section-header">
              <h2 className="section-title">
                {activeTab === 'saved' ? 'Saved Projects' : 
                 activeTab === 'liked' ? 'Liked Projects' : 'Recommended Projects'}
              </h2>
              <p className="section-subtitle">
                {filteredProjects.length} projects found
              </p>
            </div>

            <div className="projects-grid">
              {filteredProjects.map(project => (
                <div key={project.id} className="project-card">
                  <div className="project-image-wrapper">
                    <img src={project.image} alt={project.title} className="project-image" />
                    <div className="project-overlay">
                      <button 
                        className="overlay-btn"
                        onClick={() => handleViewDetails(project.id)}
                      >
                        View Details
                      </button>
                    </div>
                    <div className="project-badge">{project.difficulty}</div>
                  </div>

                  <div className="project-content">
                    <span className="project-category">
                      {categories.find(cat => cat.id === project.category)?.name}
                    </span>
                    
                    <h3 className="project-title">{project.title}</h3>
                    
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-meta">
                      <span className="project-duration">⏱️ {project.duration}</span>
                      <span className="project-likes">❤️ {project.likes} likes</span>
                    </div>

                    <div className="project-actions">
                      <button
                        className={`action-btn like-btn ${project.isLiked ? 'liked' : ''}`}
                        onClick={() => handleLike(project.id)}
                      >
                        {project.isLiked ? '❤️' : '🤍'} Like
                      </button>
                      <button
                        className={`action-btn save-btn ${project.isSaved ? 'saved' : ''}`}
                        onClick={() => handleSave(project.id)}
                      >
                        {project.isSaved ? '📚' : '📖'} Save
                      </button>
                      <button
                        className="action-btn view-btn"
                        onClick={() => handleViewDetails(project.id)}
                      >
                        👀 View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3>No projects found</h3>
                <p>Try adjusting your search or filters</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;