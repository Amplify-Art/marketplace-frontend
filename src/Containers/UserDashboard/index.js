import React from 'react';
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

import ProfileAlbum from '../../Components/Common/ProfileAlbum/index';

function UserDashboard() {

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
        {isCreateButton && <button className="btn-wrap mr-27">Create New</button>}
        <button className="btn-wrap">View All</button>
      </div>
    </div>
  )

  return (
    <div id="user-dashboard" className="left-nav-pad right-player-pad">
      <div className="container">
        {renderHeader("Recently Played")}
        <div className="album-block">
          {fakeAlbums && fakeAlbums.length > 0 && fakeAlbums.map((album, index) => (
            <SingleAlbum key={index} albumInfo={album} isMint={false} />
          ))}
        </div>
        {renderHeader("Playlists - 4", true)}
        <div className="album-block">
          {playlistAlbum && playlistAlbum.length > 0 && playlistAlbum.map((album, index) => (
            <SingleAlbum key={index} albumInfo={album} isMint={false} />
          ))}
        </div>
        {renderHeader("Followed Artists", false)}
        <div className="album-block">
          {fakeAvatar && fakeAvatar.map((avatar, index) => (
            <ProfileAlbum avatarImg={avatar.user_img} name={avatar.name} />
          ))}
        </div>
      </div>
    </div>
  )
};

export default UserDashboard;