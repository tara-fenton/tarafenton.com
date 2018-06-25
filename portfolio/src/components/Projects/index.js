import React, { Component } from "react";
import "./index.css";
import data from "../../data/projects.json";

class Projects extends Component {
  render() {

    const projects = data.map(project => {
      return (
        <div className="projects" key={`/images/${project.display_id}`}>
          <div className="">
            <img
              src={`/images/${project.image}`}
              alt={`${project.title}`}
              className="project"
            />
          </div>

          <div className="right">
            <div className="title">{`${project.title}`}</div>
            <span className="tech">
              Technologies: {`${project.techonologies}`}
            </span>

            <p className="description">{`${project.description}`}</p>
            <div>
              <span className="github">
                <a
                  href={`https://github.com/tara-fenton/${project.github}`}
                  target="_blank"
                >
                  github
                </a>
              </span>
              <span className="url">
                <a
                  href={`http://tarafenton.com/${project.url}`}
                  target="_blank"
                >
                  app
                </a>
              </span>
            </div>
          </div>
        </div>
      );
    });
    return <div className="project-container">{projects}</div>;
  }
}

export default Projects;
