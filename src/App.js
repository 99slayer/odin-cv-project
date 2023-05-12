import React, { Component } from 'react';
import { Info } from './components/Info';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import './styles/App.css';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id='app'>
        <Info></Info>
        <Experience></Experience>
        <Education></Education>
      </div>
    );
  }
}

export default App;
