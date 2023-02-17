import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import "./Settings.scss";

import { fetchTokenTransfersAction } from "../../redux/actions/TokenTransferAction";
import { fetchUserAction } from "../../redux/actions/UserAction";
import {
  fetchFollowersAction,
  updateFollowerAction,
  addFollowerAction,
} from "../../redux/actions/FollowerAction";
import GeneralModal from "../../Components/Common/GeneralModal/index";
import {
  sellSongAction,
  showSellModalAction,
  hideSellModalAction,
  hideSellSongConfirmation,
} from "../../redux/actions/SongAction";
import { sellSongNFTAction } from "../../redux/actions/NFTAction";
import {
  fetchPlaylistsAction,
  deletePlaylistAction,
  hideDeletePlaylistAction,
  showPlaylistModalAction,
  hidePlaylistModalAction,
} from "../../redux/actions/PlaylistAction";
import bannerDefault from "../../assets/images/banner_default.jpeg";
import ImageUploadIcon from "../../assets/images/image-upload.svg";
import { API_ENDPOINT_URL } from "../../Constants/default";
import { getAccessToken } from "../../Api/index";
import { updateUserAction } from "../../redux/actions/UserAction";
import defaultProfile from "../../assets/images/default-profile.svg";
import ImageUploader from "./ImageUploader";
import { getNearKeys } from "../../Constants/near";
import * as playListAction from "../../redux/actions/PlaylistAction";

function MyProfile(props) {
  const [isDefaultImage, setDefaultImage] = useState(null);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [bannerUploadProgress, setBannerUploadProgress] = useState(0);
  const [modalType, setModalType] = useState(null);

  const [ArtistData, setArtistData] = useState(null);
  const [cropData, setCropData] = useState("#");

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const token = localStorage.getItem("amplify_app_token");
  const decodedToken = jwt_decode(token);

  useEffect(() => {
    if (decodedToken && !ArtistData) {
      setArtistData({
        cover: decodedToken.banner,
        avatar: decodedToken.avatar,
      });
    }
  }, [decodedToken]);

  const onImageLoadError = (e) => {
    setDefaultImage(defaultProfile);
  };
  const BannerUploaderForm = ({ }) => (
    <div>
      <ImageUploader
        cropData={cropData}
        setCropData={setCropData}
        onBannerChange={onBannerChange}
        modalType={modalType}
      />
      <input
        type="file"
        style={{ display: "none" }}
        id="albumCover"
        name="album-cover"
        onChange={onBannerChange}
        accept="image/*"
      />
      {bannerUploadProgress ? (
        <div className="album-uploader">
          <span
            className="upload-progress"
            style={{ width: `${bannerUploadProgress}%` }}
          ></span>
          <span>{bannerUploadProgress}%</span>
        </div>
      ) : null}
    </div>
  );

  const onUpdateBanner = (imgUUrl) => {
    if (imgUUrl) {
      try {
        props.updateUser({
          id: decodedToken.id,
          [modalType === "profile" ? "avatar" : "banner"]: imgUUrl,
        });
        setShowBannerModal(false);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onBannerChange = async (e) => {
    // if (!e.target.files[0]) return;

    const files = e;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files);
    let uploadImage = await uploadFile(e);
    setImageURL(
      `https://gateway.pinata.cloud/ipfs/${uploadImage.data.IpfsHash}`
    );
    setArtistData({
      ...ArtistData,
      [modalType === "profile"
        ? "avatar"
        : "cover"]: `https://gateway.pinata.cloud/ipfs/${uploadImage.data.IpfsHash}`,
    });
    if (uploadImage)
      onUpdateBanner(
        `https://gateway.pinata.cloud/ipfs/${uploadImage.data.IpfsHash}`
      );
  };
  const uploadFile = async (fileInfo) => {
    let file = fileInfo;
    file.is_uploading = true;
    let bannerFormData = new FormData();
    bannerFormData.append("file", file);
    bannerFormData.append("name", "pics");
    const uploadImage = await axios
      .post(`${API_ENDPOINT_URL}/uploads`, bannerFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getAccessToken(),
        },
        onUploadProgress: (e) => onUploadProgress(e),
      })
      .catch((error) => {
        console.error(error);
      });
    return uploadImage;
  };

  const onUploadProgress = (progressEvent) => {
    var percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setBannerUploadProgress(percentCompleted);
  };

  const handleModal = (type) => {
    setModalType(type);
    setShowBannerModal(!showBannerModal);
  };

  const [buttonText, setButtonText] = useState("Add Image");
  const [bannerText, setBannerText] = useState("Add Banner");
  useEffect(() => {
    if (ArtistData?.avatar) {
      setButtonText("Update Image");
    } else {
      setButtonText("Add Image");
    }
    if (ArtistData?.cover) {
      setBannerText("Update Banner");
    } else {
      setBannerText("Add Banner");
    }
  }, [ArtistData]);

  useEffect(() => {
    if (!showBannerModal) {
      setImage(null);
      setImageURL(null);
      setBannerUploadProgress(0);
      setModalType(null);
    }
  }, [showBannerModal]);

  const handleRemove = (type) => {
    setArtistData({
      ...ArtistData,
      [type === "profile" ? "avatar" : "cover"]:
        type === "profile" ? null : null,
    });
    props.updateUser({
      id: decodedToken.id,
      [type === "profile" ? "avatar" : "banner"]: null,
    });
  };

  const onLogout = (e) => {
    e.preventDefault();
    setShowLogoutModal(true);
  };

  const handleCloseModal = async (bool) => {
    if (bool) {
      let nearKeys = await getNearKeys();
      for (const key in nearKeys) {
        localStorage.removeItem(nearKeys[key]);
      }
      sessionStorage.removeItem("activePlaylist");
      localStorage.removeItem("amplify_app_token");
      props.clearCurrentPlayList();
      props.history.push("/");
      window.location.reload();
    }
    setShowLogoutModal(false);
  };

  return (
    <div className="containerOuter">
      <div id="settings" className="left-nav-pad normal-right-pad">
        <div id="profile-header">
          <h2 className="header-title">Profile Image</h2>
          <div className="profile-image-container">
            <div className="profile-image-preview">
              <img
                src={
                  isDefaultImage
                    ? isDefaultImage
                    : ArtistData?.avatar || defaultProfile
                }
                onError={onImageLoadError}
              />
            </div>
            <div className="profile-buttons">
              <button className="upload" onClick={() => handleModal("profile")}>
                {buttonText}
              </button>
              <button className={`remove ${!ArtistData?.avatar ? "disabled" : ""}`} onClick={() => handleRemove("profile")} disabled={!ArtistData?.avatar}>Remove</button>
              <p>Must be a JPEG or PNG and cannot exceed 10MB. </ p>
            </div>
          </div>
        </div>
        <div className="profile-banner">
          <h2 className="header-title">Banner Image</h2>
          <div className="banner-image-container">
            <div className="banner-div">
              <div
                className={`profile-cover ${!ArtistData?.cover && "default"}`}
                style={{
                  backgroundImage: `url(${ArtistData?.cover || bannerDefault})`,
                }}
              ></div>
            </div>
            <div className="banner-buttons">
              <button className="banner-upload" onClick={() => handleModal("banner")}>{bannerText}</button>
              <button className={`banner-remove ${!ArtistData?.cover ? "disabled" : ""}`} onClick={() => handleRemove("banner")} disabled={!ArtistData?.cover}>Remove</button>
              <p>File format: JPEG or PNG (recommended 1200x480, max 10MB). </ p>
            </div>
          </div>
        </div>
        {showBannerModal && (
          <GeneralModal
            headline={`Upload ${modalType === "profile" ? "Profile Image" : "Banner Image"}`}
            className="centered"
            closeModal={() => setShowBannerModal(!showBannerModal)}
            bodyChildren={<BannerUploaderForm />}
          />
        )}
        <div className="logout-container">
          <button className="logout-button" onClick={(e) => onLogout(e)}><i className="fa-regular fa-arrow-up-left-from-circle"></i> Logout</button>
        </div>
        {showLogoutModal && (
          <GeneralModal
            // topIcon={ConfettiImage}
            headline="Are you sure you want to logout?"
            buttons={[
              {
                type: "solid go-home",
                text: "Yes",
                onClick: () => handleCloseModal(true),
              },
              {
                type: "solid go-home",
                text: "Cancel",
                onClick: () => handleCloseModal(false),
              },
            ]}
            className="centered"
          />
        )}
      </div>
    </div>
  );
}

export default connect(
  (state) => {
    return {
      nfts: state.nfts.nfts,
      user: state.users.user,
      total: state.nfts.total,
      loading: state.nfts.loading,
      token_transfers: state.token_transfers.token_transfers,
      myFollowings: state.followers.followers,
      displaySellModal: state.songs.showSellModal,
      wallet: state.global.wallet,
      nearPrice: state.global.nearPrice,
      showSellConfirmation: state.songs.showSellConfirmation,
      playlists: state.playlists.playlists,
      totalPlaylists: state.playlists.total,
      show_delete_modal: state.playlists.show_delete_modal,
      show_modal: state.playlists.show_modal,
    };
  },
  (dispatch) => {
    return {
      clearCurrentPlayList: () =>
        dispatch(playListAction.clearCurrentPlayList()),
      fetchTokenTransfers: (data) => dispatch(fetchTokenTransfersAction(data)),
      fetchUser: (data) => dispatch(fetchUserAction(data)),
      fetchFollowers: (data) => dispatch(fetchFollowersAction(data)),
      updateFollower: (data) => dispatch(updateFollowerAction(data)),
      addFollower: (data) => dispatch(addFollowerAction(data)),
      sellSong: (data) => dispatch(sellSongAction(data)),
      showSellModal: () => dispatch(showSellModalAction()),
      hideSellModal: () => dispatch(hideSellModalAction()),
      hideSellConfirmation: () => dispatch(hideSellSongConfirmation()),
      sellSongNFT: (data) => dispatch(sellSongNFTAction(data)),
      showPlaylistModal: () => dispatch(showPlaylistModalAction()),
      hidePlaylistModal: () => dispatch(hidePlaylistModalAction()),
      fetchPlaylists: (data) => dispatch(fetchPlaylistsAction(data)),
      fetchFollowers: (data) => dispatch(fetchFollowersAction(data)),
      deletePlaylist: (data) => dispatch(deletePlaylistAction(data)),
      hideDeletePlaylist: (data) => dispatch(hideDeletePlaylistAction(data)),
      updateUser: (data) => dispatch(updateUserAction(data)),
    };
  }
)(withRouter(MyProfile));
