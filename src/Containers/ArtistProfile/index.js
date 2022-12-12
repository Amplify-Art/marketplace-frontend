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
import { getUsers } from '../../Api/User';
import SingleAlbum from '../../Components/Common/SingleAlbum/index';
import Rolling from './Rolling.svg'

function ArtistProfile(props) {
  const { artist } = props;
  const [albums, setAlbums] = useState([])
  const token = localStorage.getItem('amplify_app_token');
  const decodedToken = jwt_decode(token);
  const [userID, setID] = useState(null);
  const [artistFound, setArtistFound] = useState(false)

  useEffect(() => {
    findUser();
  }, [])

  const findUser = async () => {
    const nearId = props.match.params.slug;
    const res = await getUsers({
      params: {
        'filter[near_account_id]': nearId
      }
    })
    if (res.data.success && res.data.results.length) {
      let { id, near_account_id } = res.data.results[0];
      console.log(id)
      setID(id);
    }
  }

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
    if (userID) {
      const payload = {
        id: userID,
        params: {
          type: 'artist'
        }
      };

      props.fetchArtist(payload);
      props.fetchAlbums({
        user_id: userID,
        params: {
          'filter[user_id]': userID,
          related: 'user,songs'
        }
      });
    }
  }, [userID]);

  useEffect(() => {
    const filterAlbums = props.albums.filter(album => album.user_id == userID)
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
  return (
    <> {props.albumLoading || props.artistLoading ? <div className='loading'>
      <img src={Rolling} alt='rolling' />
    </div> : <> {
      artistFound ?
        props.artist && props.artist.success && props.artist.type === 'artist' ? <div id="profile" className={`left-nav-pad ${props.playerActive ? 'right-player-pad' : 'normal-right-pad'}`}>
          <ProfileHeader ArtistData={artist} btnContent={renderBtnContent()} showShowcase={false} isPublicProfile />

          <div className="recently-purchased">
            <div className="top">
              <h2>Recently Released</h2>
            </div>

            <div className={`albums ${albums && albums.length > 0 && 'album-grid'}`}>
              {
                albums && albums.length > 0 ? albums?.map((album, index) => (
                  generateAlbumItem({ ...album, hideSticker: false }, index)
                )) : (
                  <div className="no-results">
                    <h4>This artist currently has no recent releases. Please check back again later.</h4>
                  </div>
                )}
            </div>
          </div>
        </div> : <div className="text-title">This Artist Could Not Be Found</div>
        : <div className='loading'>
          <img src={Rolling} alt='rolling' />
        </div>
    }
    </>
    }
    </>
  );
}

export default connect(state => {
  return {
    albums: state.albums.albums,
    artist: state.artist.artist,
    myFollowings: state.followers.followers,
    token_transfers: state.token_transfers.token_transfers,
    albumLoading: state.albums.loading,
    artistLoading: state.artist.loading
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
