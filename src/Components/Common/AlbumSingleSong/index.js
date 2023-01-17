import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import playIcon from "../../../assets/images/play_icon.svg";
import pauseIcon from "../../../assets/images/pause_icon.svg";
import jwt from "jsonwebtoken";
import "./AlbumSingleSong.scss";
class ProgressRing extends React.Component {
  constructor(props) {
    super(props);

    const { radius, stroke } = this.props;

    this.normalizedRadius = radius - stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
  }

  render() {
    const { radius, stroke, progressId } = this.props;
    return (
      <svg height={radius * 2} width={radius * 2}>
        <image
          id="mybutton"
          x={radius - 9}
          y={radius - 4}
          r="50"
          width={radius}
          height="30%"
          xlinkHref={pauseIcon}
        ></image>
        <circle
          stroke="white"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={0 + " " + 0}
          r={this.normalizedRadius}
          cx={radius - 2.5}
          cy={radius}
          id={progressId}
        />
      </svg>
    );
  }
}


function AlbumSingleSong(props) {
  const {
    song,
    index,
    toggle,
    playing,
    currentIndex,
    audio,
    onSingleSongClick,
    token,
    isPlayList,
    tokens,
    setIsCell,
    isSell,
  } = props;
  const [user, ] = useState(
    jwt.decode(localStorage.getItem("amplify_app_token"))
  );

  const handleClick = (e, song) => {
    e.stopPropagation();
    onSingleSongClick(song);
  };
  let url = props.history.location;
  let viewOrSell = (
    (song.transfers || []).find(
      (f) =>
        f.copy_number === (token && token.copy_number) &&
        song.album_id === token.album.id
    ) || {}
  ).is_for_sale;

  let hasAnyOfCopies = (tokens || []).some((t) => {
    let [copy, songToken] = t.token_id.split(":");
    let txn = song.transfers?.find(
      (f) =>
        f.token === songToken &&
        parseInt(f.copy_number) === parseInt(copy) &&
        parseInt(user?.id) === parseInt(f.transfer_to) &&
        f.is_owner
    );
    return t.token_id.includes(song.song_cid) && txn?.is_for_sale === false;
  });
  useEffect(() => {
    if (typeof isSell !== 'undefined') {
    if (!isSell) setIsCell(hasAnyOfCopies);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnyOfCopies]);
  return (
    <div
      className="inner-content-album-modal"
      key={`al${index}`}
      onClick={() => toggle(song.song_cid)}
    >
      <div
        className={`modal-album-title ${
          isPlayList ? "playlist" : !hasAnyOfCopies ? "can-sell" : "can-sell"
        }`}
      >
        <div className="pr-10 pointer play-pause-btn">
          {playing && currentIndex === song.song_cid ? (
            <div onClick={() => toggle(song.song_cid)}>
              <ProgressRing
                radius={13}
                stroke={2}
                progress={
                  audio.currentTime
                    ? audio.currentTime / parseInt(song.duration)
                    : 0
                }
                progressId={song.song_cid}
              />
            </div>
          ) : viewOrSell ? (
            <i className="fa fa-solid fa-ban"></i>
          ) : (
            <img src={playIcon} alt="play" />
          )}
        </div>
        <div className="fn-white pointer">{song.title}</div>
        <div
          className="duration"
          style={
            {
              // width:
              //   url.pathname === "/my-profile" && !isPlayList
              //     ? viewOrSell
              //       ? "30%"
              //       : !hasAnyOfCopies
              //       ? "70%"
              //       : "55%"
              //     : "100%",
            }
          }
        >{`${Math.floor(song.duration / 60)}:${String(
          Math.ceil(song.duration / 60 - Math.floor(song.duration / 60)) * 60
        ).padStart(2, "0")}`}</div>
        {url.pathname === "/my-profile" && (
          <>
            {isPlayList ? null : viewOrSell ? (
              <span
                className="view"
                onClick={() =>
                  props.history.push(`/marketplace/?expanded=${song.id}`)
                }
              >
                Buy
              </span>
            ) : hasAnyOfCopies ? (
              <button className="sell" onClick={(e) => handleClick(e, song)}>
                Sell
              </button>
            ) : null}
          </>
        )}
      </div>
      {/* <div className="fn-white"><SongLength i={index} song={`https://gateway.pinata.cloud/ipfs/${song.song_cid}`} /></div> */}
    </div>
  );
}

export default withRouter(AlbumSingleSong);
