import React, { useState, useEffect, useRef } from 'react';
import NewNFT from '../../Components/Common/NewNFT/index';
import GeneralModal from '../../Components/Common/GeneralModal/index';
import './Sandbox.scss';
// import GeneralModal from '../../Components/Common/GeneralModal';
import CreatePlayList from '../../Components/Parts/CreatePlayList';
import AddShowCase from '../../Components/Parts/AddShowCase';

import showcaseImg from '../../assets/images/showcase.svg';
import ConfettiImage from '../../assets/images/confetti.png';

export const showCaseData = [
  {
    image: showcaseImg,
    title: 'What is Love',
    description: 'Mint #1'
  },
  {
    image: showcaseImg,
    title: 'What is Love',
    description: 'Mint #1'
  },
  {
    image: showcaseImg,
    title: 'What is Love',
    description: 'Mint #1'
  },
  {
    image: showcaseImg,
    title: 'What is Love',
    description: 'Mint #1'
  },
  {
    image: showcaseImg,
    title: 'What is Love',
    description: 'Mint #1'
  },
  {
    image: showcaseImg,
    title: 'What is Love',
    description: 'Mint #1'
  },
  {
    image: showcaseImg,
    title: 'What is Love',
    description: 'Mint #1'
  },
  {
    image: showcaseImg,
    title: 'What is Love',
    description: 'Mint #1'
  },
];

function SandBox(props) {
  const [showNewNftModal, toggleNftModal] = useState(false);
  const [showCongratsModal, toggleCongratsModal] = useState(false);
  const [showNominateModal, toggleNominateModal] = useState(false);
  const [showPlayListModal, togglePlayListModal] = useState(false);
  const [showShowCaseModal, toggleShowCaseModal] = useState(false);

  return (
    <div id="sandbox">
      <div className="button-col">
        <button onClick={() => toggleNftModal(!showNewNftModal)}>New NFT Modal</button>
        <button onClick={() => toggleCongratsModal(!showCongratsModal)}>Show Congrats Modal</button>
        <button onClick={() => toggleNominateModal(!showNominateModal)}>Show Nominate Modal</button>
        <button onClick={() => togglePlayListModal(!showPlayListModal)}>Create New Playlist</button>
        <button onClick={() => toggleShowCaseModal(!showShowCaseModal)}>Add To Showcase</button>
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

      {showPlayListModal && <GeneralModal
        headline="Create New Playlist"
        bodyChildren={<CreatePlayList showCaseData={showCaseData} />}
        contentClassName="playlist-modal"
        closeModal={() => togglePlayListModal(!showPlayListModal)}
        isCloseButton={true}
      />
      }

      {showShowCaseModal && <GeneralModal
        headline="Add to Showcase"
        bodyChildren={<AddShowCase showCaseData={showCaseData} />}
        closeModal={() => toggleShowCaseModal(!showShowCaseModal)}
        isCloseButton={true}
      />
      }

    </div>
  );
}

export default SandBox;
