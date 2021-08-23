import React, { useState, useEffect } from 'react';
import './Wallet.scss';
import Auth from '../../Containers/Auth';
import Button from '../../Components/Common/Button';

function Wallet(props) {
  return (
    <div className={`container wallet-page left-nav-pad ${props.playerActive ? 'right-player-pad' : 'normal-right-pad'}`}>
      <div className="white-box">
        <div className="left">
          <h4>Total Balance</h4>
          <div className="near-amount">
            <span>222.53</span>
            <span className="near-label">NEAR</span>
          </div>

          <div className="usd">$968.91</div>

          <div className="buttons">
            <Button text="Send" className="btn black-outline" />
            <Button text="Withdraw" className="btn black-outline" />
          </div>
        </div>

        <div className="right">
          <h4>Add funds to your balance</h4>
          <input type="text" placeholder="Enter Amount in USD" />
          <span className="conversion-to-near">0.000 Near</span>
          <Button text="Add Funds to Balance" className="btn solid-black" />
        </div>
      </div>  
    </div>
  )
}

export default Auth(Wallet);
