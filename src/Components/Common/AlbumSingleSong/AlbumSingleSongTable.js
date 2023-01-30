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
      <svg height={20} width={20}>
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

const audioElement = new Audio();

function AlbumSingleSong(props) {
  const {
    song,
    index,
    isOpen,
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
    limit,
  } = props;
  const [user, setUser] = useState(
    jwt.decode(localStorage.getItem("amplify_app_token"))
  );
  const [isPlaying, setIsPlaying] = useState(playing);
  useEffect(() => {
    setIsPlaying(playing);
  }, [playing]);

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

  // check whether the token from contract matches with song transfers
  let hasAnyOfCopies = (tokens || []).some(
    (t) =>
      // t.token_id.includes(song.song_cid) &&
      song.transfers
        .filter((f) => f.token === song.song_cid)
        .some((s) => {
          return (
            `${token.album.cover_cid}:${s.copy_number}:${s.token}` ===
            t.token_id &&
            // s.copy_number === (token && token.copy_number) &&
            song.album_id === token.album.id &&
            s.is_owner &&
            !s.is_for_sale
          );
        })
  );
  useEffect(() => {
    if (!isSell) setIsCell(hasAnyOfCopies);
  }, [hasAnyOfCopies]);

  const convertTime = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration - minutes * 60;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  audio.addEventListener("canplay", function() {
    audio.ontimeupdate = function () {
      if (limit) {
        if (audio.currentTime > 10) {
          audio.pause();
          setIsPlaying(false);
        }
      }
    }
  });

  return (
    <
      // tr
      // className="inner-content-album-modal"
      // key={`al${index}`}
      // onClick={() => toggle(song.song_cid)}
      >
      <td className="td1" style={{ cursor: viewOrSell ? "not-allowed" : "pointer" }} onClick={() => { if (!viewOrSell) toggle(song.song_cid) }}>
        <div style={{ cursor: viewOrSell ? "not-allowed" : "pointer" }} className="pr-10 pointer play-pause-btn flex f-align-center">
          {isPlaying && currentIndex === song.song_cid ? (
            <div className="solid-pause">
              <i className="fa fa-solid fa-pause" onClick={() => toggle(song.song_cid)} />
            </div>
          ) : viewOrSell ? (
            <i className="fa fa-solid fa-ban" />
          ) : (
            <img src={playIcon} alt="play" />
          )}
        </div>
        <div style={{ cursor: viewOrSell ? "not-allowed" : "pointer" }} className="fn-white pointer flex f-align-center">{song.title}</div>
      </td>
      <td>
        <div className="duration flex f-align-center">
          {convertTime(song.duration)}
        </div>
      </td>
      <td style={{ textAlign: "center" }}>
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
      </td>
    </>
  );
}

export default withRouter(AlbumSingleSong);
