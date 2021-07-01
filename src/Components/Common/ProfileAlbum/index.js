import React from 'react';

import './ProfileAlbum.scss';

function ProfileAlbum (props) {
    const { avatarImg, name } = props
    return(
        <div id="profile-album">
            <img src={avatarImg} alt="" className="img-round" />
            <span className="avatar-name">{name}</span>
        </div>
    )
}

export default ProfileAlbum;