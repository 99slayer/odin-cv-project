import React, { Component } from 'react';
import uniqid from 'uniqid';
import { Input } from './Input';
import '../styles/Info.css';

export class Info extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: {
        link: '',
        id: uniqid()
      },
      links: [],
      editing: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.startEditing = this.startEditing.bind(this);
    this.addLink = this.addLink.bind(this);
  };

  handleChange = (e) => {
    this.setState({
      input: {
        link: e.target.value,
        id: this.state.input.id
      }
    });
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.addLink();
    };
  };

  startEditing = (e) => {
    this.setState({
      editing: true
    });
  };

  addLink = (e) => {
    if (this.state.input.link === '') {
      return;
    };

    this.setState({
      links: this.state.links.concat(this.state.input),
      input: {
        link: '',
        id: uniqid()
      },
      editing: false
    });
  };

  render() {
    let x = null;
    let y = 'hidden';

    if (this.state.editing) {
      x = 'hidden';
      y = null;
    };

    return (
      <div id='info'>
        <div id='info-name'>
          <Input inputID="name" tag="input" inputType="text" labelText="Name"></Input>
        </div>

        <div id='info-personal'>
          <Input inputID="address" tag="input" inputType="text" labelText="Address"></Input>
          <Input inputID="phone" tag="input" inputType="number" labelText="Number"></Input>
          <Input inputID="email" tag='input' inputType="text" labelText="Email"></Input>
        </div>

        <div id='info-links'>
          <ul id='info-link-list'>
            {this.state.links.map((link) => { return <li className='link' key={link.id}>{link.link}</li> })}
          </ul>
          <input id='link-input' className={y} type='text' value={this.state.input.link} onChange={this.handleChange} onKeyDown={this.handleKeyDown}></input>
          <button id='submit-btn' className={y} onClick={this.addLink}>ADD LINK</button>
          <button id='add-new-btn' className={x} onClick={this.startEditing}>NEW LINK</button>
        </div>

        <div id='info-introduction'>
          <Input inputID="introduction" tag="textarea" labelText="Introduction"></Input>
        </div>
      </div>
    );
  };
};
