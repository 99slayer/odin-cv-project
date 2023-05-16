import React, { useState} from 'react';
import { BasicInput } from './BasicInput';
import uniqid from 'uniqid';
import '../styles/Education.css';

export const Education = () => {
  const [educations, setEducations] = useState([]);

  const addEducation = () => {
    setEducations(educations.concat(uniqid()));
  }

  const removeEducation = (index) => {
    const copy = [...educations];
    copy.splice(index, 1);
    setEducations(copy);
  }

  return (
    <div id='education'>
      <p className='heading'>EDUCATION</p>
      <ul>
        {educations.map((education, index) => { return <BasicEducation key={education} removeEducation={removeEducation} educationIndex={index}></BasicEducation> })}
      </ul>
      <button className='new-education-btn btn' type='button' onMouseDown={addEducation}>NEW EDUCATION</button>
    </div>
  );
};

const BasicEducation = (props) => {
  const [active, setActive] = useState(false);

  const isActive = () => {
    setActive(true);
  }

  const isInactive = () => {
    setActive(false);
  }

  const { removeEducation, educationIndex } = props;

  return (
    <li className='education-container' onMouseEnter={isActive} onMouseLeave={isInactive}>
      <div className='education-inputs'>
        <BasicInput placeholder='Education time period' setClass='education-time'/>
        <BasicInput placeholder='Education type' setClass='education-type'/>
        <BasicInput placeholder='Education location' setClass='education-location'/>
      </div>
      <button className={`${active ? '' : 'none'} delete-education-btn delete-btn btn`} type='button' onMouseDown={() => removeEducation(educationIndex)}>X</button>
    </li>
  )
}
