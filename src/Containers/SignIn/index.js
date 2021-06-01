import React, { useState, useEffect } from 'react';
import Button from '../../Components/Common/Button/index';
import './SignIn.scss';

function SignIn(props) {
  return (
    <div className="sign-in-contain">
      <h1>Welcome</h1>
      <Button
        text="Connect to Near Wallet"
      />

      <Button
        text="Create New Wallet"
      />
    </div>
  );
}

export default SignIn;
