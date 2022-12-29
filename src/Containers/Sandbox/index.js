import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NewNFT from '../../Components/Common/NewNFT/index';
import GeneralModal from '../../Components/Common/GeneralModal/index';
import './Sandbox.scss';
// import GeneralModal from '../../Components/Common/GeneralModal';
import CreatePlayList from '../../Components/Parts/CreatePlayList';
import AddShowCase from '../../Components/Parts/AddShowCase';

import showcaseImg from '../../assets/images/showcase.svg';
import ConfettiImage from '../../assets/images/confetti.png';
import { displayLoadingOverlayAction, hideLoadingOverlayAction } from '../../redux/actions/GlobalAction';

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

  const mintNewAlbum = () => {

  }
  return (
    <div id="sandbox">
      <div className="button-col">
        <button onClick={() => toggleNftModal(!showNewNftModal)}>New NFT Modal</button>
        <button onClick={() => toggleCongratsModal(!showCongratsModal)}>Show Congrats Modal</button>
        <button onClick={() => toggleNominateModal(!showNominateModal)}>Show Nominate Modal</button>
        <button onClick={() => togglePlayListModal(!showPlayListModal)}>Create New Playlist</button>
        <button onClick={() => toggleShowCaseModal(!showShowCaseModal)}>Add To Showcase</button>
      </div>
      {showNewNftModal && <NewNFT
        closeNewNftModal={() => toggleNftModal(!showNewNftModal)}
        displayLoadingOverlay={props.displayLoadingOverlay}
        hideLoadingOverlay={props.hideLoadingOverlay}
        toggleCongratsModal={toggleCongratsModal}
      />}

      {showCongratsModal && <GeneralModal
        topIcon={ConfettiImage}
        headline="Congrats, Your album has been listed!"
        buttons={[
          {
            type: 'outlined',
            text: 'Go Home',
            onClick: () => props.history.push('/')
          }
        ]}
        className="centered"
      />}

      {showNominateModal && <GeneralModal
        headline="Nominate New Artist"
        bodyText="Nominate someone for this month’s voting period. Enter early in the month for more exposure."
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
        bodyChildren={<CreatePlayList showCaseData={showCaseData} togglePlayListModal={togglePlayListModal} />}
        contentClassName="playlist-modal"
        closeModal={() => togglePlayListModal(!showPlayListModal)}
        isCloseButton={true}
      />
      }

      {showShowCaseModal && <GeneralModal
        headline="Add to Showcase"
        bodyChildren={<AddShowCase showCaseData={showCaseData} toggleShowCaseModal={toggleShowCaseModal} />}
        closeModal={() => toggleShowCaseModal(!showShowCaseModal)}
        isCloseButton={true}
      />
      }

    </div>
  );
}

export default connect(state => {
  return {
    loadingOverlay: state.global.loading_overlay,
  }
},
  dispatch => {
    return {
      displayLoadingOverlay: () => dispatch(displayLoadingOverlayAction()),
      hideLoadingOverlay: () => dispatch(hideLoadingOverlayAction())
    }
  })(withRouter(SandBox));
