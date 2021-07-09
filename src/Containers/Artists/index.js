import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchArtists } from '../../redux/actions/ArtistAction';
import './Artists.scss';

import ProfileAlbum from '../../Components/Common/ProfileAlbum/index';

function Artists(props) {
  useEffect(() => {
    props.fetchArtists();
  }, []);
  return (
    <p>hey</p>
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

