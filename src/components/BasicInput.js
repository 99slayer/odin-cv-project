import React, { Component } from 'react';

// props: placeholder/setClass
export class BasicInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      editing: true
    };

    this.inputRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.display = this.display.bind(this);
    this.edit = this.edit.bind(this);
  };

  handleChange = (e) => {
    this.setState({
      text: e.target.value
    });
  };

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
      this.inputRef.current.focus();
    }
    );
  };

  render() {
    const { placeholder, setClass } = this.props;

    return (
      <div className={setClass}>
        <input className={`${this.state.editing ? '' : 'none'}`} ref={this.inputRef} type='text' placeholder={placeholder} value={this.state.text} onChange={this.handleChange} onKeyDown={this.handleKeyDown} onBlur={this.display}></input>
        <p className={`${this.state.editing ? 'none' : ''}`} onClick={this.edit}>{this.state.text}</p>
      </div>
    )
  }
}
