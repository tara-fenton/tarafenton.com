import React, { Component } from "react";
import "./index.css";

class Projects extends Component {
  render() {
    return (
      <div className="project-container">
        {/* Project 1 - Whats That */}
        <div className="projects">
          <div className="">
            <img
              src={"/images/whatsThat.png"}
              alt="What's That"
              className="project"
            />
          </div>

          <div className="right">
            <div className="title">What's That</div>
            <span className="tech">
              Technologies: React Native, Clarifai API
            </span>

            <p className="description">
              This app let's you take a picture and it says out loud what is in
              the image. Using the Clarifai API to determine what concepts are
              in the image and using the react-native-speech npm package to
              create audio output to describe what is in the image.
            </p>
            <div>
              <span className="github">
                <a
                  href="https://github.com/tara-fenton/whats-that-rn"
                  target="_blank"
                >
                  github
                </a>
              </span>
              <span className="url">
                <a
                  href="http://tarafenton.com/projects/whatsThat/whatsThat.MP4"
                  target="_blank"
                >
                  app
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Project 2 - Beer Tapper */}
        <div className="projects">
          <div className="">
            <img
              src={"/images/beer.png"}
              alt="Beer Tapper"
              className="project"
            />
          </div>

          <div className="right">
            <div className="title">Beer Tapper</div>
            <span className="tech">Technologies: JavaScript, CSS</span>

            <p className="description">
              This game is insprired by the arcade game Beer Tapper. The rules
              are simple.
              <ol>
                <li>
                  Serve your customers a beer before they reach the end of the
                  bar.
                </li>
                <li>Don’t over pour.</li>
                <li>Collect your empty glasses.</li>
              </ol>
            </p>
            <div>
              <span className="github">
                <a
                  href="https://github.com/tara-fenton/beer-tapper-js/blob/master/js/app.js"
                  target="_blank"
                >
                  github
                </a>
              </span>
              <span className="url">
                <a
                  href="http://tarafenton.com/projects/beer-tapper-js/"
                  target="_blank"
                >
                  game
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Project 3 - Beer Tapper */}
        <div className="projects">
          <div className="">
            <img
              src={"/images/connect.png"}
              alt="Connect Four"
              className="project"
            />
          </div>

          <div className="right">
            <div className="title">Connect 4</div>
            <span className="tech">Technologies: JavaScript, CSS</span>

            <p className="description">
              This game is inspired by the board game Connect Four. To win you
              must be the first player to get four of your colored checkers
              connecting in a row either horizontally, vertically or diagonally.
            </p>
            <div>
              <span className="github">
                <a
                  href="https://github.com/tara-fenton/tic-tac-toe-js/blob/master/connect4/js/connect4script.js"
                  target="_blank"
                >
                  github
                </a>
              </span>
              <span className="url">
                <a
                  href="http://tarafenton.com/projects/connect4/"
                  target="_blank"
                >
                  game
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Projects;
