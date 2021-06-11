import React, { useState, useEffect } from 'react';
import './Button.scss';

function Button(props) {
  const { text } = props;
  return (
    <button className="btn" {...props}>{text}</button>
  );
}

export default Button;
