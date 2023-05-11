import React, { Component } from 'react';
import { BasicInput } from './BasicInput';
import uniqid from 'uniqid';
import '../styles/Education.css';

export class Education extends Component {
  constructor(props) {
    super(props);

    this.state = {
      educations: []
    }

    this.addEducation = this.addEducation.bind(this);
    this.removeEducation = this.removeEducation.bind(this);
  };

  addEducation = () => {
    this.setState({
      educations: this.state.educations.concat(uniqid())
    })
  }

  removeEducation = (id) => {
    const copy = [...this.state.educations];
    copy.splice(id, 1);

    this.setState({
      educations: copy
    });
  }

  render() {
    return (
      <div id='education'>
        <p className='heading'>EDUCATION</p>
        <ul>
          {this.state.educations.map((education, index) => { return <BasicEducation key={education} removeEducation={this.removeEducation} educationIndex={index}></BasicEducation> })}
        </ul>
        <button className='new-education-btn' type='button' onMouseDown={this.addEducation}>NEW EDUCATION</button>
      </div>
    );
  };
};

class BasicEducation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    }

    this.isActive = this.isActive.bind(this);
    this.isInactive = this.isInactive.bind(this);
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

  render() {
    const { removeEducation, educationIndex } = this.props;

    return (
      <li className='education-container' onMouseEnter={this.isActive} onMouseLeave={this.isInactive}>
        <div className='education-inputs'>
          <BasicInput placeholder='Education time period' setClass='education-time'></BasicInput>
          <BasicInput placeholder='Education type' setClass='education-type'></BasicInput>
          <BasicInput placeholder='Education location' setClass='education-location'></BasicInput>
        </div>
        <button className={`${this.state.active ? '' : 'hidden'} delete-education-btn`} type='button' onMouseDown={() => removeEducation(educationIndex)}>X</button>
      </li>
    )
  }
}
