import React from 'react';

import './ProfileHeader.scss';

function ProfileHeader({ ArtistData, btnContent }) {
  const coverPhoto = () => {
    let coverPhoto;

    if (ArtistData.cover) {
      coverPhoto = ArtistData.cover;
    } else if (ArtistData.banner) {
      coverPhoto = ArtistData.banner;
    }

    return coverPhoto;
  }
  return (
    <div id="profile-header">
      <div className="profile-cover" style={{ backgroundImage: `url(${coverPhoto()})` }} />
      <div className="container flex f-jc-space-between f-align-center">
        <div className="profile-head-details">
          <div className="profile-wrap">
            <div className="profile-image">
              <img src={ArtistData.avatar} />
            </div>

            <div className="details">{ArtistData.name}</div>
          </div>
        </div>
        <div className="btn-wrap">{btnContent}</div>
      </div>
    </div>
  )
};

export default ProfileHeader;