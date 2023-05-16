import React, { useState, useRef, useEffect } from 'react';
import uniqid from 'uniqid';
import { BasicInput } from './BasicInput';
import { BasicTextarea } from './BasicTextarea';
import '../styles/Info.css';

export const Info = () => {
  const [links, setLinks] = useState([]);
  const [active, setActive] = useState(true);

  const isActive = () => {
    setActive(true);
  }

  const isInactive = () => {
    if (links.length < 1) {
      return
    };

    setActive(false);
  }

  const addLink = () => {
    setLinks(links.concat(uniqid()));
  };

  const removeLink = (index) => {
    const copy = links;
    copy.splice(index, 1);
    setLinks(copy);
  };

  return (
    <div id='info'>
      <div id='info-name'>
        <BasicInput placeholder='Name' setClass='info-name-input'></BasicInput>
      </div>

      <div id='info-personal'>
        <BasicInput placeholder='Address'/>
        <BasicInput placeholder='Phone Number'/>
        <BasicInput placeholder='Email'/>
      </div>

      <div id='info-links' onMouseEnter={isActive} onMouseLeave={isInactive}>
        <ul id='info-link-list'>
          {links.map((link, index) => { return <Link key={link} linkIndex={index} removeLink={removeLink}></Link> })}
        </ul>
        <button id='add-new-btn' type='button' className={`${active ? '' : 'hidden'} btn`} onClick={addLink}>NEW LINK</button>
      </div>

      <div id='info-introduction'>
        <BasicTextarea placeholder='Introduce yourself' setClass='intro-textarea'></BasicTextarea>
      </div>
    </div>
  );
};

const Link = (props) => {
  const [text, setText] = useState('');
  const [editing, setEditing] = useState(false);
  const [inputVisible, setInputVisible] = useState(true);

  const linkRef = useRef();

  useEffect(() => {
    linkRef.current.focus();
  }, [editing])

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      display(e);
    }
  };

  const display = (e) => {
    if (e.target.value === '') {
      return;
    };

    setEditing(false);
    setInputVisible(false);
  };

  const edit = (e) => {
    setEditing(true);
    setInputVisible(true);
  };

  const { removeLink, linkIndex } = props;

  return (
    <li className='link'>
      <div className={`${inputVisible ? '' : 'none'} link-input-container`}>
        <input className='link-input' ref={linkRef} value={text} type='url' onChange={handleChange} onBlur={display} onKeyDown={handleKeyDown}></input>
        <button className='delete-link-btn delete-btn btn' type='button' onMouseDown={() => removeLink(linkIndex)}>X</button>
      </div>
      <a className={`${inputVisible ? 'none' : ''}`} onClick={edit}>{text}</a>
    </li>
  )
}
