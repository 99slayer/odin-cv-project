import React, { Component } from 'react';

export class Input extends Component {
  constructor(props) {
    super(props);
    // if this.state.saved is not empty hide input field and button
    this.state = {
      input: '',
      saved: '',
      editing: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.submitInput = this.submitInput.bind(this);
    this.editInput = this.editInput.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  submitInput = (e) => {
    this.setState({
      saved: this.state.input,
      editing: false
    })
  }

  editInput = (e) => {
    this.setState({
      editing: true
    })
  }

  render() {
    let x = null;
    let y = 'hidden';

    if (!this.state.editing) {
      x = 'hidden';
      y = null;
    }

    return (
      <div id={this.props.inputID}>
        <input className={x} type={this.props.type} onChange={this.handleChange}></input>
        <p className={y} onClick={this.editInput}>{this.state.saved}</p>
        <button id={this.props.inputID + '-submit-btn'} className={x} onClick={this.submitInput}>SUBMIT</button>
      </div>
    );
  }
}
