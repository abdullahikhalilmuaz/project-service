import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Topics from "./pages/Topics";

// Components
import Navbar from "./components/Navbar";
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
      </Routes>

      {/* Footer Always Visible */}
      {/* <Footer /> */}
    </Router>
  );
}

export default App;