import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ProfileHeader from '../../Components/Common/ProfileHeader';
import ArtisrAvatar from '../../assets/images/artist-avatar.svg';
import { fetchAlbumsAction } from '../../redux/actions/AlbumAction';
import { fetchArtistByIdAction } from '../../redux/actions/ArtistAction';
import CoverImg from '../../assets/images/profile-cover.png';
import PageNotFound from '../PageNotFound'
import './ArtistProfile.scss';

import SingleAlbum from '../../Components/Common/SingleAlbum/index';

function ArtistProfile(props) {

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

  const renderBtnContent = () => {
    return (
      <>
        {/* <button><img src={TwitterIcon} alt="Twitter" />View All</button>
        <button><img src={TwitterIcon} alt="Twitter" />View All</button> */}
        <button>Upload Store Banner</button>
        <button>Mint New Album</button>
      </>
    )
  }

  useEffect(() => {
    
    // console.log('slug : ',props.match.params.slug)
    console.log('albums',props.albums)
    const payload = {
      id: props.match.params.slug
    }
    props.fetchArtist(payload);
    props.fetchAlbums();
  }, [])
  
  return (
     props.artist?.success ? <div id="profile" className="left-nav-pad right-player-pad">
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
    </div> : <PageNotFound text="This Artist Could Not Be Found" />
  );
}

export default connect(state => {
  return {
    albums: state.albums.albums,
    artist: state.artist.artist
  }
},
  dispatch => {
    return {
      fetchAlbums: () => dispatch(fetchAlbumsAction()),
      fetchArtist: (payload) => dispatch(fetchArtistByIdAction(payload))
    }
  })(withRouter(ArtistProfile));

