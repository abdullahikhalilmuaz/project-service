import { useState, useEffect } from 'react';
import '../styles/landing.css';

const Landing = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { name: 'Web Development', icon: '🌐', count: '150+', color: '#6366f1' },
    { name: 'Mobile Apps', icon: '📱', count: '120+', color: '#10b981' },
    { name: 'AI & ML', icon: '🤖', count: '200+', color: '#f59e0b' },
    { name: 'Data Science', icon: '📊', count: '180+', color: '#ef4444' },
    { name: 'IoT', icon: '🔌', count: '90+', color: '#8b5cf6' },
    { name: 'Blockchain', icon: '⛓️', count: '75+', color: '#06b6d4' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Computer Science Student',
      text: 'This platform helped me find the perfect project idea for my final year. The variety of topics is amazing and the wishlist feature kept me organized!',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      role: 'Software Engineering Student',
      text: 'I was struggling to come up with an innovative idea. This platform not only gave me ideas but also helped me understand what\'s trending in the industry.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Priya Sharma',
      role: 'IT Student',
      text: 'The categorization makes it so easy to explore projects in my area of interest. I found my dream project in just 15 minutes!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const featuredProjects = [
    {
      title: 'Smart Home Automation System',
      category: 'IoT',
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    },
    {
      title: 'AI-Powered Chatbot for Education',
      category: 'AI & ML',
      difficulty: 'Advanced',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop'
    },
    {
      title: 'E-Commerce Platform with Analytics',
      category: 'Web Development',
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop'
    }
  ];

  return (
    <div className="landing-container">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-content">
          <div className="logo">
            <span className="logo-icon">💡</span>
            <span className="logo-text">ProjectHub</span>
          </div>
          <div className="nav-links">
            {/* <a href="#home">Home</a>
            <a href="#projects">Projects</a>
            <a href="#categories">Categories</a>
            <a href="#testimonials">Testimonials</a> */}
          </div>
          <div className="nav-buttons">
            <button className="btn-secondary">Login</button>
            <button className="btn-primary">Register</button>
          </div>
        </div>
      </nav>

   <div className='idioms'>
       {/* Hero Section */}
      <div className="hero-section" id="home">
        <div className="hero-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">🎓</span>
            For Final Year Students
          </div>
          <h1 className="hero-title">
            Discover Your Perfect
            <span className="gradient-text"> Final Year Project</span>
          </h1>
          <p className="hero-subtitle">
            Browse through 800+ innovative project ideas across multiple domains.
            Save your favorites, explore trending topics, and kickstart your academic journey.
          </p>
          <div className="hero-buttons">
            <button className="btn-hero-primary">
              <span className="btn-glow"></span>
              Get Started Free
            </button>
            <button className="btn-hero-secondary">
              <span className="play-icon">▶</span>
              Watch Demo
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">800+</div>
              <div className="stat-label">Project Ideas</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5K+</div>
              <div className="stat-label">Happy Students</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Categories</div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Get started in three simple steps</p>
        </div>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-icon">🔍</div>
            <h3 className="step-title">Browse Projects</h3>
            <p className="step-description">
              Explore our extensive collection of project ideas across various domains and technologies.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-icon">❤️</div>
            <h3 className="step-title">Save Favorites</h3>
            <p className="step-description">
              Add interesting projects to your wishlist and organize them for easy access later.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-icon">🚀</div>
            <h3 className="step-title">Start Building</h3>
            <p className="step-description">
              Get detailed project descriptions and resources to kickstart your final year project.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section" id="categories">
        <div className="section-header">
          <h2 className="section-title">Explore by Category</h2>
          <p className="section-subtitle">Find projects in your area of interest</p>
        </div>
        <div className="categories-grid">
          {/* {categories.map((category, index) => (
            <div 
              key={index} 
              className="category-card"
              style={{ '--category-color': category.color } as React.CSSProperties}
            >
              <div className="category-icon">{category.icon}</div>
              <h3 className="category-name">{category.name}</h3>
              <p className="category-count">{category.count} Projects</p>
              <div className="category-hover-effect"></div>
            </div>
          ))} */}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="featured-section" id="projects">
        <div className="section-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Popular choices among students</p>
        </div>
        <div className="featured-grid">
          {featuredProjects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image-wrapper">
                <img src={project.image} alt={project.title} className="project-image" />
                <div className="project-overlay">
                  <button className="overlay-btn">View Details</button>
                </div>
                <div className="project-badge">{project.difficulty}</div>
              </div>
              <div className="project-content">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <div className="project-actions">
                  <button className="project-btn favorite">❤️</button>
                  <button className="project-btn share">↗️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" id="testimonials">
        <div className="section-header">
          <h2 className="section-title">What Students Say</h2>
          <p className="section-subtitle">Join thousands of successful students</p>
        </div>
        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">{testimonials[activeTestimonial].text}</p>
              <div className="testimonial-author">
                <img 
                  src={testimonials[activeTestimonial].avatar} 
                  alt={testimonials[activeTestimonial].name}
                  className="author-avatar"
                />
                <div className="author-info">
                  <div className="author-name">{testimonials[activeTestimonial].name}</div>
                  <div className="author-role">{testimonials[activeTestimonial].role}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === activeTestimonial ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(index)}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-background"></div>
        <div className="cta-content">
          <h2 className="cta-title">Ready to Find Your Perfect Project?</h2>
          <p className="cta-subtitle">Join thousands of students who found their ideal final year project</p>
          <div className="cta-buttons">
            <button className="btn-cta-primary">
              <span className="btn-glow"></span>
              Start Exploring Now
            </button>
            <button className="btn-cta-secondary">Learn More</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-icon">💡</span>
                <span className="logo-text">ProjectHub</span>
              </div>
              <p className="footer-description">
                Your ultimate destination for discovering innovative final year project ideas.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">📘</a>
                <a href="#" className="social-link">🐦</a>
                <a href="#" className="social-link">📷</a>
                <a href="#" className="social-link">💼</a>
              </div>
            </div>
            <div className="footer-links-grid">
              <div className="footer-column">
                <h4 className="footer-heading">Quick Links</h4>
                <ul className="footer-links">
                  <li><a href="#home">Home</a></li>
                  <li><a href="#projects">Browse Projects</a></li>
                  <li><a href="#categories">Categories</a></li>
                  <li><a href="#about">About Us</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4 className="footer-heading">Resources</h4>
                <ul className="footer-links">
                  <li><a href="#help">Help Center</a></li>
                  <li><a href="#blog">Blog</a></li>
                  <li><a href="#contact">Contact</a></li>
                  <li><a href="#faq">FAQ</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4 className="footer-heading">Legal</h4>
                <ul className="footer-links">
                  <li><a href="#privacy">Privacy Policy</a></li>
                  <li><a href="#terms">Terms of Service</a></li>
                  <li><a href="#cookies">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 ProjectHub. All rights reserved.</p>
            <div className="footer-meta">
              <span>Made with ❤️ for students</span>
            </div>
          </div>
        </div>
      </footer>
   </div>
    </div>
  );
};

export default Landing;