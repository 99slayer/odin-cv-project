import React, { useState, useEffect, useRef } from 'react';
import { BasicInput } from './BasicInput';
import uniqid from 'uniqid';
import '../styles/Experience.css';

export const Experience = () => {
  const [jobs, setJobs] = useState([]);

  const addJob = () => {
    setJobs(jobs.concat(uniqid()));
  };

  const removeJob = (index) => {
    const copy = [...jobs];
    copy.splice(index, 1);
    setJobs(copy);
  }

  return (
    <div id='experience'>
      <p className='heading'>EXPERIENCE</p>
      <ul id='job-container'>
        {jobs.map((job, index) => { return <Job key={job} remove={removeJob} jobIndex={index}></Job> })}
      </ul>
      <button id='new-job-btn' className='btn' onClick={addJob}>NEW JOB</button>
    </div>
  );
};

const Job = (props) => {
  const [tasks, setTasks] = useState([]);
  const [active, setActive] = useState(false);

  const isActive = () => {
    setActive(true);
  }

  const isInactive = () => {
    setActive(false);
  }

  const addTask = () => {
    setTasks(tasks.concat(uniqid()));
  };

  const removeTask = (index) => {
    const copy = [...tasks];
    copy.splice(index, 1);
    setTasks(copy);
  };

  const { remove, jobIndex } = props;

  return (
    <li id={uniqid()} className='job' onMouseEnter={isActive} onMouseLeave={isInactive}>
      <form className='job-inputs'>
        <div className='basic-inputs'>
          <BasicInput setClass='job-time' placeholder='Job time period'/>
          <BasicInput setClass='job-title' placeholder='Job title'/>
          <BasicInput setClass='job-location' placeholder='Job location'/>
        </div>
        <ul className='task-container'>
          {tasks.map((task, index) => { return <Task key={task} remove={removeTask} taskIndex={index}></Task> })}
        </ul>
        <button className={`${active ? '' : 'hidden'} new-task-btn btn`} type='button' onClick={addTask}>NEW TASK</button>
      </form>
      <button className={`${active ? '' : 'none'} delete-job-btn delete-btn btn`} type='button' onMouseDown={() => remove(jobIndex)}>X</button>
    </li>
  )
}

const Task = (props) => {
  const [text, setText] = useState('');
  const [editing, setEditing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const textareaRef = useRef();

  useEffect(() => {
    textareaRef.current.focus();
  }, [editing])

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      display(e);
    };
  };

  const display = (e) => {
    if (e.target.value === '') {
      return
    };

    setEditing(false);
    setIsVisible(false);
  };

  const edit = () => {
    setEditing(true);
    setIsVisible(true);
  };

  const { remove, taskIndex } = props

  return (
    <li className='task'>
      <div className={`${isVisible ? '' : 'none'} task-textarea`}>
        <textarea ref={textareaRef} value={text} onChange={handleChange} onBlur={display} onKeyDown={handleKeyDown}></textarea>
        <button className='delete-task-btn delete-btn btn' type='button' onMouseDown={() => remove(taskIndex)}>X</button>
      </div>
      <p className={`${isVisible ? 'none' : ''}`} value={text} onClick={edit}>{text}</p>
    </li>
  )
}
