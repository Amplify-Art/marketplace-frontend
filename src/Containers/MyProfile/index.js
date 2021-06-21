import React, { useState, useEffect, useRef } from 'react';
import jwt_decode from 'jwt-decode';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './MyProfile.scss';

import { fetchAlbumsAction } from '../../redux/actions/AlbumAction';
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

function MyProfile(props) {
  const [bannerImage, setBannerImage] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [userName, setUserName] = useState('');
  
  const generateAlbumItem = (album, index) => {
    return (
      <SingleAlbum key={index} albumInfo={album} />
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
        <button>Set as <img src={TwitterIcon} alt="Twitter" /> Banner</button>
        <button><img src={ShareIcon} alt="Twitter" /> Share</button>
      </>
    )
  }

  useEffect(() => {
    const token = localStorage.getItem('amplify_app_token');
    const decodedToken = jwt_decode(token);

    setBannerImage(decodedToken.banner);
    setProfileImage(decodedToken.avatar);
    setUserName(decodedToken.username);

    props.fetchAlbums();
  }, []);
  return (
    <div id="profile" className="left-nav-pad right-player-pad">
      <ProfileHeader ArtistData={ArtistData} btnContent={renderBtnContent()} />

      <div className="recently-purchased">
        <div className="top">
          <h2>Recently Purchased</h2>
          <button className="btn outlined">View All</button>
        </div>

        <div className="albums" className="album-grid">
          {props && props.albums && props.albums.length > 0 && props.albums.map((album, index) => (
            generateAlbumItem(album, index)
          ))}
        </div>
      </div>
    </div>
  );
}


export default connect(state => {
  return {
    albums: state.albums.albums,
  }
},
  dispatch => {
    return {
      fetchAlbums: () => dispatch(fetchAlbumsAction()),
    }
  })(withRouter(MyProfile));