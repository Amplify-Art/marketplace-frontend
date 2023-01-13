import React from 'react'
import NextSongIcon from "../../../../../assets/images/next.svg";
import PrevSongIcon from "../../../../../assets/images/prev.svg";

function Controls({
  nextSong,
  playButtonFunction,
  isPlaying,
  prevSong,
}) {
  return (
    <div className="controls">
      <div className="button prev" onClick={() => nextSong()}>
        <img src={NextSongIcon} alt="Next Song" />
      </div>
      <div
        className="button play-pause"
        onClick={() => playButtonFunction()}
      >
        {isPlaying ? (
          <svg
            className="pause"
            viewBox="0 0 12 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.06066 15.061C3.34196 14.7797 3.5 14.3982 3.5 14.0004L3.5 2.00037C3.5 1.60254 3.34196 1.22101 3.06066 0.939705C2.77936 0.658401 2.39782 0.500366 2 0.500366C1.60218 0.500366 1.22064 0.6584 0.939339 0.939705C0.658033 1.22101 0.5 1.60254 0.5 2.00037L0.5 14.0004C0.5 14.3982 0.658034 14.7797 0.939339 15.061C1.22064 15.3423 1.60217 15.5004 2 15.5004C2.39783 15.5004 2.77936 15.3423 3.06066 15.061ZM11.0607 15.061C11.342 14.7797 11.5 14.3982 11.5 14.0004L11.5 2.00037C11.5 1.60254 11.342 1.22101 11.0607 0.939705C10.7794 0.658401 10.3978 0.500366 10 0.500366C9.60218 0.500366 9.22065 0.658401 8.93934 0.939705C8.65804 1.22101 8.5 1.60254 8.5 2.00037L8.5 14.0004C8.5 14.3982 8.65804 14.7797 8.93934 15.061C9.22064 15.3423 9.60217 15.5004 10 15.5004C10.3978 15.5004 10.7794 15.3423 11.0607 15.061Z"
              fill="white"
              stroke="white"
            />
          </svg>
        ) : (
          <svg
            className="play"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
          </svg>
        )}
      </div>
      <div className="button next" onClick={() => prevSong()}>
        <img src={PrevSongIcon} alt="Previous Song" />
      </div>
    </div>
  )
}

export default Controls