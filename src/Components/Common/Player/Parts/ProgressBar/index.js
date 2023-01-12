import React from 'react';
import './ProgressBar.scss'

function ProgressBar({ onSongSeek, playBar, songProgress }) {
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