import React, { Component } from 'react';
import { Header } from './components/Header'
import { Info } from './components/Info'
import { Experience } from './components/Experience'
import { Education } from './components/Education'
import { Input } from './components/Input'
import { Footer } from './components/Footer'

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
        <Input type="text" inputID="test"></Input>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
