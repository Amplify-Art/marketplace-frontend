import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  TwitterShareButton
} from "react-share";

import './MyProfile.scss';

import { fetchNFTsAction } from '../../redux/actions/NFTAction';
import { fetchTokenTransfersAction } from '../../redux/actions/TokenTransferAction';
import ProfileHeader from '../../Components/Common/ProfileHeader';
import SingleAlbum from '../../Components/Common/SingleAlbum/index';

import TwitterIcon from '../../assets/images/twitter-icon.svg';
import ShareIcon from '../../assets/images/share-icon.svg';
import copyLink from '../../assets/images/highblack copy 1.svg'
import defaultProfile from '../../assets/images/default-profile.jpg'

function MyProfile(props) {
  const [bannerImage, setBannerImage] = useState('');
  const [profileImage, setProfileImage] = useState(defaultProfile);
  const [userName, setUserName] = useState('');
  const [userID, setID] = useState(0);
  const [openSharePopup, setSharePopup] = useState(false)
  const token = localStorage.getItem('amplify_app_token');
  const decodedToken = jwt_decode(token);
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

  const copyProfileLink = (e) => {
    e.preventDefault();
    // const profileLink = document.getElementById("hidden-profile-link");

    // profileLink.select();
    // profileLink.setSelectionRange(0, 99999); /* For mobile devices */

    // document.execCommand("copy");

    const tempInput = document.createElement("input");
    tempInput.value = `https://amplify.art/user/${userID}`;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    setSharePopup(false);
  }

  const renderBtnContent = () => {
    return (
      <>
        <button >Set as <img src={TwitterIcon} alt="Twitter" /> Banner</button>
        <div className="popup-container">
          {openSharePopup && <div className="popUp" >
            <a href='#' className="popup-div" style={{ paddingBottom: '16px' }} onClick={copyProfileLink}><img src={copyLink} alt="Copy Link" className="popup-img" />Copy Link</a>
            <TwitterShareButton
              className="popup-div"
              title="Check out my Amplify.art profile!"
              url={`https://amplfy.art/user/${userID}`}
              via="amplifyart"
            ><img src={TwitterIcon} alt="Twitter" className="popup-img" style={{ paddingRight: '15px' }} />Tweet</TwitterShareButton>
          </div>}
          <button className="set_name" onClick={() => setSharePopup(!openSharePopup)} ><img src={ShareIcon} alt="Twitter" /> Share</button>
        </div>

      </>
    )
  }

  useEffect(() => {
    if (token) {
      setBannerImage(decodedToken.banner);
      setProfileImage(decodedToken.avatar);
      setUserName(decodedToken.username);
      setID(decodedToken.id);
    }
    props.fetchTokenTransfers({
      params: {
        type: 'album_bundle',
        related: 'album.songs',
        orderBy: '-id',
        transfer_to: decodedToken.id
      }
    });
  }, []);
  console.log(props.token_transfers.filter(f => f.type === 'album'))
  return (
    <div id="profile" className="left-nav-pad right-player-pad">
      <ProfileHeader ArtistData={ArtistData} btnContent={renderBtnContent()} />
      {props.token_transfers.length ?
        <div className="recently-purchased">
          <div className="top">
            <h2>Recently Purchased</h2>
            <button className="btn outlined">View All</button>
          </div>

          <div className="albums" className="album-grid">
            {props && props.token_transfers && props.token_transfers.length > 0 && props.token_transfers.filter(f => f.type === 'album_bundle').map((token, index) => (
              generateAlbumItem({ ...token.album, copy_number: token.copy_number }, index)
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
    loading: state.nfts.loading,
    token_transfers: state.token_transfers.token_transfers
  }
},
  dispatch => {
    return {
      fetchTokenTransfers: (data) => dispatch(fetchTokenTransfersAction(data)),
    }
  })(withRouter(MyProfile));