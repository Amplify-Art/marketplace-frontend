import React,{ useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import GeneralModal from '../../Components/Common/GeneralModal/index';
import ProfileHeader from '../../Components/Common/ProfileHeader';

import CoverImg from '../../assets/images/profile-cover.png';
import ArtisrAvatar from '../../assets/images/artist-avatar.svg';
import DownArrowIcon from '../../assets/images/Down_arrow.svg';
import CalanderIcon from '../../assets/images/CalanderIcon.svg';
import RightIcon from '../../assets/images/RightIcon.svg';
import RightIconDisable from '../../assets/images/RightIconDisable.svg';
import ConfettiImage from '../../assets/images/confetti.png';

import NewNFT from '../../Components/Common/NewNFT/index';

import { displayLoadingOverlayAction, hideLoadingOverlayAction } from '../../redux/actions/GlobalAction';

import './ArtistDashboard.scss';

function ArtistDashboard(props) {
  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const mintNewAlbum = () => {

  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bannerImage, setBannerImage] = useState(CoverImg);
  const [profileImage, setProfileImage] = useState(ArtisrAvatar);
  const [userName, setUserName] = useState('');
  const [showCongratsModal, toggleCongratsModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('amplify_app_token');
    if (token) {
      const decodedToken = jwt_decode(token);
      setBannerImage(decodedToken.banner);
      setProfileImage(decodedToken.avatar);
      setUserName(decodedToken.username);
    }
  }, []);

  const ArtistData = {
    cover: bannerImage,
    avatar: profileImage,
    name: userName
  };

  const month_Data = [
    { month: "june", gwei: "gwei", isChecked: false },
    { month: "may", gwei: "gwei", isChecked: false },
    { month: "april", gwei: "gwei", isChecked: true },
    { month: "march", gwei: "gwei", isChecked: true }
  ]

  const mostPlayData = [
    // { name: 'Song Name', count: 13 },
    // { name: 'Song Name', count: 11 },
    // { name: 'Song Name', count: 10 },
    // { name: 'Song Name', count: 9 },
    // { name: 'Song Name', count: 8 },
    // { name: 'Song Name', count: 8 },
    // { name: 'Song Name', count: 5 },
    // { name: 'Song Name', count: 5 },
    // { name: 'Song Name', count: 4 },
    // { name: 'Song Name', count: 3 },
  ];


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

  const renderBtnContent = () => {
    return (
      <>
        {/* <button><img src={TwitterIcon} alt="Twitter" />View All</button>
        <button><img src={TwitterIcon} alt="Twitter" />View All</button> */}
        <button>Upload Store Banner</button>
        <button onClick={handleOpenModal}>Mint New Album</button>
      </>
    )
  }
  const renderSongList = () => (
    mostPlayData.map((song, index) => (
      <div className="song-content d-h-between">
        <div>{song.name}</div>
        <div>{song.count}</div>
      </div>
    ))
  )

  return (
    <div id="artist-dashboard" className="left-nav-pad right-player-pad">
      <ProfileHeader ArtistData={ArtistData} btnContent={renderBtnContent()} />
      <div className="content">
        <div className="container">
          <div className="bal-wrapper">
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
                  <span className="cal-font">2019</span>
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
          </div>
          <div className="song-title">Song Stats</div>
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
          </div>
        </div>
      </div>
      {isModalOpen && <NewNFT
        closeNewNftModal={handleCloseModal}
        displayLoadingOverlay={props.displayLoadingOverlay}
        hideLoadingOverlay={props.hideLoadingOverlay}
        toggleCongratsModal={toggleCongratsModal}
      />}
    </div>
  )
};

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
  })(withRouter(ArtistDashboard));