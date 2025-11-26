import { Link, useLocation } from "react-router-dom";
import { 
  HiHome, 
  HiCollection, 
  HiUser, 
  HiCog,
  HiLogout 
} from "react-icons/hi";

function Navbar() {
  const location = useLocation();

  // Don't show navbar on login and register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const isLoggedIn = location.pathname === "/home" || location.pathname === "/topics" || location.pathname === "/admin/panel";

  // Check if user is logged in via localStorage
  const checkLoginStatus = () => {
    try {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const loginData = localStorage.getItem('loginData');
      return isLoggedIn === 'true' && loginData !== null;
    } catch (error) {
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loginData');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/';
  };

  const getUserData = () => {
    try {
      const userData = localStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  };

  const userData = getUserData();
  const isAdminPanel = location.pathname === "/admin/panel";

  return (
    <nav style={navbarStyle}>
      <div style={navContainerStyle}>
        

        {/* Navigation Links */}
        <div style={linksContainerStyle}>
          {checkLoginStatus() ? (
            <>
              {/* Main Navigation */}
              <div style={navSectionStyle}>
                <Link 
                  to="/home" 
                  style={{
                    ...navItemStyle,
                    ...(location.pathname === "/home" ? activeNavItemStyle : {})
                  }}
                >
                  <HiHome style={iconStyle} />
                  <span style={navLabelStyle}>Home</span>
                </Link>
                
                <Link 
                  to="/topics" 
                  style={{
                    ...navItemStyle,
                    ...(location.pathname === "/topics" ? activeNavItemStyle : {})
                  }}
                >
                  <HiCollection style={iconStyle} />
                  <span style={navLabelStyle}>Topics</span>
                </Link>

                {/* Admin Panel Link - Only show if user is admin or on admin panel */}
                {(userData?.role === 'admin' || isAdminPanel) && (
                  <Link 
                    to="/admin/panel" 
                    style={{
                      ...navItemStyle,
                      ...(location.pathname === "/admin/panel" ? activeNavItemStyle : {})
                    }}
                  >
                    <HiCog style={iconStyle} />
                    <span style={navLabelStyle}>Admin</span>
                  </Link>
                )}
              </div>

              {/* User Section */}
              <div style={userSectionStyle}>
                {userData && (
                  <div style={userInfoStyle}>
                    <div style={userAvatarStyle}>
                      {userData.fullName?.charAt(0) || 'U'}
                    </div>
                    <div style={userDetailsStyle}>
                      <div style={userNameStyle}>
                        {userData.fullName || 'User'}
                      </div>
                      <div style={userRoleStyle}>
                        {userData.role ? userData.role.charAt(0).toUpperCase() + userData.role.slice(1) : 'Member'}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* <button 
                  onClick={handleLogout}
                  style={logoutButtonStyle}
                  title="Logout"
                >
                  <HiLogout style={iconStyle} />
                </button> */}
              </div>
            </>
          ) : (
            /* Public Navigation */
            <></>
          )}
        </div>
      </div>
    </nav>
  );
}

// Modern Styles
const navbarStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  padding: "0.75rem 0",
  position: "fixed",
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1000,
  boxShadow: "0 2px 20px rgba(0, 0, 0, 0.08)",
};

const navContainerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 2rem",
};

const brandStyle = {
  display: "flex",
  alignItems: "center",
};

const brandLinkStyle = {
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  padding: "0.5rem",
  borderRadius: "12px",
  transition: "all 0.2s ease",
  ":hover": {
    transform: "translateY(-1px)",
  }
};

const logoIconStyle = {
  fontSize: "2rem",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  borderRadius: "10px",
  padding: "0.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const logoTextStyle = {
  fontSize: "1.5rem",
  fontWeight: "700",
  background: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const linksContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "2rem",
};

const navSectionStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.5rem",
  borderRadius: "16px",
  backgroundColor: "rgba(0, 0, 0, 0.02)",
};

const navItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.75rem 1.25rem",
  borderRadius: "12px",
  textDecoration: "none",
  color: "#64748b",
  fontWeight: "500",
  fontSize: "0.95rem",
  transition: "all 0.2s ease",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    color: "#4f46e5",
    transform: "translateY(-1px)",
  }
};

const activeNavItemStyle = {
  backgroundColor: "rgba(99, 102, 241, 0.15)",
  color: "#4f46e5",
  fontWeight: "600",
};

const iconStyle = {
  fontSize: "1.25rem",
  flexShrink: 0,
};

const navLabelStyle = {
  fontSize: "0.9rem",
  fontWeight: "inherit",
};

const userSectionStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  padding: "0.5rem",
  borderRadius: "16px",
  backgroundColor: "rgba(0, 0, 0, 0.02)",
};

const userInfoStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  padding: "0.5rem 0.75rem",
  borderRadius: "12px",
  transition: "all 0.2s ease",
  ":hover": {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  }
};

const userAvatarStyle = {
  width: "2.5rem",
  height: "2.5rem",
  borderRadius: "50%",
  backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontWeight: "600",
  fontSize: "1rem",
};

const userDetailsStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.125rem",
};

const userNameStyle = {
  fontSize: "0.9rem",
  fontWeight: "600",
  color: "#1e293b",
  lineHeight: 1,
};

const userRoleStyle = {
  fontSize: "0.75rem",
  color: "#64748b",
  textTransform: "capitalize",
  lineHeight: 1,
};

const logoutButtonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.75rem",
  borderRadius: "12px",
  border: "none",
  backgroundColor: "rgba(239, 68, 68, 0.1)",
  color: "#dc2626",
  cursor: "pointer",
  transition: "all 0.2s ease",
  fontSize: "1.1rem",
  ":hover": {
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    transform: "translateY(-1px)",
  }
};

const publicNavStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

const publicNavItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.75rem 1.5rem",
  borderRadius: "12px",
  textDecoration: "none",
  color: "#64748b",
  fontWeight: "500",
  fontSize: "0.95rem",
  transition: "all 0.2s ease",
  backgroundColor: "rgba(0, 0, 0, 0.02)",
  ":hover": {
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    color: "#4f46e5",
    transform: "translateY(-1px)",
  }
};

export default Navbar;