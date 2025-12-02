import { Link } from "react-router-dom";
import { 
  HiHome, 
  HiCollection, 
  HiUser, 
  HiCog,
  HiLogout 
} from "react-icons/hi";
import { useEffect } from "react";


export default function NavIcons() {

    if(window.location.href === "/login") {
        return <></>
    } else if (window.location.href === "/register") {
        return <></>
    } else   {

    return <>
    
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
                <Link 
                  to="/my-proposals" 
                  style={{
                    ...navItemStyle,
                    ...(location.pathname === "/topics" ? activeNavItemStyle : {})
                  }}
                >
                  <HiCollection style={iconStyle} />
                  <span style={navLabelStyle}>Proposals</span>
                </Link>

              </div>

    </>
    }
}



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