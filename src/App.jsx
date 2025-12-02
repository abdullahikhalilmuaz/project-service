import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Topics from "./pages/Topics";
import AdminPanel from "./pages/AdminPanel";
import AdminDashboard from "./pages/AdminDashboard";

// Components
import Navbar from "./components/Navbar";
import ProposalPage from "./pages/ProposalPage";
// import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      {/* Navbar - automatically hidden on login/register */}
      <Navbar />
 
      {/* Routes */}
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 

        {/* Logged-in User Pages */}
        <Route path="/home" element={<Home />} /> 
        <Route path="/topics" element={<Topics />} /> 

        {/* Admin Pages */}
        <Route path="/admin/panel" element={<AdminPanel />} />
        <Route path="/my-proposals" element={<ProposalPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>

      {/* Footer Always Visible */}
      {/* <Footer /> */}
    </Router>
  );
}

export default App;