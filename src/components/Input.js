import React, { Component } from 'react';
import '../styles/Input.css';

// props = inputID/tag/inputType/labelText
export class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      saved: '',
      editing: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.submitInput = this.submitInput.bind(this);
    this.editInput = this.editInput.bind(this);
    this.createLabel = this.createLabel.bind(this);
    this.createField = this.createField.bind(this);
  };

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.submitInput();
    };
  };

  submitInput = (e) => {
    if (this.state.input === '') {
      return;
    };

    this.setState({
      saved: this.state.input,
      editing: false
    });
  };

  editInput = (e) => {
    this.setState({
      editing: true
    });
  };

  createLabel = (id, text) => {
    if (text === '' || text === undefined) {
      return;
    } else {
      return <label htmlFor={id + '-input-field'}>{text}</label>
    }
  }

  createField = (tag, addClass, id, inputType = null) => {
    if (tag === 'input') {
      return <input className={addClass} id={id + '-input-field'} type={inputType} onChange={this.handleChange} onKeyDown={this.handleKeyDown}></input>
    } else if (tag === 'textarea') {
      return <textarea className={addClass} id={id + '-input-field'} onChange={this.handleChange} onKeyDown={this.handleKeyDown}></textarea>
    };
  };

  render() {
    const {tag, inputID, inputType, labelText} = this.props

    let x = null;
    let y = 'hidden';

    if (!this.state.editing) {
      x = 'hidden';
      y = null;
    };

    return (
      <div className="input-cont" id={inputID + '-input'}>
        {this.createLabel(inputID, labelText)}
        {this.createField(tag, x, inputID, inputType)}
        <p className={y} onClick={this.editInput}>{this.state.saved}</p>
        <button className={x} id={inputID + '-submit-btn'} onClick={this.submitInput}>SUBMIT</button>
      </div>
    );
  };
};
