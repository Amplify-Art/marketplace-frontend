import React, { useEffect, useState } from "react";
import { Tooltip } from 'react-tooltip'
import axios from 'axios';
import * as nearAPI from "near-api-js";
import { toast } from "react-toastify";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import jwt from "jsonwebtoken";
import q from "querystring";
import pauseIcon from "../../../assets/images/pause_icon.svg";
import playBtn from "../../../assets/images/play_btn.svg";
import GeneralModal from "../../Common/GeneralModal/index";
import "./SongList.scss";
import {
  buySongAction,
  showBuyModalAction,
  hideBuyModalAction,
} from "../../../redux/actions/SongAction";
import { buySongNFTAction } from "../../../redux/actions/NFTAction";
import { updateTokenTransferAction } from "../../../redux/actions/TokenTransferAction";

const {
  utils: {
    format: { parseNearAmount },
  },
} = nearAPI;

const songHeader = () => (
  <div className="songlist-header flex">
    <div className="header-title">
      Track Title | Mints owned
    </div>
    <div className="header-title">
      album
    </div>
    <div className="header-title">
      Artist
    </div>
    <div className="mobile-header-title">
      <div>Singles</div>
    </div>
    <div className="header-title">
      Listed
    </div>
  </div>
);
function SongList(props) {
  const { songList } = props;
  const [playing, setPlaying] = useState(false);
  const [audio, setAudioSong] = useState(new Audio(""));
  // const [audio, setAudioSong] = useState(new Audio(''));
  const [nearPrice, setNearPrice] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [buyingSong, setBuyingSong] = useState(null);
  const [songListExpanded, toggleSongListExpansion] = useState(null);
  const user = jwt.decode(localStorage.getItem("amplify_app_token"));

  const expandSongList = (id) => {
    let i = q.parse(props.history.location.search)["?expanded"];
    if (i) {
      props.history.push("/marketplace");
    }
    if (songList.find((f) => f.id === id).transfers.length) {
      if (id === songListExpanded) {
        toggleSongListExpansion(null);
      } else {
        toggleSongListExpansion(parseInt(i) || id);
      }
    }
  };
  useEffect(() => {
    let i = q.parse(props.history.location.search)["?expanded"];
    if (i) {
      toggleSongListExpansion(parseInt(i));
    }
    getNearPrice();
  }, []);

  // check for any transactions
  useEffect(() => {
    let buyingSong = JSON.parse(localStorage.getItem("buying_song"));
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
      localStorage.removeItem("buying_song");
      props.history.push("/marketplace");
    } else if (props.history.location.search.includes("transactionHashes")) {
      if (localStorage.getItem("delist_song")) {
        let delist_song = JSON.parse(localStorage.getItem("delist_song"));
        props.updateTokenTransfer({
          id: delist_song.id,
          is_for_sale: false,
        });
        localStorage.removeItem("delist_song");
        props.history.push("/marketplace");
      } else {
        let txtId = decodeURIComponent(
          q.parse(props.history.location.search)["?transactionHashes"]
        );

        props.buySongNFT({ ...buyingSong, hash: txtId });
        props.history.push("/marketplace");
      }
    }
  }, []);

  const handleAudio = (songid) => {
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
      if (audio.currentTime > 15) {
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
      audio.removeEventListener("timeupdate", () => {});
    };
  }, [playing, audio]);
  useEffect(() => {
    return () => {
      if (audio.current) {
        audio.current.pause();
      }
    };
  }, [props.history.location]);
  const onBuy = async () => {
    let isDelist = buyingSong.transfer_to === user.id;
    let buying_song = {
      id: buyingSong.id,
      price: buyingSong.bidding_price,
      yocto_near_price: buyingSong.yocto_near_price,
    };
    localStorage.setItem(
      isDelist ? "delist_song" : "buying_song",
      JSON.stringify(buying_song)
    );
    if (isDelist) {
      await props.wallet.account().functionCall(
        process.env.REACT_APP_NEAR_MARKET_ACCOUNT || "market.aa-1-test.testnet",
        "remove_song_sale",
        {
          nft_contract_id:
            process.env.REACT_APP_NFT_CONTRACT || "nft.aa-1-test.testnet",
          token_id: buyingSong.token,
        },
        300000000000000
      );
    } else {
      await props.wallet.account().functionCall(
        process.env.REACT_APP_NEAR_MARKET_ACCOUNT || "market.aa-1-test.testnet",
        "offer",
        {
          nft_contract_id:
            process.env.REACT_APP_NFT_CONTRACT || "nft.aa-1-test.testnet",
          receiver_id: user.near_account_id,
          song_token_id: buyingSong.token,
        },
        300000000000000,
        buyingSong.yocto_near_price
      );
    }
  };
  const onModalChange = (song) => {
    props.showBuyModal();
    setBuyingSong(song);
  };
  const handleCloseModal = () => {
    props.hideBuyModal();
    setBuyingSong(null);
  };
  const textEllipsisShort = (txt) => {
    if (txt.length > 10) {
      return txt.substr(0, 10) + "..";
    }
    return txt;
  };
  const textEllipsisLong = (txt) => {
    if (txt.length > 14) {
      return txt.substr(0, 14) + "..";
    }
    return txt;
  };

  const getNearPrice = () => {
    axios.get('https://min-api.cryptocompare.com/data/price?fsym=NEAR&tsyms=NEAR,USD').then(res => {
      setNearPrice(res.data.USD);
    });
  }

  const { utils } = nearAPI;

  return (
    <div className="song-list">
      {songHeader()}
      <div>
        {songList &&
          songList?.map((songData, index) => (
            <>
            <div className="">
              <div className="play-song flex">
                <div className="flex">
                  <div className="song-icon cursor-pointer">
                    <img
                      src={
                        playing && songData.song_cid === currentIndex
                          ? pauseIcon
                          : playBtn
                      }
                      alt=""
                      onClick={(id) => handleAudio(songData.song_cid)}
                    />
                    {/* <div className="audio-time"><SongLength i={index} song={`https://gateway.pinata.cloud/ipfs/${songData.song_cid}`} /></div> */}
                  </div>
                  <label
                    className="song-title text-truncate"
                    onClick={() => expandSongList(songData.id)}
                  >
                    <div>
                      {songData.title}{" "}
                      <span className="mint-numbers" data-tip={songData.mints_owned.join(", ")}>
                      {(songData.mints_owned || []).slice(0, 3)
                          .map((i) => `#${i}`)
                          .join(", ")}
                        {songData.mints_owned.length > 3 ? <strong>{` +${songData.mints_owned.length - 3}`}</strong> : ""}
                      </span>
                    </div>
                    <p className="song-title-mobile">
                      {textEllipsisLong(
                        (songData.album && songData.album.title) ||
                          ""
                      )}{" "}
                      /{" "}
                      {textEllipsisShort(
                        (songData.artist && songData.artist.near_account_id) || ""
                      )}
                    </p>
                  </label>
                </div>

                <div
                  className="song-album"
                  onClick={() => expandSongList(songData.id)}
                >
                  {songData.album && songData.album.title}
                </div>
                <div
                  className="song-artist"
                  onClick={() => expandSongList(songData.id)}
                >
                  {songData.artist && songData.artist.near_account_id}
                </div>
                <div
                  className={`song-available ${
                    songListExpanded === songData.id && "active"
                  }`}
                  onClick={() => expandSongList(songData.id)}
                >
                  {songData.transfers.length} / {songData.qty} <span className="available-text">Available</span>
                </div>
              </div>
              <div
                className={`song-copies ${
                  songListExpanded === songData.id && "expanded"
                }`}
                style={{
                  backgroundImage: `url(https://gateway.pinata.cloud/ipfs/${
                    songData.album && songData.album.cover_cid
                  })`,
                }}
              >
                <div className="copy">
                  <div className="headers flex">
                    <div className="item mint">Mint</div>
                    <div className="item date-listed-by">Date Listed / By</div>
                    <div className="item asking-price">Asking Price</div>
                  </div>

                  <div className="info">
                    {songData.transfers.map((transfer) => {
                      return (
                        <div className="singleSong flex">
                          <div className="mint">
                            #{transfer && transfer.copy_number}
                          </div>
                          <div className="date-listed-by">
                            <div className="dlb-grid">
                            <span>
                            {" "}
                            {moment(transfer && transfer.created_at).format(
                              "MM/DD/YYYY"
                            )}{"  "}
                            </span>
                            <span>
                            by @
                            {transfer &&
                              transfer.transferTo &&
                              transfer.transferTo.near_account_id}
                            </span>
                            </div>
                          </div>
                          <div className="songPrice">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(Number(utils.format.formatNearAmount(transfer.yocto_near_price)).toFixed(5) * Number(nearPrice))}
                          </div>
                          <div className="action">
                            <button
                              className={user.id === transfer.transfer_to && 'delist'}
                              onClick={() =>
                                onModalChange({
                                  ...transfer,
                                  token: `${songData.album.cover_cid}:${transfer.copy_number}:${songData.song_cid}`,
                                })
                              }
                            >
                              {user.id === transfer.transfer_to
                                ? "Delist Track"
                                : "Buy Now "}
                            </button>
                          </div>
                          <div className="mobileAction">
                            <button
                            className={user.id === transfer.transfer_to && 'delist'}
                            onClick={() => onModalChange(transfer)}>
                              {user.id === transfer.transfer_to
                                ? "Delist "
                                : "Buy "}
                                {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                }).format(Number(utils.format.formatNearAmount(transfer.yocto_near_price)).toFixed(5) * Number(nearPrice))}
                            </button>
                          </div>
                        </div>
                      )
                    }
                    )}
                  </div>
                </div>
              </div>
              </div>

              {props.displayBuyModal && (
                <div className="buy-modal">
                  <GeneralModal
                    headline={
                      buyingSong?.transfer_to === user.id
                        ? "Delist Track"
                        : "Buy Track"
                    }
                    bodyText={`Please confirm your ${
                      buyingSong.transfer_to === user.id
                        ? "delisting"
                        : "purchase"
                    }`}
                    // closeModal={() => toggleShowCaseModal(!showShowCaseModal)}
                    buttons={[
                      {
                        type: "button",
                        onClick: () => onBuy(songData),
                        text: "Confirm",
                        className: "buy-confirm",
                      },
                      {
                        type: "button",
                        onClick: () => props.hideBuyModal(),
                        text: "Cancel",
                        className: "buy-cancel",
                      },
                    ]}
                    isCloseButton={true}
                    closeModal={handleCloseModal}
                  />
                </div>
              )}
            </>
          ))}
      </div>
    </div>
  );
}
export default connect(
  (state) => {
    return {
      displayBuyModal: state.songs.showBuyModal,
      nearPrice: state.global.nearPrice,
      wallet: state.global.wallet,
    };
  },
  (dispatch) => {
    return {
      buySong: (data) => dispatch(buySongAction(data)),
      showBuyModal: () => dispatch(showBuyModalAction()),
      hideBuyModal: () => dispatch(hideBuyModalAction()),
      buySongNFT: (data) => dispatch(buySongNFTAction(data)),
      updateTokenTransfer: (data) => dispatch(updateTokenTransferAction(data)),
    };
  }
)(withRouter(SongList));
