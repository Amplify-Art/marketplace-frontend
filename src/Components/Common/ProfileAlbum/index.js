import React from 'react';

import './ProfileAlbum.scss';

function ProfileAlbum(props) {
  const { avatarImg, name } = props
  return (
    <div className="profile-album">
      <div className="avatar">
        <img src={avatarImg} alt="" />
      </div>
      <span className="avatar-name">{name}</span>
    </div>
  )
}

export default ProfileAlbum;