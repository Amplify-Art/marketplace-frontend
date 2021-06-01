import React, { useState, useEffect } from 'react';
import './Button.scss';

function Button(props) {
  const { text } = props;
  return (
    <button className="btn">{text}</button>
  );
}

export default Button;
