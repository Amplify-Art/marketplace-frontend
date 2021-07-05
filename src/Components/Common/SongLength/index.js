import React, { useState } from 'react';

function SongLength({ i, song }) {
  const [theSongMins, setTheSongMins] = useState();
  const [theSongSecs, setTheSongSecs] = useState();

  let length;

  const audioElement = new AudioContext();

  // Step 2: Download a .mp3 file using AJAX
  var request = new XMLHttpRequest();
  request.addEventListener('load', () => {
    if (request.status < 400) {
      audioElement.decodeAudioData(request.response, (audioBuffer) => {
        const rawDuration = audioBuffer.duration;
        const roundedSongLength = Math.round(rawDuration, 1);

        setTheSongMins(Math.trunc(roundedSongLength/60));
        setTheSongSecs(roundedSongLength - (Math.trunc(roundedSongLength/60))*60);
      });
    }
  });
  request.open('GET', song);
  request.responseType = 'arraybuffer';
  request.send();

  return (
    <>
      {(theSongSecs || theSongSecs === 0) && (<>{theSongMins}:{theSongSecs > 0 ? theSongSecs : '01'}</>) }
    </>
  )
}

export default SongLength