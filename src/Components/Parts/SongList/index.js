import React, { useEffect, useState, useRef } from "react";
import PaymentForm from "./Parts/paymentForm";
import sortIcon from "../../../assets/images/Sort.svg";
import playProgress from "../../../assets/images/play_progress.svg";
import pauseIcon from "../../../assets/images/pause_icon.svg";
import playBtn from "../../../assets/images/play_btn.svg";
import SongLength from "../../Common/SongLength/index";
import GeneralModal from "../../Common/GeneralModal/index";
import "./SongList.scss";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import jwt from "jsonwebtoken";
import * as nearAPI from "near-api-js";
import { store } from "react-notifications-component";
import q from "querystring";
import {
  buySongAction,
  showBuyModalAction,
  hideBuyModalAction,
} from "../../../redux/actions/SongAction";
import { buySongNFTAction } from "../../../redux/actions/NFTAction";

const {
  utils: {
    format: { parseNearAmount },
  },
} = nearAPI;

const songHeader = () => (
  <div className="songlist-header flex">
    <div className="header-title">
      Song Title | Mints owned
      {/* <img src={sortIcon} alt="" /> */}
    </div>
    <div className="header-title">
      album
      {/* <img src={sortIcon} alt="" /> */}
    </div>
    <div className="header-title">
      Artist
      {/* <img src={sortIcon} alt="" /> */}
    </div>
    <div className="mobile-header-title">
      <div>Song Market</div>
      <div className="mobile-header-title-right">
        <i className="far fa-sort-alt" />
        <span className="sort">SORT</span>
      </div>
    </div>
    <div className="header-title">
      For sale
      {/* <img src={sortIcon} alt="" /> */}
    </div>
  </div>
);
function SongList(props) {
  const { songList } = props;
  const [playing, setPlaying] = useState(false);
  let audio = useRef();
  // const [audio, setAudioSong] = useState(new Audio(''));
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [buyingSong, setBuyingSong] = useState(null);
  const [songListExpanded, toggleSongListExpansion] = useState(null);
  const user = jwt.decode(localStorage.getItem("amplify_app_token"));
  const expandSongList = (id) => {
    console.log(q.parse(props.history.location.search), id);
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
    console.log(i, "IIII");
    if (i) {
      toggleSongListExpansion(parseInt(i));
    }
  }, []);
  // check for any transactions
  useEffect(() => {
    let buyingSong = JSON.parse(localStorage.getItem("buying_song"));
    if (props.history.location.search.includes("errorCode")) {
      let message = decodeURIComponent(
        q.parse(props.history.location.search).errorMessage
      );
      store.addNotification({
        title: "Error",
        message: message,
        type: "danger",
        insert: "top",
        container: "top-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      localStorage.removeItem("buying_song");
      props.history.push("/marketplace");
    } else if (props.history.location.search.includes("transactionHashes")) {
      let txtId = decodeURIComponent(
        q.parse(props.history.location.search)["?transactionHashes"]
      );
      buyingSong.hash = txtId;
      console.log(buyingSong);
      props.buySongNFT(buyingSong);
      localStorage.removeItem("buying_song");
      props.history.push("/marketplace");
    }
  }, []);

  const handleAudio = (songId) => {
    if (!playing) {
      audio.current = new Audio(
        `https://amplify-dev.mypinata.cloud/ipfs/${songId}`
      );
      audio.current.currentTime = 0;
      setCurrentIndex(songId);
      setPlaying(true);
    } else if (playing && currentIndex !== songId) {
      audio.current.pause();
      audio.current = new Audio(
        `https://amplify-dev.mypinata.cloud/ipfs/${songId}`
      );
      audio.current.currentTime = 0;
      setCurrentIndex(songId);
      setPlaying(true);
    } else if (!playing && currentIndex === -1) {
      setCurrentIndex(songId);
      setPlaying(true);
    } else {
      audio.current.pause();
      audio.current.currentTime = 0;
      audio.current = new Audio(``);
      // setAudioSong(new Audio(''))
      setCurrentIndex(-1);
      setPlaying(false);
    }
  };
  useEffect(() => {
    if (audio.current) playing ? audio.current.play() : audio.current.pause();
  }, [audio, playing, currentIndex]);

  useEffect(() => {
    if (audio.current)
      audio.current.addEventListener("ended", () => {
        audio.current = new Audio(``);
        // setAudioSong(new Audio(''))
        setCurrentIndex(-1);
        setPlaying(false);
      });

    return () => {
      if (audio.current)
        audio.current.removeEventListener("ended", () => {
          audio.current = new Audio(``);
          // setAudioSong(new Audio(''))
          setCurrentIndex(-1);
          setPlaying(false);
        });
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
    console.log(
      buyingSong,
      parseNearAmount(`${buyingSong.yocto_near_price}`),
      "buying_song"
    );
    if (user.near_account_type === "connected") {
      let buying_song = {
        id: buyingSong.id,
        price: buyingSong.bidding_price,
        yocto_near_price: buyingSong.yocto_near_price,
      };
      localStorage.setItem("buying_song", JSON.stringify(buying_song));
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
    } else {
      props.buySong({
        id: buyingSong.id,
        price: buyingSong.bidding_price,
      });
    }
  };
  const onModalChange = (song) => {
    props.showBuyModal();
    setBuyingSong(song);
  };

  const textEllipsis = (txt) => {
    if (txt.length > 9) {
      return txt.substr(0, 9) + "...";
    }
    return txt;
  };

  return (
    <div className="song-list">
      {songHeader()}
      <div>
        {songList &&
          songList?.map((songData, index) => (
            <>
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
                    {/* <div className="audio-time"><SongLength i={index} song={`https://amplify-dev.mypinata.cloud/ipfs/${songData.song_cid}`} /></div> */}
                  </div>
                  <label
                    className="song-title"
                    onClick={() => expandSongList(songData.id)}
                  >
                    <div>
                      {songData.title}{" "}
                      <span>
                        {(songData.mints_owned || [])
                          .map((i) => `#${i}`)
                          .join(" ,")}
                      </span>
                    </div>
                    <p className="song-title-mobile">
                      {textEllipsis(
                        (songData.artist && songData.artist.name) || ""
                      )}{" "}
                      /{" "}
                      {textEllipsis(
                        (songData.album && songData.album.title) || ""
                      )}
                    </p>
                    <div
                      className="song-mint-mobile"
                      onClick={() => expandSongList(songData.id)}
                    >
                      {songData.mint || "#4"}
                    </div>
                    <div style={{ border: 0 }} />
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
                  {songData.artist && songData.artist.name}
                </div>
                <div
                  className="song-available-mobile"
                  onClick={() => expandSongList(songData.id)}
                >
                  {songData.transfers.length} / {songData.qty}
                </div>
                <div
                  className="song-available"
                  onClick={() => expandSongList(songData.id)}
                >
                  {songData.transfers.length} / {songData.qty} Available
                </div>
              </div>
              <div
                className={`song-copies ${
                  songListExpanded === songData.id && "expanded"
                }`}
                style={{
                  backgroundImage: `url(https://amplify-dev.mypinata.cloud/ipfs/${
                    songData.album && songData.album.cover_cid
                  })`,
                }}
              >
                <div className="copy">
                  <div className="headers flex">
                    <div className="item mint">Mint</div>
                    <div className="item date-listed-by">Date Listed/By</div>
                    <div className="item asking-price">Asking Price</div>
                  </div>
                  {}
                  <div className="info">
                    {songData.transfers.map((transfer) => (
                      <div className="singleSong flex">
                        <div className="mint">
                          #{transfer && transfer.copy_number}
                        </div>
                        <div className="date-listed-by">
                          {" "}
                          {moment(transfer && transfer.created_at).format(
                            "MM/DD/YYYY"
                          )}{" "}
                          by @
                          {transfer &&
                            transfer.transferTo &&
                            transfer.transferTo.name}
                        </div>
                        <div className="date-listed-by-mobile">
                          <div style={{ width: "100%" }}>
                            {moment(transfer && transfer.created_at).format(
                              "MM/DD/YYYY"
                            )}
                          </div>
                          <div style={{ width: "100%" }}>
                            by @
                            {transfer &&
                              transfer.transferTo &&
                              transfer.transferTo.name}
                          </div>
                        </div>
                        <div className="songPrice">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(transfer && transfer.bidding_price / 100)}
                        </div>
                        <div className="action">
                          <button
                            onClick={() =>
                              onModalChange({
                                ...transfer,
                                token: `${songData.album.cover_cid}:${transfer.copy_number}:${songData.song_cid}`,
                              })
                            }
                          >
                            Buy Now
                          </button>
                        </div>
                        <div className="mobileAction">
                          <button onClick={() => onModalChange(transfer)}>
                            Buy Now{" "}
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(transfer && transfer.bidding_price / 100)}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {props.displayBuyModal && (
                <div className="buy-modal">
                  <GeneralModal
                    headline="Buy Album"
                    bodyText="Please confirm your purchase"
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
    };
  }
)(withRouter(SongList));
