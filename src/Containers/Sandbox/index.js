import React, { useState, useEffect, useRef } from 'react';
import NewNFT from '../../Components/Common/NewNFT/index';
import GeneralModal from '../../Components/Common/GeneralModal/index';
import './Sandbox.scss';

import ConfettiImage from '../../assets/images/confetti.png';

function SandBox(props) {
  const [showNewNftModal, toggleNftModal] = useState(false);
  const [showCongratsModal, toggleCongratsModal] = useState(false);
  const [showNominateModal, toggleNominateModal] = useState(false);
  return (
    <div id="sandbox">
      <div className="button-col">
        <button onClick={() => toggleNftModal(!showNewNftModal)}>New NFT Modal</button>
        <button onClick={() => toggleCongratsModal(!showCongratsModal)}>Show Congrats Modal</button>
        <button onClick={() => toggleNominateModal(!showNominateModal)}>Show Nominate Modal</button>
      </div>
      {showNewNftModal && <NewNFT closeNewNftModal={() => toggleNftModal(!showNewNftModal)} />}

      {showCongratsModal && <GeneralModal
        topIcon={ConfettiImage}
        headline="Congrats, Your album is set to release!"
        buttons={[
          {
            type: 'outlined',
            text: 'Go Home'
          },
          {
            type: 'solid',
            text: 'Mint Another Album'
          },
        ]}
        className="centered"
        closeModal={() => toggleCongratsModal(!showCongratsModal)}
      />}

      {showNominateModal && <GeneralModal
        headline="Nominate New Artist"
        bodyText="Nominate yourself for this month’s voting period. Enter early in the month for more exposure."
        buttons={[
          {
            type: 'solid',
            text: 'Continue'
          },
        ]}
        className="centered"
        closeModal={() => toggleNominateModal(!showNominateModal)}
      />}
    </div>
  );
}

export default SandBox;
