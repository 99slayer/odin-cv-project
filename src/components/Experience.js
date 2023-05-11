import React, { Component } from 'react';
import { BasicInput } from './BasicInput';
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
      <div id='experience'>
        <p className='heading'>EXPERIENCE</p>
        <ul id='job-container'>
          {this.state.jobs.map((job, index) => { return <Job key={job} remove={this.removeJob} jobIndex={index}></Job> })}
        </ul>
        <button id='new-job-btn' onClick={this.addJob}>NEW JOB</button>
      </div>
    );
  };
};

class Job extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: uniqid(),
      tasks: [],
      active: false
    }

    this.isActive = this.isActive.bind(this);
    this.isInactive = this.isInactive.bind(this);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  isActive = () => {
    this.setState({
      active: true
    })
  }

  isInactive = () => {
    this.setState({
      active: false
    })
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
  };

  // make sure to sort out any word wrapping issues

  render() {
    const { remove, jobIndex } = this.props;

    return (
      <li id={'job-' + this.state.id} className='job' onMouseEnter={this.isActive} onMouseLeave={this.isInactive}>
        <form className='job-inputs'>
          <div className='basic-inputs'>
            <BasicInput setClass='job-time' placeholder='Job time period'></BasicInput>
            <BasicInput setClass='job-title' placeholder='Job title'></BasicInput>
            <BasicInput setClass='job-location' placeholder='Job location'></BasicInput>
          </div>
          <ul className='task-container'>
            {this.state.tasks.map((task, index) => { return <Task key={task} remove={this.removeTask} taskIndex={index}></Task> })}
          </ul>
          <button className={`${this.state.active ? '' : 'hidden'} new-task-btn`} type='button' onClick={this.addTask}>NEW TASK</button>
        </form>
        <button className={`${this.state.active ? '' : 'hidden'} delete-job-btn`} type='button' onMouseDown={() => remove(jobIndex)}>X</button>
      </li>
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
      this.textareaRef.current.focus();
    }
    );
  };

  render() {
    const { remove, taskIndex } = this.props

    return (
      <li className='task'>
        <div className={`${this.state.editing ? '' : 'hidden'} task-textarea`}>
          <textarea ref={this.textareaRef} value={this.state.text} onChange={this.handleChange} onBlur={this.display} onKeyDown={this.handleKeyDown}></textarea>
          <button className='remove-task-btn' type='button' onMouseDown={() => remove(taskIndex)}>X</button>
        </div>
        <p className={`${this.state.editing ? 'hidden' : ''}`} value={this.state.text} onClick={this.edit}>{this.state.text}</p>
      </li>
    )
  }
}
