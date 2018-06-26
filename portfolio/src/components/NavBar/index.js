import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./index.css";

class NavBar extends Component {
  render() {
    return (
      <div className="nav-container">

        <div className="nav">
          {/* <span className="logo"><img src="/images/TF_logo.jpg" /></span> */}
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
          <a
            href="http://tarafenton.com/resume/Tara%20Fenton.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </div>
      </div>
    );
  }
}

export default NavBar;
