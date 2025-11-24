import { useState } from 'react';
import '../styles/auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register data:', formData);
    // Handle registration logic here
  };

  return (
    <div className='contnet-content-container'>

    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-shapes">
          <div className="auth-shape shape-1"></div>
          <div className="auth-shape shape-2"></div>
          <div className="auth-shape shape-3"></div>
        </div>
      </div>
      
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="logo-icon">💡</span>
            <span className="logo-text">ProjectHub</span>
          </div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join thousands of students finding their perfect projects</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Create password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                placeholder="Confirm password"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="role" className="form-label">I am a</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-select"
            >
              <option value="student">Student</option>
              <option value="mentor">Mentor</option>
              <option value="professional">Professional</option>
            </select>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="checkbox-input"
                required
              />
              <span className="checkbox-custom"></span>
              I agree to the{' '}
              <a href="#terms" className="terms-link">Terms of Service</a> and{' '}
              <a href="#privacy" className="terms-link">Privacy Policy</a>
            </label>
          </div>

          <button type="submit" className="auth-btn primary">
            Create Account
          </button>
        </form>

        <div className="auth-divider">
          <span>Or sign up with</span>
        </div>

        <div className="social-auth">
          <button className="social-btn google">
            <span className="social-icon">🔍</span>
            Google
          </button>
          <button className="social-btn github">
            <span className="social-icon">💻</span>
            GitHub
          </button>
        </div>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <a href="/login" className="auth-link">Sign in</a>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;