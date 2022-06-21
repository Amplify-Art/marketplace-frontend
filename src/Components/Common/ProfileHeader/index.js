import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import jwt from "jsonwebtoken";
import _ from "lodash";
import AddShowCase from "../../Parts/AddShowCase/index";
import { showCaseData } from "../../../Containers/Sandbox";
import GeneralModal from "../../Common/GeneralModal/index";
import defaultProfile from "../../../assets/images/default-profile.jpg";
import bannerDefault from "../../../assets/images/banner_default.jpeg";

import "./ProfileHeader.scss";
import Shelf from "../../../assets/images/shelf.png";

import { fetchShowcasesAction } from "../../../redux/actions/ShowcaseAction";

function ProfileHeader({
  ArtistData,
  btnContent,
  fetchShowcase,
  showcases,
  showShowcase,
  isPublicProfile,
  userId,
  nearUser,
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

  useEffect(() => {
    let user;
    if (isPublicProfile) {
      user = userId;
    } else {
      user = jwt.decode(localStorage.getItem("amplify_app_token")).id;
    }
    if (user)
      fetchShowcase({
        params: {
          related: "album",
          "filter[user_id]": user,
        },
      });
  }, [userId]);

  let songsCount = nearUser && nearUser.owned_songs ? nearUser.owned_songs : 0;
  console.log(songsCount, "songsCount");
  return (
    <div id="profile-header">
      <div
        className={`profile-cover ${coverPhoto() === bannerDefault && "default"
          }`}
        style={{ backgroundImage: `url(${coverPhoto()})` }}
      >
        {showShowcase && !showShowcase === false && (
          <div className="shelves">
            {showcases &&
              _.chunk(
                [...showcases, ...new Array(6 - showcases.length).fill(null)],
                3
              ).map((row, i) => (
                <div className="single-shelf" key={i}>
                  <div className="albums-on-shelf">
                    {row.map((showCaseItem, j) =>
                      showCaseItem ? (
                        <div className="single-album-on-shelf" key={`${i}${j}`}>
                          <div className="single-shelf-album">
                            <img
                              src={`https://amplify-dev.mypinata.cloud/ipfs/${showCaseItem.album?.cover_cid}`}
                            />
                          </div>
                        </div>
                      ) : (
                        <div
                          className="single-album-on-shelf"
                          onClick={() =>
                            toggleShowCaseModal(!showShowCaseModal)
                          }
                          key={`${i}${j}`}
                        >
                          {!isPublicProfile && <i className="fal fa-plus" />}
                        </div>
                      )
                    )}
                  </div>
                  <img src={Shelf} />
                </div>
              ))}
          </div>
        )}
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
            <div className="btn-wrap mobileShow">{btnContent}</div>

            <div className="details">
              <span>{ArtistData.name}</span>
              {!isPublicProfile && (
                <span className="no_of_songs">
                  {songsCount} {songsCount === 1 ? "Song" : "Songs"} Owned
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="btn-wrap mobileHide">{btnContent}</div>
        {
          showShowcase && !showShowcase === false && (
            <div className="shelvesMobile">
              {showcases &&
                _.chunk(
                  [...showcases, ...new Array(6 - showcases.length).fill(null)],
                  3
                ).map((row, i) => (
                  <div className="single-shelf" key={i}>
                    <div className="albums-on-shelf">
                      {row.map((showCaseItem, j) =>
                        showCaseItem ? (
                          <div className="single-album-on-shelf" key={`${i}${j}`}>
                            <div className="single-shelf-album">
                              <img
                                src={`https://amplify-dev.mypinata.cloud/ipfs/${showCaseItem.album?.cover_cid}`}
                              />
                            </div>
                          </div>
                        ) : (
                          <div
                            className="single-album-on-shelf"
                            onClick={() =>
                              toggleShowCaseModal(!showShowCaseModal)
                            }
                            key={`${i}${j}`}
                          >
                            {!isPublicProfile && <i className="fal fa-plus" />}
                          </div>
                        )
                      )}
                    </div>
                    <img src={Shelf} />
                  </div>
                ))}
            </div>
          )}
      </div>
      {/* <div className="details mobile">
        <span>{ArtistData.name}</span>
        {!isPublicProfile && (
          <span className="no_of_songs">
            {nearUser ? nearUser.owned_songs : 0} Song{" "}
            {nearUser && nearUser.owned_songs
              ? nearUser.owned_songs === 1
                ? nearUser.owned_songs
                : nearUser.owned_songs + "s"
              : 0}{" "}
            Owned
            {songsCount} {songsCount === 1 ? "Song" : "Songs"} Owned
          </span>
        )}
      </div> */}

      {showShowCaseModal && (
        <GeneralModal
          headline="Add to Showcase"
          bodyChildren={
            <AddShowCase
              showCaseData={showCaseData}
              toggleShowCaseModal={toggleShowCaseModal}
              setFetchShowCases={setFetchShowCases}
              fetchShowCases={fetchShowCases}
            />
          }
          closeModal={() => toggleShowCaseModal(!showShowCaseModal)}
          isCloseButton={true}
        />
      )}
    </div>
  );
}

export default connect(
  (state) => {
    return {
      showcases: state.showcases.showcases,
    };
  },
  (dispatch) => {
    return {
      fetchShowcase: (params) => dispatch(fetchShowcasesAction(params)),
    };
  }
)(withRouter(ProfileHeader));
