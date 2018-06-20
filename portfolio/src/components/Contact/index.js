import React, { Component } from "react";
import "./index.css";

import MdEmail from "react-icons/lib/md/email";
import FaPhone from "react-icons/lib/fa/phone";
import FaGlobe from "react-icons/lib/fa/globe";
import FaLinkedIn from "react-icons/lib/fa/linkedin";
import FaGithub from "react-icons/lib/fa/github";

class Contact extends Component {
  render() {
    return (
      <div className="contact">
        <div className="contact-item">
          <span className="icon">
            <MdEmail />
          </span>
          <a href="mailto:tarafenton21@gmail.com">tarafenton21@gmail.com</a>

        </div>
        <div className="contact-item">
          <span className="icon">
            <FaPhone />
          </span>
          954.560.2406
        </div>
        <div className="contact-item">
          <span className="icon">
            <FaGlobe />
          </span>
          New York, NY
        </div>
        <div className="contact-item">
          <span className="icon">
            <FaLinkedIn />
          </span>
          <a href="https://www.linkedin.com/in/tarafenton/">tarafenton</a>
        </div>
        <div className="contact-item">
          <span className="icon">
            <FaGithub />
          </span>
          <a href="https://github.com/tara-fenton">tara-fenton</a>
        </div>
      </div>
    );
  }
}

export default Contact;
