import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ProfileHeader from '../../Components/Common/ProfileHeader';
import ArtisrAvatar from '../../assets/images/artist-avatar.svg';
import { fetchAlbumsAction } from '../../redux/actions/AlbumAction';
import CoverImg from '../../assets/images/profile-cover.png';
import './ArtistProfile.scss';

import SingleAlbum from '../../Components/Common/SingleAlbum/index';
import NewNFT from '../../Components/Common/NewNFT/index';

function ArtistProfile(props) {

  const [isModalOpen, setIsModalOpen] = useState(false)

  const ArtistData = {
    cover: CoverImg,
    avatar: ArtisrAvatar,
    name: 'Imagine Dragons'
  };

  const generateAlbumItem = (album, index) => {
    return (
      <SingleAlbum key={index} albumInfo={album} />
    );
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

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

  const handleCloseModal = () => {
    console.log("call");
    setIsModalOpen(false)
  }

  useEffect(() => {
    props.fetchAlbums();
  }, [])
  return (
    <div id="profile" className="left-nav-pad right-player-pad">
      <ProfileHeader ArtistData={ArtistData} btnContent={renderBtnContent()} />

      <div className="recently-purchased">
        <div className="top">
          <h2>Recently Released</h2>
          <button className="btn outlined">View All</button>
        </div>

        <div className="albums" className="album-grid">
          {props && props.albums && props.albums.length > 0 && props.albums.map((album, index) => (
            generateAlbumItem(album, index)
          ))}
        </div>
      </div>
      {isModalOpen && <NewNFT closeNewNftModal={handleCloseModal} />}
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
  })(withRouter(ArtistProfile));

