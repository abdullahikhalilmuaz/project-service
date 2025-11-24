import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBook, FaSignInAlt, FaUserPlus } from "react-icons/fa"; // Add these icons

function Navbar() {
  const location = useLocation();

  // Don't show navbar on login and register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const isLoggedIn = location.pathname === "/home" || location.pathname === "/topics";

  return (
    <nav style={navbarStyle}>
      <div style={navContainerStyle}>
        {/* Logo/Brand */}
        <div style={brandStyle}>
         <div className="menu">
            <div></div>
            <div></div>
            <div></div>
         </div>
        </div>

        {/* Navigation Links */}
        <div style={linksContainerStyle}>
          {!isLoggedIn ? (
            <>
             
            </>
          ) : (
            <>
              <Link 
                to="/home" 
                style={{
                  ...linkStyle,
                  ...(location.pathname === "/home" ? activeLinkStyle : {})
                }}
              >
                <FaHome style={{ marginRight: "0.3rem" }} />
              </Link>
              <Link 
                to="/topics" 
                style={{
                  ...linkStyle,
                  ...(location.pathname === "/topics" ? activeLinkStyle : {})
                }}
              >
                <FaBook style={{ marginRight: "0.3rem" }} />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
// Enhanced Styles
const navbarStyle = {
  backgroundColor: "#2c3e5098",
//   padding: "1rem 0",
  position: "fixed",
  bottom: "10px",
  left: "30%",
  right: "30%",
  margin: "0px auto",
  display: "flex",
  alignItems:"center",
  justifyContent:"center",
  zIndex: 1000,
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
  fontSize: "1.5rem",
  fontWeight: "bold",
};

const brandLinkStyle = {
  color: "#383737ff",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

const linksContainerStyle = {
  display: "flex",
  gap: "1rem",
  alignItems: "center",
};

const linkStyle = {
    color: "#383737ff",
  textDecoration: "none",
  padding: "0.5rem 1rem",
  borderRadius: "6px",
  transition: "all 0.3s ease",
  fontSize: "2rem",
};

const activeLinkStyle = {
  color: "white",
};

const registerButtonStyle = {
  backgroundColor: "#e74c3c",
  color: "white",
};

// Add hover effects using CSS-in-JS
Object.assign(linkStyle, {
  ":hover": {
    transform: "translateY(-1px)",
  },
});

Object.assign(registerButtonStyle, {
  ":hover": {
    backgroundColor: "#c0392b",
    transform: "translateY(-1px)",
  },
});

export default Navbar;