import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import ArtistHeader from '../../Components/Common/ArtistHeader';
import { fetchAlbumsAction } from '../../redux/actions/AlbumAction';
import { fetchArtistByIdAction } from '../../redux/actions/ArtistAction';
import './ArtistProfile.scss';
import { fetchFollowersAction, updateFollowerAction, addFollowerAction } from '../../redux/actions/FollowerAction';
import { getUsers } from '../../Api/User';
import SingleAlbum from '../../Components/Common/SingleAlbum/index';
import Rolling from './Rolling.svg'

function ArtistProfile(props) {
  const { artist } = props;
  const [albums, setAlbums] = useState([])
  const token = localStorage.getItem('amplify_app_token');
  const [userID, setID] = useState(null);
  const [artistFound, setArtistFound] = useState(false)

  useEffect(() => {
    findUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const findUser = async () => {
    const nearId = props.match.params.slug;
    const res = await getUsers({
      params: {
        'filter[near_account_id]': nearId
      }
    })
    if (res.data.success && res.data.results.length) {
      let { id } = res.data.results[0];
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.artist && props.artist.id])
  const renderBtnContent = () => {
    return (
      <>
        {/* <button><img src={TwitterIcon} alt="Twitter" />View All</button>
        <button><img src={TwitterIcon} alt="Twitter" />View All</button> */}
        {/* <button>Upload Store Banner</button>
        <button>Mint New Album</button> */}
        {token && (
          <button className="follow-button" onClick={() => onFollow()} >{/*<img src={ShareIcon} alt="Twitter" />*/}{props.myFollowings.findIndex(f => (f && f.artist_id) === userID) === -1 ? 'Follow' : 'Unfollow'}</button>
        )}
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  useEffect(() => {
    const filterAlbums = props.albums.filter(album => album.user_id === userID)
    setAlbums(filterAlbums)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.albums]);


  const onFollow = () => {
    const decodedToken = jwt_decode(token);

    let follow = props.myFollowings.find(f => f.artist_id === userID)
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
        props.artist && props.artist.success && props.artist.type === 'artist' ? <div id="artist-profile" className="left-nav-pad normal-right-pad">
          <ArtistHeader ArtistData={artist} btnContent={renderBtnContent()} />

          <div className="recently-released">
            <div className="top">
              <h2>Recently Released</h2>
            </div>

            <div className={`albums ${albums && albums.length > 0 && 'album-grid'}`}>
              {
                albums && albums.length > 0 ? albums?.map((album, index) => (
                  generateAlbumItem({ ...album, hideSticker: false }, index)
                )) : (
                  <div className="placeholder-text no-mt center-text">
                  <i className="fa-duotone fa-album"></i>
                    This artist hasn't released any albums.
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
