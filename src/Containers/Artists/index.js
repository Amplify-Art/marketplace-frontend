import React, { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchArtists } from '../../redux/actions/ArtistAction';
import './Artists.scss';

import ProfileAlbum from '../../Components/Common/ProfileAlbum/index';

function Artists(props) {
  const {fetchArtists, artists} = props;
  console.log('artists', artists)
  useEffect(() => {
    fetchArtists({});
  }, []);
  return (
    <div id="artists-page" className="left-nav-pad right-player-pad">
      <div className="container">
        <h2 className="page-title">Artists</h2>
          <div className="artists-holder">
            {artists && artists.length && artists.map((artist, index) => (
              <ProfileAlbum avatarImg={artist.avatar} key={index} name={artist.name} onClick={() => props.history.push('/test')} />
            ))}
          </div>
      </div>
    </div>
  );
}

export default connect(state => {
  return {
    artists: state.artist.artists
  }
},
  dispatch => {
    return {
      fetchArtists: (payload) => dispatch(fetchArtists(payload))
    }
  })(withRouter(Artists));

