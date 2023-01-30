import React, { useState, useEffect } from "react";
import { usePalette } from 'react-palette';

import AlbumSingleSong from "../AlbumSingleSong/AlbumSingleSongTable";
import BackArrowIcon from '../../../assets/images/leftarrow.svg';
import './SingleAlbumModal.scss';


const SingleAlbumModal = ({ isOpen = false, albumData, limit }) => {
  const [viewDetails, setViewDetails] = useState(false);
  const [audio, setAudioSong] = useState(new Audio(''));
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const { data } = usePalette(albumData.cover_cid ? `https://gateway.pinata.cloud/ipfs/${albumData.cover_cid}` : albumData.coverArt);
  const zeroPad = (num, places) => String(num).padStart(places, '0');

  const toggle = (songid) => {
    setAudioSong(new Audio(`https://gateway.pinata.cloud/ipfs/${songid}`))
    if (playing && currentIndex !== songid) {
      audio.pause()
      audio.currentTime = 0;
      setCurrentIndex(songid)
      setPlaying(true)
    } else if (!playing && currentIndex === -1) {
      setCurrentIndex(songid)
      setPlaying(true)
    } else {
      audio.pause()
      audio.currentTime = 0;
      setAudioSong(new Audio(''))
      setCurrentIndex(-1)
      setPlaying(false)
    }
  }

  useEffect(() => {
    if (!isOpen) {
      setCurrentIndex(-1)
      setPlaying(false)
    }
  }, [isOpen]);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [audio, playing, currentIndex]);

  useEffect(() => {
    audio.addEventListener("ended", () => {
      setAudioSong(new Audio(''))
      setCurrentIndex(-1)
      setPlaying(false)
    });
    audio.addEventListener("timeupdate", e => {
      const progressElement = document.getElementById(currentIndex)
      if (progressElement) {
        let normalizedRadius = 9;
        let circumference = normalizedRadius * 2 * Math.PI;
        let startPoint = (audio.currentTime / audio.duration) * circumference;
        let endPoint = circumference - (audio.currentTime / audio.duration) / 100 * circumference;
        progressElement.style.strokeDasharray = `${startPoint},${endPoint}`
      }
    });
    return () => {
      audio.removeEventListener("ended", () => {
        setAudioSong(new Audio(''))
        setCurrentIndex(-1)
        setPlaying(false)
      });
      audio.removeEventListener("timeupdate", () => { });
    };
  }, [playing, audio]);

  return (
    <>
      <div id="albums-content">
        {!viewDetails
          ?
          <div className="left-wrapper" style={{ background: `linear-gradient(123.48deg, ${data.vibrant} 0%, ${data.muted} 52.12%)` }}>
            <div className="album-top">
              <div className="album-img">
                {albumData && albumData.cover_cid
                  ?
                  <img src={`https://gateway.pinata.cloud/ipfs/${albumData.cover_cid}`} alt='' />
                  :
                  <img src={albumData.coverArt} alt='' />}
              </div>
              <div className="album-right">
                <div className="title">{albumData && albumData.title}</div>
                <div className="artist-title">{albumData?.user?.near_account_id || 'No Artist'}</div>
                <div className="view-detail" onClick={() => setViewDetails(true)}>View Details</div>
              </div>
            </div>
            <div className="album-bottom" id="modalScrolling">
              <table
                style={{ width: "100%" }}
              >
                <tr className="table-header">
                  <th>TRACK TITLE</th>
                  <th>LENGTH</th>
                  <th></th>
                </tr>
                {albumData &&
                  albumData.songs &&
                  albumData.songs
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
                          isSell={true}
                          limit={limit}
                        />
                      </tr>
                    ))}
              </table>
            </div>
          </div>
          :
          <div className="left-wrapper" style={{ background: `linear-gradient(123.48deg, ${data.vibrant} 0%, ${data.muted} 52.12%)` }}>
            <div className="viewdetails-top">
              <div className="back-img"><img onClick={() => setViewDetails(false)} src={BackArrowIcon} alt="left arrow" /></div>
              <div className="details-banner">
                Album Details
              </div>
            </div>
            <div className="details-content">
              <p className="sub-content" style={{ marginTop: '8px' }}>{albumData.description}</p>
            </div>
          </div>
        }
        <div className='bg-album-img' />
      </div>
    </>
  );
};

export default SingleAlbumModal;
