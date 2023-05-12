import React, { Component } from 'react';

// props: placeholder/setClass
export class BasicTextarea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      editing: true
    };

    this.textareaRef = React.createRef();

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
      this.textareaRef.current.focus();
    }
    );
  };

  render() {
    const { placeholder, setClass } = this.props;

    return (
      <div className={setClass}>
        <textarea className={`${this.state.editing ? '' : 'none'}`} ref={this.textareaRef} placeholder={placeholder} value={this.state.text} onChange={this.handleChange} onKeyDown={this.handleKeyDown} onBlur={this.display}></textarea>
        <p className={`${this.state.editing ? 'none' : ''}`} onClick={this.edit}>{this.state.text}</p>
      </div>
    )
  }
}
