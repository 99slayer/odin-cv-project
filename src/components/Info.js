import React, { Component } from 'react';
import uniqid from 'uniqid';
import { BasicInput } from './BasicInput';
import { BasicTextarea } from './BasicTextarea';
import '../styles/Info.css';

export class Info extends Component {
  constructor(props) {
    super(props);

    this.state = {
      links: []
    };

    this.addLink = this.addLink.bind(this);
    this.removeLink = this.removeLink.bind(this);
  };

  addLink = (e) => {
    this.setState({
      links: this.state.links.concat(uniqid())
    })
  };

  removeLink = () => {

  }

  render() {
    return (
      <div id='info'>
        <div id='info-name'>
          <BasicInput placeholder='Name'></BasicInput>
          <hr className='name-divider'></hr>
        </div>

        <div id='info-personal'>
          <BasicInput placeholder='Address'></BasicInput>
          <BasicInput placeholder='Phone Number'></BasicInput>
          <BasicInput placeholder='Email'></BasicInput>
        </div>

        <div id='info-links'>
          <ul id='info-link-list'>
            {this.state.links.map((link, index) => { return <Link key={link} linkIndex={index}></Link> })}
          </ul>
          <button id='add-new-btn' onClick={this.addLink}>NEW LINK</button>
        </div>

        <div id='info-introduction'>
          <BasicTextarea placeholder='Introduce yourself' setClass='intro-textarea'></BasicTextarea>
        </div>
      </div>
    );
  };
};

class Link extends Component {
  constructor() {
    super();

    this.state = {
      text: '',
      editing: true
    }

    this.linkRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.display = this.display.bind(this);
    this.edit = this.edit.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.display(e);
    }
  };

  display = (e) => {
    if (e.target.value === '') {
      return;
    };

    this.setState({
      editing: false
    });
  };

  edit = (e) => {
    this.setState({
      editing: true
    },
    function () {
      this.linkRef.current.focus();
    }
    );
  };

  render() {
    return (
      <li className='link'>
        <div className={`${this.state.editing ? '' : 'hidden'}`}>
          <input ref={this.linkRef} value={this.state.text} type='text' onChange={this.handleChange} onBlur={this.display} onKeyDown={this.handleKeyDown}></input>
          <button>X</button>
        </div>
        <a className={`${this.state.editing ? 'hidden' : ''}`} onClick={this.edit}>{this.state.text}</a>
      </li>
    )
  }
}
