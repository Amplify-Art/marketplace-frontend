import React from 'react';

import './ProfileHeader.scss';
import Shelf from '../../../assets/images/shelf.png';

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
      <div className="profile-cover" style={{ backgroundImage: `url(${coverPhoto()})` }}>
        <div className="shelves">
          <div className="single-shelf">
            <div className="albums-on-shelf">
              <div className="single-album-on-shelf">
                <i className="fal fa-plus" />
              </div>
              <div className="single-album-on-shelf">
                <i className="fal fa-plus" />
              </div>
              <div className="single-album-on-shelf">
                <i className="fal fa-plus" />
              </div>
            </div>
            <img src={Shelf} />
          </div>
          <div className="single-shelf">
            <div className="albums-on-shelf">
              <div className="single-album-on-shelf">
                <i className="fal fa-plus" />
              </div>
              <div className="single-album-on-shelf">
                <i className="fal fa-plus" />
              </div>
              <div className="single-album-on-shelf">
                <i className="fal fa-plus" />
              </div>
            </div>
            <img src={Shelf} />
          </div>
        </div>
      </div>
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
      <div className="details mobile">{ArtistData.name}</div>
    </div>
  )
};

export default ProfileHeader;