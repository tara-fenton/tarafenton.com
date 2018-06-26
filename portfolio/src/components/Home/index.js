import React, { Component } from "react";
import "./index.css";
import data from "../../data/skills.json";

class Home extends Component {
  render() {
    const skills = data.map(skill => {
      return (
        <img
          src={`images/skillicons/${skill.image}`}
          alt="Gregor Cresnar Noun Project"
          className="skillicons"
          key={skill.display_id}
        />
      );
    });
    return (
      <div className="Home">
          {skills}
      </div>
    );
  }
}

export default Home;
