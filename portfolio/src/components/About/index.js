import React, { Component } from "react";
import "./index.css";

// import headshot from "../../images/headshot.png";

class About extends Component {
  render() {
    return (
      <div className="about">
        {/* <div className="headshot">
          <img src={headshot} className="thumb" alt="Tara Fenton headshot" />
        </div> */}
        <div className="right">
          <p>
            Coming from a flash development background before GA I was able to
            be an inspiration and resource to others, while pushing myself and
            being fearless throughout the course.
          </p>
          <p>
            I'm a great communicator with an excellent sense of humor. I'm a
            team player that's motivated & driven.
          </p>
        </div>
      </div>
    );
  }
}

export default About;
