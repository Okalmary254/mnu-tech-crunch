import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          MNU Crunch
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/business" className="nav-link">
              Business
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/technology" className="nav-link">
              Technology
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/health" className="nav-link">
              Health
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/entertainment" className="nav-link">
              Entertainment
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/sports" className="nav-link">
              Sports
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/politics" className="nav-link">
              Politics
            </Link>
          </li>
            {/* <li className="nav-item">
            <Link to="/add-post" className="nav-link">
              Add Post
            </Link>
          </li> */}
          <li className="nav-item">
            <Link to="/search" className="nav-link">
              Search
            </Link>
          </li>
            <li className="nav-item">
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;