import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NewNFT from '../../Components/Common/NewNFT/index';
import GeneralModal from '../../Components/Common/GeneralModal/index';
import './Sandbox.scss';

import ConfettiImage from '../../assets/images/confetti.png';
import { displayLoadingOverlayAction, hideLoadingOverlayAction } from '../../redux/actions/GlobalAction';

function SandBox(props) {
  const [showNewNftModal, toggleNftModal] = useState(false);
  const [showCongratsModal, toggleCongratsModal] = useState(false);
  const [showNominateModal, toggleNominateModal] = useState(false);

  const mintNewAlbum = () => {

  }
  return (
    <div id="sandbox">
      <div className="button-col">
        <button onClick={() => toggleNftModal(!showNewNftModal)}>New NFT Modal</button>
        <button onClick={() => toggleCongratsModal(!showCongratsModal)}>Show Congrats Modal</button>
        <button onClick={() => toggleNominateModal(!showNominateModal)}>Show Nominate Modal</button>
      </div>
      {showNewNftModal && <NewNFT
        closeNewNftModal={() => toggleNftModal(!showNewNftModal)}
        displayLoadingOverlay={props.displayLoadingOverlay}
        hideLoadingOverlay={props.hideLoadingOverlay}
        toggleCongratsModal={toggleCongratsModal}
      />}

      {showCongratsModal && <GeneralModal
        topIcon={ConfettiImage}
        headline="Congrats, Your album is set to release!"
        buttons={[
          {
            type: 'outlined',
            text: 'Go Home',
            onClick: () => props.history.push('/')
          },
          {
            type: 'solid',
            text: 'Mint Another Album',
            onClick: mintNewAlbum
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
