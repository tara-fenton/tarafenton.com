import React, { Component } from 'react';
import './App.css';

import About from './components/About/';
import Projects from './components/Projects';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <About />
        <Projects />
        <Footer />
        <NavBar />
      </div>
    );
  }
}

export default App;
