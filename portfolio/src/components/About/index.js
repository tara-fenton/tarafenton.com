import React, { Component } from "react";
import "./index.css";

class About extends Component {
  render() {
    return (
      <div className="about">
        <div className="headshot">
          <img
            src="/images/headshot.png"
            className="thumb"
            alt="Tara Fenton headshot"
          />
        </div>
        <div className="right">
          <p>
            I'm looking for an opportunity that will allow me to continue
            creating exciting apps and exploring the newest techonologies.
          </p>
          <p>
            Coming from a flash development background I am able to be an
            inspiration and resource to others, while pushing myself and being
            fearless throughout my career.
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
