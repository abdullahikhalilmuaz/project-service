import { useState } from 'react';
import '../styles/auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    // agreeToTerms: false
  });

  const [loading, setLoading] = useState(false);
  const [serverResponse, setServerResponse] = useState({
    type: '', // 'success', 'error', 'warning', 'info'
    message: '',
    details: '' // Additional details from server
  });

   const handleBackToHome = () => {
    const locate = window.location.pathname = "/"
    window.location === locate
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Function to store login data in localStorage (same as login)
  const storeLoginData = (userData) => {
    try {
      const loginData = {
        user: userData.user || {},
        token: userData.token || '',
        loginTime: new Date().toISOString(),
        isLoggedIn: true
      };

      // Store the main login data
      localStorage.setItem('loginData', JSON.stringify(loginData));

      // Also store individual items for easy access
      if (userData.token) {
        localStorage.setItem('authToken', userData.token);
      }
      
      if (userData.user) {
        localStorage.setItem('userData', JSON.stringify(userData.user));
      }

      localStorage.setItem('isLoggedIn', 'true');
      
      console.log('Registration data stored successfully:', {
        user: userData.user ? `${userData.user.name || userData.user.email} registered and logged in` : 'No user data',
        token: userData.token ? 'Token stored' : 'No token',
        timestamp: new Date().toLocaleString()
      });

    } catch (error) {
      console.error('Error storing registration data:', error);
      throw new Error('Failed to save registration information');
    }
  };

  // Function to clear login data from localStorage (same as login)
  const clearLoginData = () => {
    localStorage.removeItem('loginData');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoggedIn');
  };

  // Function to check if user is already logged in (same as login)
  const checkLoginStatus = () => {
    try {
      const loginData = localStorage.getItem('loginData');
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      
      if (loginData && isLoggedIn === 'true') {
        const parsedData = JSON.parse(loginData);
        return {
          isLoggedIn: true,
          user: parsedData.user,
          token: parsedData.token,
          loginTime: parsedData.loginTime
        };
      }
      return { isLoggedIn: false };
    } catch (error) {
      console.error('Error checking login status:', error);
      return { isLoggedIn: false };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerResponse({ type: '', message: '', details: '' });

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setServerResponse({
        type: 'error',
        message: 'Password Mismatch',
        details: 'Password and confirm password do not match. Please make sure they are the same.'
      });
      return;
    }

    // Check if terms are agreed (if you enable the checkbox later)
    // if (!formData.agreeToTerms) {
    //   setServerResponse({
    //     type: 'error',
    //     message: 'Terms Not Accepted',
    //     details: 'You must agree to the terms and conditions to register.'
    //   });
    //   return;
    // }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        // Clear any existing login data on error
        clearLoginData();
        
        // Handle HTTP errors (4xx, 5xx)
        setServerResponse({
          type: 'error',
          message: data.message || `HTTP Error: ${response.status} ${response.statusText}`,
          details: data.details || data.error || 'Please check your input and try again.'
        });
        return;
      }

      if (data.success) {
        // Store login data in localStorage (auto-login after registration)
        if (data.token || data.user) {
          storeLoginData(data);
        }

        // Success response from server
        setServerResponse({
          type: 'success',
          message: data.message || 'Registration successful!',
          details: data.details || 'You have been automatically logged in. Redirecting to your dashboard...'
        });
        
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'student',
          // agreeToTerms: false
        });
        
        // Redirect after a brief delay to show success message
        setTimeout(() => {
          window.location.href = "/home";
        }, 2000);
      } else {
        // Clear any existing login data on failed registration
        clearLoginData();
        
        // Server returned success: false
        setServerResponse({
          type: 'error',
          message: data.message || 'Registration failed',
          details: data.details || data.reason || 'Please check your input and try again.'
        });
      }
    } catch (error) {
      // Clear any existing login data on error
      clearLoginData();
      
      // Network errors or JSON parsing errors
      console.error('Registration error:', error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setServerResponse({
          type: 'error',
          message: 'Network Error',
          details: 'Unable to connect to the server. Please check your internet connection and try again.'
        });
      } else if (error.name === 'SyntaxError') {
        setServerResponse({
          type: 'error',
          message: 'Invalid Server Response',
          details: 'The server returned an invalid response. Please try again later.'
        });
      } else {
        setServerResponse({
          type: 'error',
          message: 'Unexpected Error',
          details: error.message || 'An unexpected error occurred. Please try again.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to render appropriate message style based on type (same as login)
  const renderMessage = () => {
    if (!serverResponse.message) return null;

    const baseClass = "auth-message";
    const typeClass = `auth-message-${serverResponse.type}`;

    return (
      <div className={`${baseClass} ${typeClass}`}>
      
        <div className="auth-message-header">
          <span className="auth-message-icon">
            {serverResponse.type === 'success' && '✅'}
            {serverResponse.type === 'error' && '❌'}
            {serverResponse.type === 'warning' && '⚠️'}
            {serverResponse.type === 'info' && 'ℹ️'}
          </span>
          <strong className="auth-message-title">
            {serverResponse.type === 'success' && 'Success!'}
            {serverResponse.type === 'error' && 'Error!'}
            {serverResponse.type === 'warning' && 'Warning!'}
            {serverResponse.type === 'info' && 'Information'}
          </strong>
        </div>
        <div className="auth-message-content">
          <p className="auth-message-text">{serverResponse.message}</p>
          {serverResponse.details && (
            <p className="auth-message-details">{serverResponse.details}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className='contnet-content-container'>
      <div className="auth-container">
          <div style={{position:"absolute", fontSize:"50px", zIndex:9000, color:"gray", top:"0", left:"10px", fontWeight:"bolder", cursor:"pointer"}} onClick={handleBackToHome}>&laquo;</div>
      
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

          {/* Display All Messages Here */}
          <div className="auth-messages-container">
            {renderMessage()}
            
            {/* Additional debug info in development */}
            {process.env.NODE_ENV === 'development' && serverResponse.message && (
              <div className="auth-debug-info">
                <details>
                  <summary>Debug Information (Development Only)</summary>
                  <div className="debug-section">
                    <h4>Login Status:</h4>
                    <pre>{JSON.stringify(checkLoginStatus(), null, 2)}</pre>
                  </div>
                  <div className="debug-section">
                    <h4>Current State:</h4>
                    <pre>{JSON.stringify({
                      formData: {
                        ...formData,
                        password: '*'.repeat(formData.password.length),
                        confirmPassword: '*'.repeat(formData.confirmPassword.length)
                      },
                      loading,
                      serverResponse,
                      timestamp: new Date().toISOString()
                    }, null, 2)}</pre>
                  </div>
                </details>
              </div>
            )}
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
                disabled={loading}
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
                disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                disabled={loading}
              >
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
                <option value="professional">Professional</option>
              </select>
            </div>

            {/* Uncomment if you want to enable terms agreement */}
            {/* <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="checkbox-input"
                  disabled={loading}
                />
                <span className="checkbox-custom"></span>
                I agree to the{' '}
                <a href="#terms" className="terms-link">Terms of Service</a> and{' '}
                <a href="#privacy" className="terms-link">Privacy Policy</a>
              </label>
            </div> */}

            <button 
              type="submit" 
              className="auth-btn primary" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="auth-btn-spinner"></span>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>Or sign up with</span>
          </div>

          <div className="social-auth">
            <button 
              type="button" 
              className="social-btn google"
              disabled={loading}
            >
              <span className="social-icon">🔍</span>
              Google
            </button>
            <button 
              type="button" 
              className="social-btn github"
              disabled={loading}
            >
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