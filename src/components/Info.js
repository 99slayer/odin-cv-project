import React, { Component } from 'react';
import uniqid from 'uniqid';
import { BasicInput } from './BasicInput';
import { BasicTextarea } from './BasicTextarea';
import '../styles/Info.css';

export class Info extends Component {
  constructor(props) {
    super(props);

    this.state = {
      links: [],
      active: true
    };

    this.isActive = this.isActive.bind(this);
    this.isInactive = this.isInactive.bind(this);
    this.addLink = this.addLink.bind(this);
    this.removeLink = this.removeLink.bind(this);
  };

  isActive = () => {
    this.setState({
      active: true
    })
  }

  isInactive = () => {
    if (this.state.links.length < 1) {
      return
    };

    this.setState({
      active: false
    })
  }

  addLink = (e) => {
    this.setState({
      links: this.state.links.concat(uniqid())
    })
  };

  removeLink = (id) => {
    const copy = [...this.state.links];
    copy.splice(id, 1);

    this.setState({
      links: copy
    });
  };

  render() {
    return (
      <div id='info'>
        <div id='info-name'>
          <BasicInput placeholder='Name' setClass='info-name-input'></BasicInput>
        </div>

        <div id='info-personal'>
          <BasicInput placeholder='Address'></BasicInput>
          <BasicInput placeholder='Phone Number'></BasicInput>
          <BasicInput placeholder='Email'></BasicInput>
        </div>

        <div id='info-links' onMouseEnter={this.isActive} onMouseLeave={this.isInactive}>
          <ul id='info-link-list'>
            {this.state.links.map((link, index) => { return <Link key={link} linkIndex={index} removeLink={this.removeLink}></Link> })}
          </ul>
          <button id='add-new-btn' type='button' className={`${this.state.active ? '' : 'hidden'} btn`} onClick={this.addLink}>NEW LINK</button>
        </div>

        <div id='info-introduction'>
          <BasicTextarea placeholder='Introduce yourself' setClass='intro-textarea'></BasicTextarea>
        </div>
      </div>
    );
  };
};

class Link extends Component {
  constructor(props) {
    super(props);

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
    const { removeLink, linkIndex } = this.props

    return (
      <li className='link'>
        <div className={`${this.state.editing ? '' : 'none'} link-input-container`}>
          <input className='link-input' ref={this.linkRef} value={this.state.text} type='url' onChange={this.handleChange} onBlur={this.display} onKeyDown={this.handleKeyDown}></input>
          <button className='delete-link-btn delete-btn btn' type='button' onMouseDown={() => removeLink(linkIndex)}>X</button>
        </div>
        <a className={`${this.state.editing ? 'none' : ''}`} onClick={this.edit}>{this.state.text}</a>
      </li>
    )
  }
}
