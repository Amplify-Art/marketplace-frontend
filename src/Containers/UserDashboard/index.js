import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import GeneralModal from '../../Components/Common/GeneralModal/index';
import CreatePlayList from '../../Components/Parts/CreatePlayList';
import SongList from '../../Components/Parts/SongList/index';

import { fetchPlaylistsAction } from '../../redux/actions/PlaylistAction'
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
  const [showPlayListModal, togglePlayListModal] = useState(false);
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
  const fakeAlbums = [
    {
      title: "A Cool Album",
      artist: "Jonathon",
      totalAvailable: 100,
      editionNumber: 75,
      own: 4,
      coverArt: CoverOne
    },
    {
      title: "The Greatest",
      artist: "Russ",
      totalAvailable: 50,
      editionNumber: 2,
      own: 4,
      coverArt: CoverTwo
    },
    {
      title: "Another One",
      artist: "Anil",
      forSale: false,
      own: 4,
      coverArt: CoverThree
    },
    {
      title: "A Cool Album",
      artist: "Jonathon",
      totalAvailable: 100,
      editionNumber: 75,
      own: 4,
      coverArt: CoverFour
    },
  ];

  const fakeAvatar = [
    { user_img: Avatar, name: "Imagine Dragons" },
    { user_img: AvatarTwo, name: "Kid Cudi" },
    { user_img: AvatarThree, name: "Eminem" },
    { user_img: AvatarFour, name: "John Mayer" },
  ]

  const playlistAlbum = [
    {
      title: "You + Me",
      coverArt: CDPlayer
    },
    {
      title: "The Best Playlist",
      coverArt: CDPlayer
    },
    {
      title: "Oh The Larceny",
      coverArt: CDPlayer
    },
    {
      title: "Recovery",
      coverArt: CDPlayer
    },
  ];

  const renderHeader = (title, isCreateButton = false) => (
    <div className="album-header">
      <span className="header-title">{title}</span>
      <div>
        {isCreateButton && <button className="btn-wrap" onClick={() => togglePlayListModal(!showPlayListModal)}>Create New</button>}
        {/* <button className="btn-wrap">View All</button> */}
      </div>
    </div>
  );

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
              <SingleAlbum key={index} albumInfo={album} isMint={false} isPlayList />
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
      {showPlayListModal && <GeneralModal
        headline="Create New Playlist"
        bodyChildren={<CreatePlayList showCaseData={{}} togglePlayListModal={togglePlayListModal} />}
        contentClassName="playlist-modal"
        closeModal={() => togglePlayListModal(!showPlayListModal)}
        isCloseButton={true}
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
  }
},
  dispatch => {
    return {
      fetchPlaylists: (data) => dispatch(fetchPlaylistsAction(data)),
      fetchFollowers: (data) => dispatch(fetchFollowersAction(data))
    }
  })(withRouter(UserDashboard));
