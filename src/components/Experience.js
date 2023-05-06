import React, { Component } from 'react';
import uniqid from 'uniqid';
import '../styles/Experience.css';

export class Experience extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: []
    };

    this.addJob = this.addJob.bind(this);
    this.removeJob = this.removeJob.bind(this);
  };

  addJob = () => {
    this.setState({
      jobs: this.state.jobs.concat(uniqid())
    });
  };

  removeJob = (id) => {
    const copy = [...this.state.jobs];
    copy.splice(id, 1);

    this.setState({
      jobs: copy
    });
  }

  render() {
    return (
      <div>
        <h2>EXPERIENCE</h2>
        <ul>
          {this.state.jobs.map((job) => { return <Job key={job} remove={this.removeJob} jobID={job}></Job> })}
        </ul>
        <button onClick={this.addJob}>ADD JOB</button>
      </div>
    );
  };
};

class Job extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: uniqid(),
      tasks: []
    }

    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  addTask = () => {
    this.setState({
      tasks: this.state.tasks.concat(uniqid())
    })
  };

  removeTask = (id) => {
    const copy = [...this.state.tasks];
    copy.splice(id, 1);

    this.setState({
      tasks: copy
    });
  }

  render() {
    return (
      // have buttons disappear when job is blured
      <li id={'job-' + this.state.id}>
        <div id={'job-input-' + this.state.id}>
          <form>
            <div>
              <BasicInput></BasicInput>
              <BasicInput></BasicInput>
              <BasicInput></BasicInput>
            </div>
            <ul>
              {this.state.tasks.map(task => { return <Task key={task} remove={this.removeTask} taskID={task}></Task> })}
            </ul>
            <button type='button' onClick={this.addTask}>NEW TASK</button>
          </form>
        </div>
        <button type='button' onClick={() => this.props.remove(this.props.jobID)}>X</button>
      </li>
    )
  }
}

class BasicInput extends Component {
  constructor() {
    super();

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
    return (
      <div>
        <input className={`${this.state.editing ? '' : 'hidden'}`} ref={this.inputRef} value={this.state.text} onChange={this.handleChange} onKeyDown={this.handleKeyDown} onBlur={this.display}></input>
        {/* need p elements to be inline not block */}
        <p className={`${this.state.editing ? 'hidden' : ''}`} onClick={this.edit}>{this.state.text}</p>
      </div>
    )
  }
}

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      editing: true
    }

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
    };
  };

  display = (e) => {
    if (e.target.value === '') {
      return
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
    return (
      <li>
        <div>
          <input ref={this.inputRef} value={this.state.text} onChange={this.handleChange} onKeyDown={this.handleKeyDown}></input>
          <button type='button' onClick={() => this.props.remove(this.props.taskID)}>X</button>
        </div>
        <p className={`${this.state.editing ? 'hidden' : ''}`} value={this.state.text} onClick={this.edit}>{this.state.text}</p>
      </li>
    )
  }
}
