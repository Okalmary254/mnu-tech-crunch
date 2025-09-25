import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [search, setSearch] = useState(params.get("q") || "");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const q = e.target.value;
    if (q) {
      navigate(`/?q=${encodeURIComponent(q)}`);
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="navbar">
      <div className="container flex items-center justify-between">
        <Link to="/" className="navbar-brand" style={{fontFamily:'Times New Roman', fontWeight:'bold', fontSize:24}}>
          MNU Crunch
        </Link>
        <ul className="navbar-nav flex-1 items-center">
          <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
          <li className="nav-item"><Link to="/business" className="nav-link">Business</Link></li>
          <li className="nav-item"><Link to="/technology" className="nav-link">Technology</Link></li>
          <li className="nav-item"><Link to="/health" className="nav-link">Health</Link></li>
          <li className="nav-item"><Link to="/entertainment" className="nav-link">Entertainment</Link></li>
          <li className="nav-item"><Link to="/sports" className="nav-link">Sports</Link></li>
          <li className="nav-item"><Link to="/politics" className="nav-link">Politics</Link></li>
          {/* <li className="nav-item"><Link to="/add-post" className="nav-link">Add Post</Link></li> */}
          <li className="nav-item nav-search">
            <span className="search-icon" style={{display:'inline-flex',alignItems:'center'}}>
              <svg width="20" height="20" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={search}
                onChange={handleSearch}
                style={{marginLeft:8, background:'#f8fafc', border:'none', borderRadius:6, padding:'0.25rem 0.75rem', fontSize:'1rem', width:120}}
              />
            </span>
          </li>
          <li className="nav-item"><ThemeToggle /></li>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link" title="User Dashboard" style={{display:'inline-flex',alignItems:'center',padding:'0.25rem 0.75rem'}}>
              <svg width="22" height="22" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24" style={{marginRight:0}}>
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6"/>
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;