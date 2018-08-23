import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "./index.css";

class NavBar extends Component {

  render() {

    return (
      <div className="nav-container">

        <div className="nav">
          {/* <span className="logo"><img src="/images/TF_logo.jpg" /></span> */}
          {/* <Link to="/">Home</Link> */}
          <NavLink to="/about" activeClassName="active">About</NavLink>
          <NavLink to="/projects" activeClassName="active">Projects</NavLink>
          <NavLink to="/contact" activeClassName="active">Contact</NavLink>
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
