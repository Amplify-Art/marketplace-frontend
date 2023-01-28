import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { showCaseData } from "../../../Containers/Sandbox";
import GeneralModal from "../../Common/GeneralModal/index";
import defaultProfile from "../../../assets/images/default-profile.svg";
import bannerDefault from "../../../assets/images/banner_default.jpeg";

import ArtistIcon from '../../../assets/images/artist-icon-badge.svg';

import "./ArtistHeader.scss";

function ProfileHeader({
  ArtistData,
  btnContent,
  fetchShowcase,
  showcases,
  showShowcase,
  isPublicProfile,
  userId,
  tokenTransfers,
  updateShowcase
}) {
  const [showShowCaseModal, toggleShowCaseModal] = useState(false);
  const [fetchShowCases, setFetchShowCases] = useState(false);

  const coverPhoto = () => {
    let coverPhoto;

    if (ArtistData.cover) {
      coverPhoto = ArtistData.cover;
    } else if (ArtistData.banner) {
      coverPhoto = ArtistData.banner;
    } else {
      coverPhoto = bannerDefault;
    }

    return coverPhoto;
  };

  let songsCount = tokenTransfers && tokenTransfers.length ? tokenTransfers.length : 0;

  return (
    <div id="artist-header">
      <div
        className={`profile-cover ${coverPhoto() === bannerDefault && "default"
          }`}
        style={{ backgroundImage: `url(${coverPhoto()})` }}
      >
      </div>
      <div className="container flex f-jc-space-between f-align-center">
        <div className="profile-head-details">
          <div className="profile-wrap">
            <div className="profile-image">
              {/* <img
                src={!ArtistData.avatar ? defaultProfile : ArtistData.avatar}
                alt='avatar'
              /> */}
              <div
                className="profilePic"
                style={{
                  backgroundImage: `url(${!ArtistData.avatar ? defaultProfile : ArtistData.avatar
                    })`,
                }}
              />
            </div>

            <div className="details">
              {!isPublicProfile && (
                <div className="flex">
                <span className="artist-badge"><img src={ArtistIcon} alt="Artist Icon" /> Artist</span>
                </div>
              )}
              <span>{ArtistData.name || ArtistData.near_account_id}</span>
            </div>
          </div>
        </div>
        <div className="btn-wrap">{btnContent}</div>
      </div>
    </div >
  );
}

export default withRouter(ProfileHeader);
