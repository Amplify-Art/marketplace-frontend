import React, { useEffect, useState } from "react";
import * as nearAPI from "near-api-js";
import { toast } from "react-toastify";
import axios from 'axios';
import AlbumSingleSong from "../AlbumSingleSong/AlbumSingleSongTable";
import GeneralModal from "../GeneralModal/index.js";
import BackArrowIcon from "../../../assets/images/leftarrow.svg";
import "./AlbumModalContent.scss";
import { usePalette } from "react-palette";
import {
  updateCurrentPlaylistAction,
  showDeletePlaylistAction,
} from "../../../redux/actions/PlaylistAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import jwt from "jsonwebtoken";
import { togglePlayerAction } from "../../../redux/actions/GlobalAction";
import { getTokens } from "../../../Utils/near";



// songmodal
import SongModalContent from "../SongModalcontent";

function AlbumModalContent({
  albumInfo,
  isPlayList,
  isMerged,
  isOpen,
  updateCurrentPlaylist,
  onBuy,
  setViewDetails,
  viewDetails,
  onSingleSongClick,
  token,
  tokens,
  ...props
}) {
  const [songModal, setSongModal] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudioSong] = useState(new Audio(""));
  const [currentIndex, setCurrentIndex] = useState(-1);
  const user = jwt.decode(localStorage.getItem("amplify_app_token"));
  const [isSell, setIsCell] = useState(false);
  const [userTokens, setUserTokens] = useState([]);
  const [nearPrice, setNearPrice] = useState(0);
  let url = props.history.location;

  const toggle = (songid) => {
    setAudioSong(
      new Audio(`https://gateway.pinata.cloud/ipfs/${songid}`)
    );
    if (playing && currentIndex !== songid) {
      audio.pause();
      audio.currentTime = 0;
      setCurrentIndex(songid);
      setPlaying(true);
    } else if (!playing && currentIndex === -1) {
      setCurrentIndex(songid);
      setPlaying(true);
    } else {
      audio.pause();
      audio.currentTime = 0;
      setAudioSong(new Audio(""));
      setCurrentIndex(-1);
      setPlaying(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setCurrentIndex(-1);
      setPlaying(false);
    }
  }, [isOpen]);

  useEffect(() => {
    fetchTokens();
    getNearPrice();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTokens = async () => {
    let tokens = await getTokens(props.wallet);
    if (tokens.length > 0) {
      setUserTokens(tokens);
    }
  };

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [audio, playing, currentIndex]);

  const stopSong = () => {
    audio.pause();
    audio.currentTime = 0;
    setAudioSong(new Audio(""));
    setCurrentIndex(-1);
    setPlaying(false);
  };
  useEffect(() => {
    audio.addEventListener("ended", () => {
      setAudioSong(new Audio(""));
      setCurrentIndex(-1);
      setPlaying(false);
    });
    audio.addEventListener("timeupdate", (e) => {
      if (
        audio.currentTime > 15 &&
        (!userTokens.some((ut) => ut.token_id.includes(currentIndex)) ||
          props.history.location.pathname !== "/my-profile")
      ) {
        stopSong();
      }
      const progressElement = document.getElementById(currentIndex);
      if (progressElement) {
        let normalizedRadius = 9;
        let circumference = normalizedRadius * 2 * Math.PI;
        let startPoint = (audio.currentTime / audio.duration) * circumference;
        let endPoint =
          circumference -
          (audio.currentTime / audio.duration / 100) * circumference;
        progressElement.style.strokeDasharray = `${startPoint},${endPoint}`;
      }
    });
    return () => {
      audio.removeEventListener("ended", () => {
        setAudioSong(new Audio(""));
        setCurrentIndex(-1);
        setPlaying(false);
      });
      audio.removeEventListener("timeupdate", () => { });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, audio]);

  const handleCloseModal = () => {
    setSongModal(false);
    setViewDetails(false);
  };

  const addToPlaylist = async (type) => {
    if (props.currentPlaylists.map((i) => i.id).includes(albumInfo.id)) {
      toast.error(`This ${type} is already in the queue`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    updateCurrentPlaylist([...props.currentPlaylists, albumInfo]);
    sessionStorage.setItem(
      "activePlaylist",
      JSON.stringify([...props.currentPlaylists, albumInfo])
    );
    if (!props.showPlayer) props.togglePlayer();
  };

  const { data } = usePalette(
    `https://gateway.pinata.cloud/ipfs/${albumInfo.cover_cid}`
  );

  const getNearPrice = () => {
    axios.get('https://min-api.cryptocompare.com/data/price?fsym=NEAR&tsyms=NEAR,USD').then(res => {
      setNearPrice(res.data.USD);
    });
  }

  const handleDelete = () => {
    props.setDeletingId(albumInfo.id);
    props.showDeletePlaylist();
    props.closeModal()
  };

  const { utils } = nearAPI;

  return (
    <>
      <div id="albums-content">
        {!viewDetails ? (
          <div
            className="left-wrapper"
            style={{
              background: `linear-gradient(123.48deg, ${isPlayList
                ? "#586c7d"
                : data?.vibrant
                  ? data.vibrant
                  : "#586c7d"
                } 0%, ${isPlayList ? "#617789" : data?.muted ? data.muted : "#617789"
                } 52.12%)`,
            }}
          >
            <div className="album-top">
              {!isPlayList ? (
                <div className="album-img">
                  {albumInfo && albumInfo.cover_cid ? (
                    <img
                      src={`https://gateway.pinata.cloud/ipfs/${albumInfo.cover_cid}`}
                      alt=""
                    />
                  ) : (
                    <img src={albumInfo.coverArt} alt="" />
                  )}
                  {/* <i className="far fa-trash-alt"></i> */}
                </div>
              ) : null}
              <div
                className="album-right"
                style={isPlayList ? { paddingLeft: "0px" } : {}}
              >
                <div className="title">
                  {albumInfo?.title.substring(0, 29)}
                  {albumInfo?.title?.length > 29 && "..."}
                </div>
                {!isPlayList ? (
                  <>
                    <div className="artist-title">
                      {(albumInfo && albumInfo?.user?.near_account_id) ||
                        "No Artist"}
                    </div>
                    <div
                      className="view-detail"
                      onClick={() => setViewDetails(true)}
                    >
                      View Details
                    </div>
                  </>
                ) : null}
                {isMerged && (
                  <>
                    {/* <div className="">
                      Mints Owned :{" "}
                      {albumInfo.mints_owned.map((m) => `#${m}`).join(", ")}
                    </div> */}
                  </>
                )}
              </div>
              {isPlayList && (
                <div className="trash" onClick={handleDelete}>
                  <i className="far fa-trash-alt"></i>
                </div>
              )}
            </div>
            <div className="album-bottom" style={{ height: isPlayList ? "290px" : "195px" }} id="modalScrolling">
              {/* <div className={`playlist-header ${isPlayList ? "playlist" : isSell ? "can-sell" : "playlist"}`}>
                <span style={{ gridColumn: "1/3" }}>TRACK TITLE</span>
                <span>LENGTH</span>
              </div> */}

              <table
                // className={`modal-album-title ${isPlayList ? "playlist" : !hasAnyOfCopies ? "can-sell" : "can-sell"
                //   }`}
                style={{ width: "100%" }}
              >
                <tr className="table-header">
                  <th>TRACK TITLE</th>
                  <th>LENGTH</th>
                  <th></th>
                </tr>
                {albumInfo &&
                  albumInfo.songs &&
                  albumInfo.songs
                    ?.sort((a, b) => a.id - b.id)
                    .map((song, index) => (
                      <tr style={{ verticalAlign: "middle" }} key={index}>
                        <AlbumSingleSong
                          song={song}
                          index={index}
                          key={`${index}singlesong`}
                          audio={audio}
                          currentIndex={currentIndex}
                          playing={playing}
                          isOpen={isOpen}
                          toggle={(data) => toggle(data)}
                          onSingleSongClick={onSingleSongClick}
                          token={token}
                          isPlayList={isPlayList}
                          tokens={tokens}
                          setIsCell={setIsCell}
                          isSell={isSell}
                        />
                      </tr>
                    ))}
              </table>
            </div>
            {songModal && (
              <div className="modal-album">
                <GeneralModal
                  isCloseButton="true"
                  bodyChildren={<SongModalContent albumInfo={albumInfo} />}
                  closeModal={handleCloseModal}
                />
              </div>
            )}
          </div>
        ) : (
          <div
            className="left-wrapper"
            style={{
              background: `linear-gradient(123.48deg, ${isPlayList
                ? "#f18180"
                : data?.vibrant
                  ? data.vibrant
                  : "#f18180"
                } 0%, ${isPlayList ? "#ec5051" : data?.muted ? data.muted : "#ec5051"
                } 52.12%)`,
            }}
          >
            <div className="viewdetails-top">
              <div className="back-img">
                <img
                  onClick={() => setViewDetails(false)}
                  src={BackArrowIcon}
                  alt="left arrow"
                />
              </div>
              <div className="details-banner">Album Details</div>
            </div>
            <div className="details-content">
              <p className="sub-content" style={{ marginTop: "8px" }}>
                {albumInfo.description}
              </p>
            </div>
          </div>
        )}
      </div>
      {!isPlayList &&
        albumInfo.available_qty &&
        albumInfo.user_id !== (user && user.id) &&
        onBuy &&
        url &&
        user &&
        url.pathname !== "/my-profile" ? (
        <button
          onClick={() => onBuy(albumInfo)}
          type="button"
          className="buy-button bottomButtonSection btn1"
        >
          Buy Album for {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' }).format((Number(utils.format.formatNearAmount(albumInfo.yocto_near_price)).toFixed(5) * Number(nearPrice)).toFixed(2))}
        </button>
      ) : null}
      {!isPlayList && isMerged && (
        <button
          // onClick={() => onBuy(albumInfo)}
          type="button"
          className="buy-button bottomButtonSection btn2"
          onClick={() => addToPlaylist("album")}
        >
          Add to Player Queue
        </button>
      )}
      {isPlayList && (
        // <div
        // className={`btn-wrabtn-wrapp bottomButtonSection input-holder active-playlist ${!isPlayList ? "btn-margin" : ""
        //   }`}
        // >
        // <input
        //   type="submit"
        //   value="Play This Playlist"
        //   className="active-playlist-btn"
        //   onClick={() => addToPlaylist("playlist")}
        // />
        <button
          type="submit"
          className={`buy-button bottomButtonSection btn2 black_button`}
          onClick={() => addToPlaylist("playlist")}
        >
          Play This Playlist
        </button>
        // </div>
      )}

    </>
  );
}

export default connect(
  (state) => {
    return {
      showPlayer: state.global.showPlayer,
      currentPlaylists: state.playlists.current_playlists,
      wallet: state.global.wallet,
    };
  },
  (dispatch) => {
    return {
      updateCurrentPlaylist: (data) =>
        dispatch(updateCurrentPlaylistAction(data)),
      togglePlayer: () => dispatch(togglePlayerAction()),
      showDeletePlaylist: () => dispatch(showDeletePlaylistAction()),
    };
  }
)(withRouter(AlbumModalContent));
