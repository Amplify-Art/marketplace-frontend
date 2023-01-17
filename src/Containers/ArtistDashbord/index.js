import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import q from 'querystring'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import GeneralModal from '../../Components/Common/GeneralModal/index';
import ProfileHeader from '../../Components/Common/ProfileHeader';

import CoverImg from '../../assets/images/profile-cover.png';
import ArtisrAvatar from '../../assets/images/artist-avatar.svg';
import ConfettiImage from '../../assets/images/confetti.png';
import ImageUploadIcon from '../../assets/images/image-upload.svg';
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
  const [profileImage, setProfileImage] = useState(ArtisrAvatar);
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
        <button>View Profile</button>
        {/* <button onClick={() => setShowBannerModal(!showBannerModal)}>Upload Store Banner</button> */}
        <button onClick={handleOpenModal}>Mint New Album</button>
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
      <ProfileHeader ArtistData={ArtistData} btnContent={renderBtnContent()} showShowcase={false} />
      <div className="content">
        <div className="container">
          {/* <div className="container1">
            <div className="col1">
              <img src={SupportCardCover} />
              <div className="owned-cards">
                <p>32 Cards Owned. <span>View Card Gallery</span></p>
              </div>
            </div>
            <div className="song-wrapper flex f-jc-space-between col2">
              <div className="w-100 song-inner-content">
                <div className="song-head d-h-between">
                  <span className="song-head-title">Supporter Voting</span>
                  <div className="support-cal">
                    <img src={CalanderIcon} alt="" className="cal-img" />
                    <span className="cal-font">2021</span>
                    <img src={DownArrowIcon} alt="" className="cal-img" />
                  </div>
                </div>
                <p>You have 32 Votes left for this voting period.</p>
                {renderVoteList()}
              </div>
            </div>
          </div> */}
          {/* <div className="bal-wrapper">
            <div className="left-wrap">
              <div className="bal-title">Pending Award Balance</div>
              <div className="price">0</div>
              <div className="near">NEAR</div>
              <button className="withdraw-btn">Withdraw To Balance</button>
              <div className="report-link">Export Earnings Report</div>
            </div>
            <div className="supporter-wrapper">
              <div className="support-header d-h-between">
                <div className="support-title">Supporter Rev Share</div>
                <div className="support-cal">
                  <img src={CalanderIcon} alt="" className="cal-img" />
                  <span className="cal-font">2021</span>
                  <img src={DownArrowIcon} alt="" className="cal-img" />
                </div>
              </div>
              <div className="support-content">
                {month_Data && month_Data.map((item, index) => (
                  <div className="support-inner-content d-h-between">
                    <div className="text-month w-33">{item.month}</div>
                    <div className="text-gwei w-33">{item.gwei}</div>
                    <div className="w-33 text-align-right">
                      <img src={item.isChecked ? RightIcon : RightIconDisable} alt="" className={`${item.isChecked ? 'icon-green' : 'icon-gray'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
          {/* <div className="song-title">Song Stats</div>
          <div className="song-wrapper flex f-jc-space-between">
            <div className="w-50 song-inner-content">
              <div className="song-head d-h-between">
                <span className="song-head-title">Most Played</span>
                <span className="song-count-title"># of Plays</span>
              </div>
              {renderSongList()}
            </div>
            <div className="w-50 song-inner-content">
              <div className="song-head d-h-between">
                <span className="song-head-title">Most Purchased</span>
                <span className="song-count-title"># of Sales</span>
              </div>
              {renderSongList()}
            </div>
          </div> */}
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
