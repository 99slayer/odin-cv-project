import React, { useState, useEffect, useRef } from 'react';

export const BasicTextarea = (props) => {
  const [text, setText] = useState('');
  const [editing, setEditing] = useState(false);
  const [textareaVisible, setTextareaVisible] = useState(true);

  const textareaRef = useRef();

  useEffect(() => {
    if (editing === false) {
      return
    };

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
      return;
    };

    setEditing(false);
    setTextareaVisible(false);
  };

  const edit = (e) => {
    setEditing(true);
    setTextareaVisible(true);
  };

  const { placeholder, setClass } = props;

  return (
    <div className={setClass}>
      <textarea className={`${textareaVisible ? '' : 'none'}`} ref={textareaRef} placeholder={placeholder} value={text} onChange={handleChange} onKeyDown={handleKeyDown} onBlur={display}></textarea>
      <p className={`${textareaVisible ? 'none' : ''}`} onClick={edit}>{text}</p>
    </div>
  )
}
