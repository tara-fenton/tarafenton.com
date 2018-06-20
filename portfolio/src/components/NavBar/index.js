import React, { Component } from "react";
import {Link} from 'react-router-dom';

import "./index.css";

class NavBar extends Component {
  render() {
    return (
      <div className="nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>
      </div>
    );
  }
}

export default NavBar;