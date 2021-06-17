import React from 'react';

import './ProfileHeader.scss';

function ProfileHeader({ ArtistData, btnContent }) {
    return (
        <div id="profile-header">
            <div className="profile-cover" style={{ backgroundImage: `url(${ArtistData.cover})` }} />
            <div className="container">
                <div className="profile-head-details">
                    <div className="profile-wrap">
                        <div className="profile-image">
                            <img src={ArtistData.avatar} alt="Shady" />
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