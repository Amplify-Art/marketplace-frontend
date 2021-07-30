import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ProfileHeader from '../../Components/Common/ProfileHeader';
import ArtisrAvatar from '../../assets/images/artist-avatar.svg';
import { fetchNFTsAction } from '../../redux/actions/NFTAction';
import { fetchArtistByIdAction } from '../../redux/actions/ArtistAction';
import CoverImg from '../../assets/images/profile-cover.png';
import PageNotFound from '../PageNotFound'
import './ArtistProfile.scss';

import SingleAlbum from '../../Components/Common/SingleAlbum/index';

function ArtistProfile(props) {
  const { artist } = props;
  const [albums,setAlbums] = useState([])

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
        {/* <button>Upload Store Banner</button>
        <button>Mint New Album</button> */}
      </>
    )
  }

  useEffect(() => {
    const payload = {
      id: props.match.params.slug
    };
    
    props.fetchArtist(payload);
    props.fetchNFTs({
      is_purchased: false,
      user_id: props.match.params.slug
    });
  }, []);

  useEffect(()=>{
    const filterAlbums = props.albums.filter(album=>album.user_id == props.match.params.slug && !album.is_purchased)
    setAlbums(filterAlbums)
  },[props.albums]);
  return (
     props.artist?.success ? <div id="profile" className="left-nav-pad right-player-pad">
      <ProfileHeader ArtistData={artist} btnContent={renderBtnContent()} showShowcase={false} />

      <div className="recently-purchased">
        <div className="top">
          <h2>Recently Released</h2>
          {/* {albums && albums.length > 20 && <button className="btn outlined">View All</button>} */}
        </div>

        <div className="albums" className={`${albums && albums.length > 0 && 'album-grid'}`}>
          {albums && albums.length > 0 ? albums?.map((album, index) => (
            generateAlbumItem(album, index)
          )) : (
            <div className="no-results">
              <h4>This artist currently has no recent releases. Please check back again later.</h4>
            </div>
          )}
        </div>
      </div>
    </div> : <div className="text-title">This Artist Could Not Be Found</div>
  );
}

export default connect(state => {
  return {
    albums: state.nfts.nfts,
    artist: state.artist.artist
  }
},
  dispatch => {
    return {
      fetchNFTs: (payload) => dispatch(fetchNFTsAction(payload)),
      fetchArtist: (payload) => dispatch(fetchArtistByIdAction(payload))
    }
  })(withRouter(ArtistProfile));

