import React, { Component } from 'react';
import { Header } from './components/Header';
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
        <Header></Header>
        <Info></Info>
        <Experience></Experience>
        <Education></Education>
      </div>
    );
  }
}

export default App;
