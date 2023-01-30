import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import jwt from "jsonwebtoken";
import _ from "lodash";
import AddShowCase from "../../Parts/AddShowCase/index";
import { showCaseData } from "../../../Containers/Sandbox";
import GeneralModal from "../../Common/GeneralModal/index";
import defaultProfile from "../../../assets/images/default-profile.svg";
import bannerDefault from "../../../assets/images/banner_default.jpeg";

import "./ProfileHeader.scss";
import Shelf from "../../../assets/images/shelf.png";

import { fetchShowcasesAction, updateShowcaseAction } from "../../../redux/actions/ShowcaseAction";

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

  const deleteShowcase = (id) => {
    updateShowcase({
      album_id: null,
      user_id: null,
      is_deleted: true,
      id: id,
    });
  }

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  let songsCount = tokenTransfers && tokenTransfers.length ? tokenTransfers.length : 0;

  return (
    <div id="profile-header">
      <div
        className={`profile-cover ${coverPhoto() === bannerDefault && "default"
          }`}
        style={{ backgroundImage: `url(${coverPhoto()})` }}
      >
      </div>
      <div className="shelves-content">
        {showShowcase && !showShowcase === false && (
          <div className="shelves">
            {showcases &&
              _.chunk(
                [...showcases, ...new Array(6 - showcases.length).fill(null)],
                3
              ).map((row, i) => {
                return (
                <div className="single-shelf" key={i}>
                  <div className="albums-on-shelf">
                    {row.map((showCaseItem, j) =>
                      showCaseItem ? (
                        <div className="single-album-on-shelf" key={`${i}${j}`}>
                          <div className="single-shelf-album">
                            {jwt.decode(localStorage.getItem("amplify_app_token"))?.id === showCaseItem.user_id && <div className="deleteShowcase" onClick={() => { deleteShowcase(showCaseItem.id) }}><i className="fa-solid fa-trash-can" /></div>}
                            <img
                              src={`https://gateway.pinata.cloud/ipfs/${showCaseItem.album?.cover_cid}`}
                              alt="album"
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
                          {!isPublicProfile && <i className="fa-sharp fa-solid fa-plus" />}
                        </div>
                      )
                    )}
                  </div>
                  <img src={Shelf} alt="shelf" />
                </div>
              )})}
          </div>
        )}
        <div className="btn-wrap">{btnContent}</div>
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
              <span>{ArtistData.name || ArtistData.near_account_id}</span>
              {/* {!isPublicProfile && ( */}
                <div className="flex">
                  <span className="no_of_songs">
                    {songsCount} {songsCount === 1 ? "Song" : "Songs"} Owned
                  </span>

                  {/* <span className="no_of_songs">
                    {songsCount} {songsCount === 1 ? "Song" : "Songs"} Owned
                  </span> */}
                </div>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>

      {
        showShowCaseModal && (
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
        )
      }
    </div >
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
      updateShowcase: (data) => dispatch(updateShowcaseAction(data)),
    };
  }
)(withRouter(ProfileHeader));
