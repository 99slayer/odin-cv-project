import React, { Component } from 'react';
import uniqid from 'uniqid';
import { BasicInput } from './BasicInput';
import { BasicTextarea } from './BasicTextarea';
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
    return (
      <div id='info'>
        <div id='info-name'>
          <BasicInput placeholder='Name'></BasicInput>
        </div>

        <div id='info-personal'>
          <BasicInput placeholder='Address'></BasicInput>
          <BasicInput placeholder='Phone Number'></BasicInput>
          <BasicInput placeholder='Email'></BasicInput>
        </div>

        <div id='info-links'>
          {/* LINK SECTION MUST BE REDONE */}
          <ul id='info-link-list'>
            {/* maybe an anchor tag? */}
            {this.state.links.map((link) => { return <li className='link' key={link.id}>{link.link}</li> })}
          </ul>
          <input id='link-input' className={`${this.state.editing ? '' : 'hidden'}`} type='text' value={this.state.input.link} onChange={this.handleChange} onKeyDown={this.handleKeyDown}></input>
          <button id='add-new-btn' onClick={this.startEditing}>NEW LINK</button>
        </div>

        <div id='info-introduction'>
          <BasicTextarea placeholder='Introduce yourself'></BasicTextarea>
        </div>
      </div>
    );
  };
};
