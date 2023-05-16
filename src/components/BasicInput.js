import React, { useState, useEffect, useRef } from 'react';

export const BasicInput = (props) => {
  const [text, setText] = useState('');
  const [editing, setEditing] = useState(false);
  const [inputVisible, setInputVisible] = useState(true);

  const inputRef = useRef();

  useEffect(() => {
    if (editing === false) {
      return
    };

    inputRef.current.focus();
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
      return;
    };

    setEditing(false);
    setInputVisible(false);
  };

  const edit = (e) => {
    setEditing(true);
    setInputVisible(true);
  };

  const { placeholder, setClass } = props;

  return (
    <div className={setClass}>
      <input className={`${inputVisible ? '' : 'none'}`} ref={inputRef} type='text' placeholder={placeholder} value={text} onChange={handleChange} onKeyDown={handleKeyDown} onBlur={display}></input>
      <p className={`${inputVisible ? 'none' : ''}`} onClick={edit}>{text}</p>
    </div>
  )
}
