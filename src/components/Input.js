import React, { Component } from 'react';

// props = inputID/tag/inputType
export class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      saved: '',
      editing: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitInput = this.submitInput.bind(this);
    this.editInput = this.editInput.bind(this);
    this.createField = this.createField.bind(this);
  };

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
    console.log('test');
    console.log(this.state.input);
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

  createField = (tag, addClass, id, inputType = null) => {
    if (tag === 'input') {
      return <input className={addClass} id={id + '-input-field'} type={inputType} onChange={this.handleChange}></input>
    } else if (tag === 'textarea') {
      return <textarea className={addClass} id={id + '-input-field'} onChange={this.handleChange}></textarea>
    };
  };

  render() {
    let x = null;
    let y = 'hidden';

    if (!this.state.editing) {
      x = 'hidden';
      y = null;
    };

    return (
      <div id={this.props.inputID}>
        {this.createField(this.props.tag, x, this.props.inputID, this.props.inputType)};
        <p className={y} onClick={this.editInput}>{this.state.saved}</p>
        <button className={x} id={this.props.inputID + '-submit-btn'} onClick={this.submitInput}>SUBMIT</button>
      </div>
    );
  };
};
