import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          TechCrunch
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/blog" className="nav-link">
              Blog
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;