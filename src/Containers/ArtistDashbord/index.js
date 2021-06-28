import React, { useState } from 'react';
import React,{useState,useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import ProfileHeader from '../../Components/Common/ProfileHeader';

import CoverImg from '../../assets/images/profile-cover.png';
import ArtisrAvatar from '../../assets/images/artist-avatar.svg';
import TwitterIcon from '../../assets/images/twitter-icon.svg';
import DownArrowIcon from '../../assets/images/Down_arrow.svg';
import CalanderIcon from '../../assets/images/CalanderIcon.svg';
import RightIcon from '../../assets/images/RightIcon.svg';
import RightIconDisable from '../../assets/images/RightIconDisable.svg';

import NewNFT from '../../Components/Common/NewNFT/index';

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
    { name: 'Song Name', count: 13 },
    { name: 'Song Name', count: 11 },
    { name: 'Song Name', count: 10 },
    { name: 'Song Name', count: 9 },
    { name: 'Song Name', count: 8 },
    { name: 'Song Name', count: 8 },
    { name: 'Song Name', count: 5 },
    { name: 'Song Name', count: 5 },
    { name: 'Song Name', count: 4 },
    { name: 'Song Name', count: 3 },
  ]

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
      <div className="song-content">
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
              <div className="price">1.82</div>
              <div className="near">NEAR</div>
              <button className="withdraw-btn">Withdraw To Balance</button>
              <div className="report-link">Export Earnings Report</div>
            </div>
            <div className="supporter-wrapper">
              <div className="support-header">
                <div className="support-title">Supporter Rev Share</div>
                <div className="support-cal">
                  <img src={CalanderIcon} alt="" className="cal-img" />
                  <span className="cal-font">2019</span>
                  <img src={DownArrowIcon} alt="" className="cal-img" />
                </div>
              </div>
              <div className="support-content">
                {month_Data && month_Data.map((item, index) => (
                  <div className="support-inner-content">
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
          <div className="song-wrapper">
            <div className="w-50 song-inner-content mr-50">
              <div className="song-head">
                <span className="song-head-title">Most Played</span>
                <span className="song-count-title"># of Plays</span>
              </div>
              {renderSongList()}
            </div>
            <div className="w-50 song-inner-content">
              <div className="song-head">
                <span className="song-head-title">Most Purchased</span>
                <span className="song-count-title"># of Sales</span>
              </div>
              {renderSongList()}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <NewNFT closeNewNftModal={handleCloseModal} />}
    </div>
  )
};

export default ArtistDashboard;