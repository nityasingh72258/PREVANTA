import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
     
<Link to="/" className="logo">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj6mO4WlFVPhoq2HCTWNWquE_9Y4ixUtAFAxVk7Jlb7lQCwZMy6d9-Bgg&s=10"
            alt="College Logo"
            className="college-logo"
          />


      
        PREVANTA
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/report">Report Issue</Link>
        <Link to="/tracking">Tracking</Link>
        <Link to="/register">Register</Link>
         <Link to="/Admin">Admin</Link>
      </div>

    </nav>
  );
}

export default Navbar;