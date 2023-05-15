import React from 'react';
import { Info } from './components/Info';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import './styles/App.css';

const App = () => {
  return (
    <div id='app'>
      <Info></Info>
      <Experience></Experience>
      <Education></Education>
    </div>
  );
}

export default App;
