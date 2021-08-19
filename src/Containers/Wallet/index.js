import React, { useState, useEffect } from 'react';

function Wallet(props) {
  return (
    <div className={`container wallet-page left-nav-pad ${props.playerActive ? 'right-player-pad' : 'normal-right-pad'}`}>
      <h1>Wallet</h1>      
    </div>
  )
}

export default Wallet;
