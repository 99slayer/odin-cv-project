import React, { Component } from 'react';
import { Header } from './components/Header'
import { Info } from './components/Info'
import { Experience } from './components/Experience'
import { Education } from './components/Education'
import { Input } from './components/Input'

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
        <Input inputID="test" tag="textarea"></Input>
      </div>
    );
  }
}

export default App;
