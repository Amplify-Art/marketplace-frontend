import React, { useState, useEffect, useRef } from 'react';
import NewNFT from '../../Components/Common/NewNFT/index';
import './Sandbox.scss';

function SandBox(props) {
  const [showNewNftModal, toggleNftModal] = useState(false);
  return (
    <div id="sandbox">
      <button onClick={() => toggleNftModal(!showNewNftModal)}>New NFT</button>
      {showNewNftModal && <NewNFT />}
    </div>
  );
}

export default SandBox;
