import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import ProfileHeader from '../../Components/Common/ProfileHeader';
import ArtisrAvatar from '../../assets/images/artist-avatar.svg';
import { fetchAlbumsAction } from '../../redux/actions/AlbumAction';
import { fetchArtistByIdAction } from '../../redux/actions/ArtistAction';
import CoverImg from '../../assets/images/profile-cover.png';
import PageNotFound from '../PageNotFound'
import './ArtistProfile.scss';
import ShareIcon from '../../assets/images/share-icon.svg';
import { fetchFollowersAction, updateFollowerAction, addFollowerAction } from '../../redux/actions/FollowerAction';

import SingleAlbum from '../../Components/Common/SingleAlbum/index';

function ArtistProfile(props) {
  const { artist } = props;
  const [albums, setAlbums] = useState([])
  const token = localStorage.getItem('amplify_app_token');
  const decodedToken = jwt_decode(token);
  const [userID, setID] = useState(null);
  const [artistFound, setArtistFound] = useState(false)

  useEffect(() => {
    console.log(props.match)
    const userId = parseInt(props.match.params.slug);
    console.log(userId)
    if (userId) {
      setID(userId)
    }
  }, [])
  const generateAlbumItem = (album, index) => {
    return (
      <SingleAlbum key={index} albumInfo={album} />
    );
  }
  useEffect(() => {
    if (props.artist)
      setArtistFound(true)
  }, [props.artist && props.artist.id])
  const renderBtnContent = () => {
    return (
      <>
        {/* <button><img src={TwitterIcon} alt="Twitter" />View All</button>
        <button><img src={TwitterIcon} alt="Twitter" />View All</button> */}
        {/* <button>Upload Store Banner</button>
        <button>Mint New Album</button> */}
        <button className="set_name" onClick={() => onFollow()} >{/*<img src={ShareIcon} alt="Twitter" />*/}{props.myFollowings.findIndex(f => (f && f.artist_id) === userID) === -1 ? 'Follow' : 'Unfollow'}</button>
      </>
    )
  }

  useEffect(() => {
    const payload = {
      id: props.match.params.slug,
      params: {
        type: 'artist'
      }
    };

    props.fetchArtist(payload);
    props.fetchAlbums({
      user_id: props.match.params.slug,
      params: {
        'filter[user_id]': parseInt(props.match.params.slug),
        related: 'songs'
      }
    });
  }, []);

  useEffect(() => {
    const filterAlbums = props.albums.filter(album => album.user_id == props.match.params.slug && !album.is_purchased)
    setAlbums(filterAlbums)
  }, [props.albums]);


  const onFollow = () => {
    // console.log(props.myFollowings, userID, decodedToken)
    let follow = props.myFollowings.find(f => f.artist_id === userID)
    console.log(follow)
    if (follow) {
      props.updateFollower({
        id: follow.id,
        is_deleted: true,
        artist_id: null,
        follower_id: null,
      })
    } else {
      props.addFollower({
        artist_id: userID,
        follower_id: decodedToken.id,
      })
    }
  }
  console.log(albums, 'albums')
  return (
    artistFound ?
      props.artist && props.artist.success && props.artist.type === 'artist' ? <div id="profile" className={`left-nav-pad ${props.playerActive ? 'right-player-pad' : 'normal-right-pad'}`}>
        <ProfileHeader ArtistData={artist} btnContent={renderBtnContent()} showShowcase={false} />

        <div className="recently-purchased">
          <div className="top">
            <h2>Recently Released</h2>
            {/* {albums && albums.length > 20 && <button className="btn outlined">View All</button>} */}
          </div>

          <div className="albums" className={`${albums && albums.length > 0 && 'album-grid'}`}>
            {
              albums && albums.length > 0 ? albums?.map((album, index) => (
                generateAlbumItem({ ...album, hideSticker: true }, index)
              )) : (
                <div className="no-results">
                  <h4>This artist currently has no recent releases. Please check back again later.</h4>
                </div>
              )}
          </div>
        </div>
      </div> : <div className="text-title">This Artist Could Not Be Found</div>
      : <></>
  );
}

export default connect(state => {
  return {
    albums: state.albums.albums,
    artist: state.artist.artist,
    myFollowings: state.followers.followers,
    token_transfers: state.token_transfers.token_transfers,
  }
},
  dispatch => {
    return {
      fetchAlbums: (payload) => dispatch(fetchAlbumsAction(payload)),
      fetchArtist: (payload) => dispatch(fetchArtistByIdAction(payload)),
      fetchFollowers: (data) => dispatch(fetchFollowersAction(data)),
      updateFollower: (data) => dispatch(updateFollowerAction(data)),
      addFollower: (data) => dispatch(addFollowerAction(data)),
    }
  })(withRouter(ArtistProfile));

