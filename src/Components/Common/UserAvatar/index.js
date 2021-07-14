import React from 'react';

import './UserAvatar.scss';

function UserAvatar(props) {
  const { avatarImg, name, onClick } = props
  return (
    <div className="user-avatar" onClick={onClick}>
      <div className="avatar">
        <img src={avatarImg} alt="" />
      </div>
      <span className="avatar-name">{name}</span>
    </div>
  )
}

export default UserAvatar;