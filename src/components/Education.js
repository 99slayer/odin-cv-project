import React, { Component } from 'react';
import { Input } from './Input';
import '../styles/Education.css';

export class Education extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div>
        <h2>Education</h2>
        <button>NEW</button>
      </div>
    );
  };
};
