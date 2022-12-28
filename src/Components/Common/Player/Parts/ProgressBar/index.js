import React, { useState, useEffect, useRef } from "react";

function ProgressBar({
  songProgress,
  audioElement
}) {
  // Refereces
  const playBar = useRef(null);

  const onSongSeek = (e) => {
    audioElement.currentTime =
      ((e.clientX - playBar.current.getBoundingClientRect().x) *
        audioElement.duration) /
      playBar.current.getBoundingClientRect().width;
  };
  
  return (
    <div className="progress-bar">
      <div className="bar" onClick={(e) => onSongSeek(e)} ref={playBar}>
        <div
          className="completed"
          style={{
            width: songProgress + "%",
            height: "100%",
          }}
        />
      </div>
    </div>
  )
}

export default ProgressBar