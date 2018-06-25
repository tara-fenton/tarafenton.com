import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import About from "./components/About";
import Projects from "./components/Projects";
import Home from "./components/Home";
import Contact from "./components/Contact";
// import Footer from './components/Footer';
import NavBar from "./components/NavBar";

class App extends Component {
  render() {
    const HomeComponent = () => <Home />;
    const AboutComponent = () => <About />;
    const ProjectsComponent = () => <Projects />;
    const ContactComponent = () => <Contact />;

    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" render={AboutComponent} />
          <Route exact path="/home" render={HomeComponent} />
          <Route exact path="/about" render={AboutComponent} />
          <Route exact path="/projects" render={ProjectsComponent} />
          <Route exact path="/contact" render={ContactComponent} />
        </Switch>
      </div>
    );
  }
}

export default App;
