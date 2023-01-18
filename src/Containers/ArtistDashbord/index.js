import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import { withRouter, Link } from "react-router-dom";
import axios from 'axios';
import q from 'querystring'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import GeneralModal from '../../Components/Common/GeneralModal/index';
import ArtistHeader from '../../Components/Common/ArtistHeader';

import CoverImg from '../../assets/images/profile-cover.png';
import ArtistAvatar from '../../assets/images/artist-avatar.svg';
import ConfettiImage from '../../assets/images/confetti.png';
import { API_ENDPOINT_URL } from '../../Constants/default'
import NewNFT from '../../Components/Common/NewNFT/index';
import { getAccessToken } from '../../Api/index';
import { updateUserAction } from '../../redux/actions/UserAction';
import { addNominationVoteAction } from '../../redux/actions/NominationVoteAction';
import { fetchNominationsAction } from '../../redux/actions/NominationAction';
import { displayLoadingOverlayAction, hideLoadingOverlayAction, hideMintSuccessModalAction } from '../../redux/actions/GlobalAction';
import { mintNFTAction } from '../../redux/actions/NFTAction';

import './ArtistDashboard.scss';

function ArtistDashboard(props) {
  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bannerImage, setBannerImage] = useState(CoverImg);
  const [profileImage, setProfileImage] = useState(ArtistAvatar);
  const [userName, setUserName] = useState('');
  const [, toggleCongratsModal] = useState(false);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const token = localStorage.getItem('amplify_app_token');
  const decodedToken = jwt_decode(token);
  const [ArtistData, setArtistData] = useState({
    cover: bannerImage,
    avatar: profileImage,
    name: userName
  });

  // check for mint transactions from URL

  useEffect(() => {
    let mintInfo = JSON.parse(localStorage.getItem('minting_info'))
    if (props.history.location.search.includes('errorCode')) {
      let message = decodeURIComponent(q.parse(props.history.location.search).errorMessage)
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      props.history.push('/artist-dashboard')
    } else if (props.history.location.search.includes('transactionHashes')) {
      let txtId = decodeURIComponent(q.parse(props.history.location.search)['?transactionHashes'])
      mintInfo.txn_hash = txtId
      props.mintNFT(mintInfo)
    }
    localStorage.removeItem('minting_info')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (token) {
      setBannerImage(decodedToken.banner);
      setProfileImage(decodedToken.avatar);
      setUserName(decodedToken.near_account_id);
      setArtistData({
        cover: decodedToken.banner,
        avatar: decodedToken.avatar,
        name: decodedToken.near_account_id
      })
    }
    props.fetchNominations({
      params: {
        related: 'votedFor, votes'
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const renderBtnContent = () => {
    return (
      <div className='headerBtn'>
        {/* <button><img src={TwitterIcon} alt="Twitter" />View All</button> */}
        <Link to={`/artist/${userName}`}>
          <button onClick={() => {}}>
            View Profile
          </button>
        </Link>
        {/* <button onClick={() => setShowBannerModal(!showBannerModal)}>Upload Store Banner</button> */}
        <button onClick={handleOpenModal}>Mint Album</button>
      </div>
    )
  }

  let artistRef = useRef()

  useEffect(() => {
    if (isModalOpen && artistRef) {
      disableBodyScroll(artistRef)
    } else if (artistRef) {
      enableBodyScroll(artistRef);
    }
    return () => {
      clearAllBodyScrollLocks();
    }
  }, [artistRef, isModalOpen])
  return (
    <div id="artist-dashboard" className={`left-nav-pad ${isModalOpen ? 'disable-scroll' : ''}`} ref={el => artistRef = el}>
      <ArtistHeader ArtistData={ArtistData} btnContent={renderBtnContent()} />
      <div className="content">
        <div className="container dashboard-grid">
          <div class="salesListWrapper">
            <div class="salesList">
              <div class="heading">Albums</div>
              <div class="sales-heading">Sales</div>
              <div class="heading">Rev. <span>(97%)</span></div>
            </div>
            <div class="salesWrapper">
              <table class="salesTable">
                <tr class="salesRow">
                  <td class="salesIdMobile">
                    <a href="" class="salesIdHolder">Album Title</a>
                    <div class="salesAmountHolder">#/#</div>
                  </td>
                  <td class="salesId"><a href="">Album Title</a></td>
                  <td class="salesAmount">#/#</td>
                  <td class="salesAmt">
                    <div class="greenTxt">0.00 NEAR</div>
                    <div class="smallTxt">$0.00</div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="salesListWrapper">
            <div class="salesList">
              <div class="heading">Singles</div>
              <div class="sales-heading">Sales</div>
              <div class="heading">Rev. <span>(3%)</span></div>
            </div>
            <div class="salesWrapper">
              <table class="salesTable">
                <tr class="salesRow">
                  <td class="salesIdMobile">
                    <a href="" class="salesIdHolder">Track Title</a>
                    <div class="salesAmountHolder">#</div>
                  </td>
                  <td class="salesId"><a href="">Track Title</a></td>
                  <td class="salesAmount">#</td>
                  <td class="salesAmt">
                    <div class="greenTxt">0.00 NEAR</div>
                    <div class="smallTxt">$0.00</div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      {
        isModalOpen && <NewNFT
          closeNewNftModal={handleCloseModal}
          displayLoadingOverlay={props.displayLoadingOverlay}
          hideLoadingOverlay={props.hideLoadingOverlay}
          toggleCongratsModal={toggleCongratsModal}
        />
      }
      {
        props.showMintSuccessModal && <GeneralModal
          topIcon={ConfettiImage}
          headline="Congrats, your album has been listed!"
          buttons={[
            {
              type: 'solid go-home',
              text: 'Go Home',
              onClick: () => {
                props.hideMintSuccessModal();
                props.history.push('/')
              }
            }
          ]}
          className="centered"
        // closeModal={() => toggleCongratsModal(!showCongratsModal)}
        />
      }
    </div >

  )
};

export default connect(state => {
  return {
    loadingOverlay: state.global.loading_overlay,
    nominations: state.nominations && state.nominations.nominations,
    showMintSuccessModal: state.global.showMintSuccessModal
  }
},
  dispatch => {
    return {
      displayLoadingOverlay: () => dispatch(displayLoadingOverlayAction()),
      hideLoadingOverlay: () => dispatch(hideLoadingOverlayAction()),
      updateUser: (data) => dispatch(updateUserAction(data)),
      addNominationVote: (data) => dispatch(addNominationVoteAction(data)),
      fetchNominations: (data) => dispatch(fetchNominationsAction(data)),
      mintNFT: (data) => dispatch(mintNFTAction(data)),
      hideMintSuccessModal: () => dispatch(hideMintSuccessModalAction())
    }
  })(withRouter(ArtistDashboard));
