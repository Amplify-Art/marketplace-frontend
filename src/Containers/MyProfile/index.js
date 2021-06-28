import React, { useState, useEffect, useRef } from 'react';
import jwt_decode from 'jwt-decode';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './MyProfile.scss';

import { fetchNFTsAction } from '../../redux/actions/NFTAction';
import CoverImg from '../../assets/images/profile-cover.png';
import ProfileHeader from '../../Components/Common/ProfileHeader';
import SingleAlbum from '../../Components/Common/SingleAlbum/index';

import ArtisrAvatar from '../../assets/images/artist-avatar.svg';

import Shady from '../../assets/images/shady.jpg';
import TwitterIcon from '../../assets/images/twitter-icon.svg';
import ShareIcon from '../../assets/images/share-icon.svg';
import CoverOne from '../../assets/images/cd-cover-one.png';
import CoverTwo from '../../assets/images/cover2.png';
import CoverThree from '../../assets/images/cover3.png';
import CoverFour from '../../assets/images/cover4.png';
import CoverFive from '../../assets/images/cover5.png';
import copyLink from '../../assets/images/highblack copy 1.svg'

function MyProfile(props) {
  const [bannerImage, setBannerImage] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [userName, setUserName] = useState('');
  const [openSharePopup, setSharePopup] = useState(false)

  const generateAlbumItem = (nft, index) => {
    return (
      <SingleAlbum key={index} albumInfo={nft} />
    );
  }

  const ArtistData = {
    cover: bannerImage,
    avatar: profileImage,
    name: userName
  };

  const renderBtnContent = () => {
    return (
      <>
        <button >Set as <img src={TwitterIcon} alt="Twitter" /> Banner</button>
        <button className="set_name" onClick={() => setSharePopup(!openSharePopup)} ><img src={ShareIcon} alt="Twitter" /> Share</button>
        {openSharePopup && <div className="popUp" >
          <div className="popup-div" style={{ paddingBottom: '8px' }}><img src={copyLink} alt="Copy Link" className="popup-img" />Copy Link</div>
          <div className="popup-div"><img src={TwitterIcon} alt="Twitter" className="popup-img" style={{ paddingRight: '15px' }} />Tweet</div>
        </div>}
      </>
    )
  }

  useEffect(() => {
    const token = localStorage.getItem('amplify_app_token');
    if (token) {
      const decodedToken = jwt_decode(token);
      setBannerImage(decodedToken.banner);
      setProfileImage(decodedToken.avatar);
      setUserName(decodedToken.username);
    }
    props.fetchNFTs();
  }, []);
  console.log(props.loading)
  return (
    <div id="profile" className="left-nav-pad right-player-pad">
      <ProfileHeader ArtistData={ArtistData} btnContent={renderBtnContent()} />
      {props.nfts.length ?
        <div className="recently-purchased">
          <div className="top">
            <h2>Recently Purchased</h2>
            <button className="btn outlined">View All</button>
          </div>

          <div className="albums" className="album-grid">
            {props && props.nfts && props.nfts.length > 0 && props.nfts.map((nft, index) => (
              generateAlbumItem(nft, index)
            ))}
          </div>
        </div>
        :
        !props.loading ?
          <span>No items to show</span>
          : null
      }
    </div>
  );
}


export default connect(state => {
  return {
    nfts: state.nfts.nfts,
    total: state.nfts.total,
    loading: state.nfts.loading
  }
},
  dispatch => {
    return {
      fetchNFTs: () => dispatch(fetchNFTsAction()),
    }
  })(withRouter(MyProfile));