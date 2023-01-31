import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as nearAPI from "near-api-js";
import q from "querystring";
import _ from "lodash";
import { TwitterShareButton } from "react-share";
import ConfettiImage from "../../assets/images/confetti.png";

import "./MyProfile.scss";

import { fetchTokenTransfersAction } from "../../redux/actions/TokenTransferAction";
import { fetchUserAction } from "../../redux/actions/UserAction";
import {
  fetchFollowersAction,
  updateFollowerAction,
  addFollowerAction,
} from "../../redux/actions/FollowerAction";
import ProfileHeader from "../../Components/Common/ProfileHeader";
import SingleAlbum from "../../Components/Common/SingleAlbum/index";
import SingleMergedAlbum from "../../Components/Common/SingleMargedAlbum/index";
import GeneralModal from "../../Components/Common/GeneralModal/index";
import PurchasedSongs from "../../Components/Parts/PurchasedSongs";
import TwitterIcon from "../../assets/images/twitter-icon.svg";
import ShareIcon from "../../assets/images/share-icon.svg";
import copyLink from "../../assets/images/highblack copy 1.svg";
import defaultProfile from "../../assets/images/default-profile.svg";
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
import { fetchUserByNearIdAction } from "../../redux/actions/UserAction";
import { getUsers } from "../../Api/User";
import CreatePlayList from "../../Components/Parts/CreatePlayList";
import { getTokens } from "../../Utils/near";
import "../../Global.scss";
const {
  utils: {
    format: { parseNearAmount },
  },
  keyStores,
} = nearAPI;

function MyProfile(props) {
  const [bannerImage, setBannerImage] = useState("");
  const [profileImage, setProfileImage] = useState(defaultProfile);
  const [userName, setUserName] = useState("");
  const [userID, setID] = useState(0);
  const [sellingSong, setSellingSong] = useState(null);
  const [sellingCopy, setSellingCopy] = useState(null);
  const [openSharePopup, setSharePopup] = useState(false);
  const [selectedAlbumToken, setSelectedAlbumToken] = useState(null);
  const [showAlbumModalIndex, setShowModalAlbumIndex] = useState(null);
  const [isPublicProfile] = useState(
    props &&
    props.location &&
    props.location.pathname &&
    props.location.pathname.includes("user")
  );
  const [ownedTokenCopies, setOwnedTokenCopies] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const token = localStorage.getItem("amplify_app_token");
  const decodedToken = token ? jwt_decode(token) : {};
  const [user, setUser] = useState(null);

  useEffect(() => {
    props.fetchPlaylists({
      params: {
        related: "songs.[album,transfers]",
        orderBy: "-id",
        "filter[user_id]": decodedToken.id,
      },
    });
    props.fetchFollowers({
      params: {
        "filter[follower_id]": decodedToken.id,
        related: "artist",
      },
    });
    let near_account_id = props.location.pathname.split("/").slice(-1)[0];

    props.fetchUserNearById({
      near_id: near_account_id,
      params: {
        owned_songs: true,
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { });
  const generateAlbumItem = (nft, index) => {
    return (
      <SingleMergedAlbum
        key={index}
        className="owned"
        albumInfo={nft}
        onSingleSongClick={(song) => onSingleSongClick(song, index)}
        index={index}
        showAlbumModalIndex={showAlbumModalIndex}
        setShowModalAlbumIndex={setShowModalAlbumIndex}
        tokens={tokens}
      />
    );
  };

  const onSingleSongClick = (song, index) => {
    props.showSellModal();
    if (!song.transfers) {
      song.transfers = props.token_transfers.filter(
        (f) => f.token === song.song_cid
      );
    }
    setSellingSong(song);
    setSelectedAlbumToken(
      props.token_transfers.find((f) => f?.song?.album_id === song.album_id)
        .song.album
    );
    // setSellingCopy(song.transfers.find(f => f.copy_number === props.token_transfers[index].copy_number))
  };

  const onSell = (token) => {
    setSellingCopy(token);
  };

  useEffect(() => {
    let sellingSong = JSON.parse(localStorage.getItem("selling_song"));
    if (props.history.location.search.includes("errorCode")) {
      let message = decodeURIComponent(
        q.parse(props.history.location.search).errorMessage
      );
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      localStorage.removeItem("selling_song");
      props.history.push("/my-profile");
    } else if (props.history.location.search.includes("transactionHashes")) {
      let txtId = decodeURIComponent(
        q.parse(props.history.location.search)["?transactionHashes"]
      );
      sellingSong.hash = txtId;
      checkTxnStatus(sellingSong);
      props.sellSongNFT(sellingSong);
      localStorage.removeItem("selling_song");
      props.history.push("/my-profile");
    } else if (props.history.location.search.includes("showId")) {

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.history.location.search]);

  const checkTxnStatus = async (sellingSong) => {
    let net =
      process.env.REACT_APP_CONTEXT === "production" ? "mainnet" : "testnet";
    const config = {
      networkId: net,
      keyStore: new keyStores.BrowserLocalStorageKeyStore(), // optional if not signing transactions
      nodeUrl: `https://rpc.${net}.near.org`,
      walletUrl: `https://wallet.${net}.near.org`,
      helperUrl: `https://helper.${net}.near.org`,
      explorerUrl: `https://explorer.${net}.near.org`,
    };
    const near = await nearAPI.connect(config);
    const response = await near.connection.provider.txStatus(
      sellingSong.hash,
      decodedToken.near_account_id
    );
    if (response.receipts_outcome.some((f) => f.outcome.status.Failure)) {
      let error = response.receipts_outcome.find(
        (f) => f.outcome.status.Failure
      ).outcome.status.Failure.ActionError.kind.FunctionCallError
        .ExecutionError;
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
    } else {
      props.sellSongNFT(sellingSong);
    }
    localStorage.removeItem("selling_song");
    props.history.push("/my-profile");
  };
  const onListSong = async (e, songPrice) => {
    e.preventDefault();
    let price =
      songPrice &&
      parseFloat(songPrice.replace(/^\D+/g, "").replaceAll(",", "")) * 100;
    let nearPrice = price / (props.nearPrice * 100);
    let selling_song = {
      id: sellingCopy.id,
      price,
      yocto_near_price: parseNearAmount(`${nearPrice}`),
    };
    let songtokenid = `${selectedAlbumToken.cover_cid}:${sellingCopy.copy_number}:${sellingCopy.token}`;
    localStorage.setItem("selling_song", JSON.stringify(selling_song));
    await props.wallet.account().functionCall(
      process.env.REACT_APP_NFT_CONTRACT || "nft.aa-1-test.testnet",
      "nft_approve",
      {
        token_id: songtokenid,
        account_id:
          process.env.REACT_APP_NEAR_MARKET_ACCOUNT ||
          "market.aa-1-test.testnet",
        price: parseNearAmount(`${nearPrice}`),
      },
      300000000000000,
      parseNearAmount("0.01")
    );
  };
  const ArtistData = {
    cover: bannerImage,
    avatar: profileImage,
    name: userName,
  };

  const copyProfileLink = (e) => {
    e.preventDefault();
    // const profileLink = document.getElementById("hidden-profile-link");

    // profileLink.select();
    // profileLink.setSelectionRange(0, 99999); /* For mobile devices */

    // document.execCommand("copy");

    const tempInput = document.createElement("input");
    tempInput.value = `https://amplify.art/user/${userName}`;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    toast.success("Copied to clipboard.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setSharePopup(false);
  };


  const renderBtnContent = () => {
    return (
      <>
        {/* {!isPublicProfile && <button >Set as <img src={TwitterIcon} alt="Twitter" /> Banner</button>} */}
        <div className="popup-container">
          {!isPublicProfile && (
            <>
              <button
                className="set_name"
                onClick={() => setSharePopup(!openSharePopup)}
              >
                <img src={ShareIcon} alt="Twitter" /> <span>Share</span>
                {openSharePopup && (
                  <div className="popUp">
                    <div className="popup-div" onClick={copyProfileLink}>
                      <img src={copyLink} alt="Copy Link" className="popup-img" />
                      <span>Copy Link</span>
                    </div>
                    <TwitterShareButton
                      className="popup-div"
                      title="Check out my Amplify.art profile!"
                      url={`https://amplfy.art/user/${userName}`}
                      via="amplifyart"
                    >
                      <img
                        src={TwitterIcon}
                        alt="Twitter"
                        className="popup-img"
                        style={{ width: "32px" }}
                      />
                      <span>Tweet</span>
                    </TwitterShareButton>
                  </div>
                )}
              </button>
              <button
                className="edit-profile"
                onClick={() => props.history.push("/settings")}
              >
                {" "}
                <span>Settings</span>
              </button>
              <button style={{ width: 0, height: 0, display: "none" }}></button>
            </>
          )}
        </div>
      </>
    );
  };

  useEffect(() => {
    findUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const findUser = async () => {
    if (isPublicProfile) {
      const nearId = props.match.params.id;
      const res = await getUsers({
        params: {
          "filter[near_account_id]": nearId,
        },
      });
      if (res.data.success && res.data.results.length) {
        let { id, near_account_id } = res.data.results[0];
        setUser(res.data.results[0]);
        // props.fetchUser({
        //   id: id,
        // });
        props.fetchTokenTransfers({
          params: {
            "filter[transfer_to]": parseInt(id),
            "filter[type]": "song",
            related: "album.[user,songs],song.album.[user,songs.transfers]",
            orderBy: "-id",
          },
        });
        setID(parseInt(id));
        setUserName(near_account_id);
      }
    } else if (token) {
      setBannerImage(decodedToken.banner);
      setProfileImage(decodedToken.avatar);
      setUserName(decodedToken.near_account_id);
      setID(decodedToken.id);

      props.fetchTokenTransfers({
        params: {
          "filter[transfer_to]": parseInt(decodedToken.id),
          "filter[type]": "song",
          related: "album.[user,songs],song.album.[user,songs.transfers]",
          orderBy: "-id",
        },
      });
    }
  };

  useEffect(() => {
    if (isPublicProfile) {
      setBannerImage(user?.banner);
      setProfileImage(user?.avatar);
      setUserName(user?.near_account_id);
      props.fetchFollowers({
        params: {
          "filter[follower_id]]": decodedToken.id,
          "filter[artist_id]]": user?.id,
        },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const closeModals = () => {
    if (props.displaySellModal && sellingCopy) {
      setSellingCopy(null);
    } else {
      setSellingSong(null);
      props.hideSellModal();
    }
  };

  const onClose = () => {
    props.hideSellConfirmation();
    props.history.push("/");
    window.location.reload();
  };
  const renderHeader = (title, isCreateButton = false) => (
    <div className="playlist-header">
      <span className="playlist-title">{title}</span>
      <div>
        {isCreateButton && (
          <button className="btn-wrap" onClick={() => togglePlayListModal()}>
            Create New
          </button>
        )}
        {/* <button className="btn-wrap">View All</button> */}
      </div>
    </div>
  );

  const togglePlayListModal = () => {
    if (props.show_modal) {
      props.hidePlaylistModal();
    } else {
      props.showPlaylistModal();
    }
  };

  let formattedAlbums = Object.entries(
    _.groupBy(
      props &&
      props.token_transfers &&
      props.token_transfers.length > 0 &&
      props.token_transfers.filter((f) => f.type !== null),
      (each) => each?.song?.album_id
    )
  );
  let aformattedAlbums = formattedAlbums.map((fa) => {
    if (fa[1][0].type === "song") {
      return {
        ...fa[1][0],
        album: fa[1][0]?.song?.album,
        transfers: fa[1],
      };
    } else return fa;
  });

  useEffect(() => {
    if (aformattedAlbums.length) {
      let albumId = decodeURIComponent(
        q.parse(props.history.location.search)["?showId"]
      );
      if (parseInt(albumId) > -1) {
        let actualIndex = aformattedAlbums.findIndex(
          (f) => f.album.id === parseInt(albumId)
        );
        setShowModalAlbumIndex(parseInt(actualIndex));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aformattedAlbums.length, props.history.location.search]);

  useEffect(() => {
    fetchTokens();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.wallet]);

  const fetchTokens = async () => {
    if (props.wallet) {
      let tokens = await getTokens(props.wallet);
      setTokens(tokens);
    }
  };

  useEffect(() => {
    if (sellingSong) {
      setOwnedTokenCopies(
        tokens
          .filter((t) => t.token_id.split(":")[2] === sellingSong.song_cid)
          .map((t) => parseInt(t.token_id.split(":")[1]))
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellingSong]);

  return (
    <div
      id="profile"
      className={`left-nav-pad normal-right-pad`}
    >
      <ProfileHeader
        ArtistData={ArtistData}
        btnContent={renderBtnContent()}
        showShowcase={true}
        isPublicProfile={isPublicProfile}
        userId={userID}
        tokenTransfers={props.token_transfers}
      />
      {!isPublicProfile && (
        <>
          {props.token_transfers.length ? (
            <div className="recently-purchased">
              <div className="top">
                <h2>Albums Owned</h2>
                {/* <button className="btn outlined">View All</button> */}
              </div>
              <div className="container">
                <div className="album-grid">
                  {aformattedAlbums
                    .reverse()
                    // .filter((f) => f[1][0].type !== "song") // Try now for only songs
                    .map((token, index) =>
                      generateAlbumItem(
                        {
                          token: { ...token },
                          copy_number: token.copy_number,
                          hideSticker: false,
                          // transfers: token[1],
                          mints_owned: token.transfers
                            .filter(
                              (f) =>
                                f.is_owner && f.transfer_to === decodedToken.id
                            )
                            .map((m) => m.copy_number),
                        },
                        index
                      )
                    )}
                </div>
              </div>
            </div>
          ) : !props.loading ? (
            <div className="placeholder-text center-text">
              <i className="fa-duotone fa-music-slash"></i>
            This user doesn't own any music.</div>
          ) : null}
          {renderHeader(
            `Custom Playlists - ${props.playlists ? props.playlists.length : "0"}`,
            true
          )}

          {props.playlists && props.playlists.length > 0 ? (
            <div className="container">
              <div className="album-grid playlist-gutters">
                {props.playlists.map((album, index) => (
                  <SingleAlbum
                    key={index}
                    albumInfo={{ ...album, hideSticker: true }}
                    isMint={false}
                    isPlayList
                    setDeletingId={setDeletingId}
                    onSingleSongClick={(song) => onSingleSongClick(song, index)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="placeholder-text center-text">
              <i className="fa-duotone fa-list-music"></i>
            No playlists found.</div>
          )}
        </>
      )}
      {props.displaySellModal && (
        <GeneralModal
          bodyChildren={
            <PurchasedSongs
              transfers={(sellingSong && sellingSong.transfers) || []}
              onSell={onSell}
              sellingCopy={sellingCopy}
              sellingSong={sellingSong}
              onListSong={onListSong}
              selectedAlbumToken={selectedAlbumToken}
              user={decodedToken}
              ownedTokenCopies={ownedTokenCopies}
              tokens={tokens}
            />
          }
          contentClassName="sellSong-modal"
          closeModal={() => closeModals()}
          isCloseButton={true}
        />
      )}
      {props.showSellConfirmation && (
        <GeneralModal
          topIcon={ConfettiImage}
          headline="Congrats, Your Song Has Been Listed!"
          buttons={[
            {
              type: "solid go-home",
              text: "Go Home",
              onClick: () => onClose(),
            },
          ]}
          className="centered"
        />
      )}
      {props.show_modal && (
        <GeneralModal
          headline={
            <>
              <span>Create New Playlist</span>
              <span
                style={{ float: "right", color: "#bcbcbc", cursor: "pointer" }}
                onClick={() => togglePlayListModal()}
              >
                {" "}
                ⤫
              </span>
            </>
          }
          bodyChildren={
            <CreatePlayList
              showCaseData={{}}
              togglePlayListModal={togglePlayListModal}
            />
          }
          contentClassName="playlist-modal"
        />
      )}
      {props.show_delete_modal && (
        <GeneralModal
          // topIcon={ConfettiImage}
          headline="Are you sure to delete this playlist?"
          buttons={[
            {
              type: "solid go-home",
              text: "Yes",
              onClick: () => props.deletePlaylist({ id: deletingId }),
            },
            {
              type: "solid go-home",
              text: "Cancel",
              onClick: () => props.hideDeletePlaylist(),
            },
          ]}
          className="centered"
        />
      )}
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
      near_user: state.users.near_user,
    };
  },
  (dispatch) => {
    return {
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
      deletePlaylist: (data) => dispatch(deletePlaylistAction(data)),
      hideDeletePlaylist: (data) => dispatch(hideDeletePlaylistAction(data)),
      fetchUserNearById: (data) => dispatch(fetchUserByNearIdAction(data)),
    };
  }
)(withRouter(MyProfile));
