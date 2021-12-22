import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import GeneralModal from '../../Components/Common/GeneralModal/index';
import CreatePlayList from '../../Components/Parts/CreatePlayList';
import SongList from '../../Components/Parts/SongList/index';

import { fetchPlaylistsAction, deletePlaylistAction, hideDeletePlaylistAction, showPlaylistModalAction, hidePlaylistModalAction } from '../../redux/actions/PlaylistAction'
import { fetchFollowersAction } from '../../redux/actions/FollowerAction';

import './UserDashboard.scss';

import SingleAlbum from '../../Components/Common/SingleAlbum/index';
import CoverOne from '../../assets/images/cd-cover-one.png';
import CoverTwo from '../../assets/images/cover2.png';
import CoverThree from '../../assets/images/cover3.png';
import CoverFour from '../../assets/images/cover4.png';
import CDPlayer from '../../assets/images/cd_player.svg';
import Avatar from '../../assets/images/avatar.png';
import AvatarTwo from '../../assets/images/avatar2.png';
import AvatarThree from '../../assets/images/avatar3.png';
import AvatarFour from '../../assets/images/avatar4.png';

import UserAvatar from '../../Components/Common/UserAvatar/index';

function UserDashboard(props) {
  const [showPlaylistDeleteModal, setShowPlaylistDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const token = jwt.decode(localStorage.getItem('amplify_app_token'))
  useEffect(() => {
    props.fetchPlaylists({
      params: {
        related: 'songs.album',
        orderBy: '-id',
        'filter[user_id]': token.id
      }
    });
    props.fetchFollowers({
      params: {
        'filter[follower_id]': token.id,
        'related': 'artist'
      }
    })
  }, []);

  const renderHeader = (title, isCreateButton = false) => (
    <div className="album-header">
      <span className="header-title">{title}</span>
      <div>
        {isCreateButton && <button className="btn-wrap" onClick={() => togglePlayListModal()}>Create New</button>}
        {/* <button className="btn-wrap">View All</button> */}
      </div>
    </div>
  );

  const togglePlayListModal = () => {
    if (props.show_modal) {
      props.hidePlaylistModal();
    } else {
      props.showPlaylistModal();
    }
  }
  return (
    <div id="user-dashboard" className="left-nav-pad right-player-pad">
      <div className="container">
        {renderHeader("Recently Played")}
        <div className="album-block">
          {/* {fakeAlbums && fakeAlbums.length > 0 && fakeAlbums.map((album, index) => (
            <SingleAlbum key={index} albumInfo={album} isMint={false} />
          ))} */}
        </div>

        <div className="no-records">
          <h5>No recently played songs</h5>
        </div>

        {renderHeader(`Playlists - ${props.totalPlaylists ? props.totalPlaylists : "0"}`, true)}

        {props.playlists && props.playlists.length > 0 ? (
          <div className="album-block">
            {props.playlists.map((album, index) => (
              <SingleAlbum key={index} albumInfo={{ ...album, hideSticker: true }} isMint={false} isPlayList setDeletingId={setDeletingId} />
            ))}
          </div>
        ) : (
          <div className="no-records">
            <h5>No playlists found</h5>
          </div>
        )}

        {/* <SongList /> */}

        {renderHeader("Followed Artists", false)}
        <div className="album-block">
          {props.myFollowings.map((following, index) => (
            <UserAvatar avatarImg={following.artist.avatar} onClick={() => props.history.push(`/artist/${following.artist.id}`)} name={following.artist.name} />
          ))}
        </div>
      </div>
      {props.show_modal && <GeneralModal
        headline={<><span>Create New Playlist</span><span style={{ float: 'right', color: '#bcbcbc', cursor: 'pointer' }} onClick={() => togglePlayListModal()}> ⤫</span></>}
        bodyChildren={<CreatePlayList showCaseData={{}} togglePlayListModal={togglePlayListModal} />}
        contentClassName="playlist-modal"
      />
      }
      {
        props.show_delete_modal &&
        <GeneralModal
          // topIcon={ConfettiImage}
          headline="Are you sure to delete this playlist?"
          buttons={[
            {
              type: 'solid go-home',
              text: 'Yes',
              onClick: () => props.deletePlaylist({ id: deletingId })
            },
            {
              type: 'solid go-home',
              text: 'Cancel',
              onClick: () => props.hideDeletePlaylist()
            }
          ]}
          className="centered"
        />
      }
    </div>
  )
};

export default connect(state => {
  return {
    playlists: state.playlists.playlists,
    totalPlaylists: state.playlists.total,
    myFollowings: state.followers.followers,
    show_delete_modal: state.playlists.show_delete_modal,
    show_modal: state.playlists.show_modal
  }
},
  dispatch => {
    return {
      fetchPlaylists: (data) => dispatch(fetchPlaylistsAction(data)),
      fetchFollowers: (data) => dispatch(fetchFollowersAction(data)),
      deletePlaylist: (data) => dispatch(deletePlaylistAction(data)),
      hideDeletePlaylist: (data) => dispatch(hideDeletePlaylistAction(data)),
      showPlaylistModal: () => dispatch(showPlaylistModalAction()),
      hidePlaylistModal: () => dispatch(hidePlaylistModalAction()),
    }
  })(withRouter(UserDashboard));
