import React, { useEffect, useState } from 'react';
import AlbumSingleSong from '../AlbumSingleSong/index';
import playIcon from '../../../assets/images/play_icon.svg';
import GeneralModal from '../GeneralModal/index.js';
import BackArrowIcon from '../../../assets/images/left-arrow.png'
import CdImage from '../../../assets/images/cd-img.svg'
import './AlbumModalContent.scss'
import { usePalette } from 'react-palette';

// songmodal
import SongModalContent from '../SongModalcontent';


function AlbumModalContent({ albumInfo, isPlayList, isOpen }) {
  const [viewDetails, setViewDetails] = useState(false)
  const [songModal, setSongModal] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudioSong] = useState(new Audio(''));
  const [currentIndex, setCurrentIndex] = useState(-1)

  const handleSongModal = () => {
    setSongModal(true);
  }
  const toggle = (songid) => {
    setAudioSong(new Audio(`https://hub.textile.io/ipfs/${songid}`))
    if (playing && currentIndex !== songid) {
      audio.pause()
      audio.currentTime = 0;
      setCurrentIndex(songid)
      setPlaying(true)
    } else if (!playing && currentIndex === -1) {
      setCurrentIndex(songid)
      setPlaying(true)
    } else {
      setCurrentIndex(-1)
      setPlaying(false)
    }
  }

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [audio, playing, currentIndex]);

  useEffect(() => {
    audio.addEventListener("ended", () => {
      setPlaying(false)
    });
    audio.addEventListener("timeupdate", e => {
      const progressElement = document.getElementById('circleProgress')
      if (progressElement) {
        let normalizedRadius = 9;
        let circumference = normalizedRadius * 2 * Math.PI;
        let startPoint = (audio.currentTime / audio.duration) * circumference;
        let endPoint = circumference - (audio.currentTime / audio.duration) / 100 * circumference;
        progressElement.style.strokeDasharray = `${startPoint},${endPoint}`
      }
    });
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
      audio.removeEventListener("timeupdate", () => { });
    };
  }, [playing]);



  const handleCloseModal = () => { setSongModal(false) }

  const addToPlaylist = () => {
    sessionStorage.setItem('activePlaylist', JSON.stringify(albumInfo.songs))
  }
  const { data, loading, error } = usePalette(`https://gateway.pinata.cloud/ipfs/${albumInfo.cover_cid}`)

  return (
    <div id="albums-content">
      {!viewDetails ? <div className="left-wrapper" style={{ background: `linear-gradient(123.48deg, ${isPlayList ? '#f18180' : data.vibrant} 0%, ${isPlayList ? '#ec5051' : data.muted} 52.12%)` }}>
        <div className="album-top">
          {!isPlayList ? <div className="album-img">
            {albumInfo && albumInfo.cover_cid ? (
              <img src={`https://gateway.pinata.cloud/ipfs/${albumInfo.cover_cid}`} alt='' />
            ) : <img src={albumInfo.coverArt} alt='' />}
          </div> : null}
          <div className="album-right">
            <div className="title">{albumInfo && albumInfo.title}</div>
            {
              !isPlayList ? <>
                <div className="artist-title">{albumInfo && albumInfo?.user?.name || 'No Artist'}</div>
                <div className="view-detail" onClick={() => setViewDetails(true)}>View Details</div>
              </> : null
            }
          </div>
        </div>
        <div className="album-bottom">
          {albumInfo && albumInfo.songs.map((song, index) => (
            <AlbumSingleSong song={song} index={index} key={`${index}singlesong`} audio={audio} currentIndex={currentIndex} playing={playing} isOpen={isOpen} toggle={(data) => toggle(data)} />
          ))}
        </div>
        {isPlayList ? <div className="btn-wrabtn-wrapp input-holder active-playlist">
          <input type="submit" value="Play This Playlist" className="active-playlist-btn" onClick={addToPlaylist} />
        </div> : null}
        {songModal && <div className="modal-album"><GeneralModal isCloseButton="true" bodyChildren={<SongModalContent albumInfo={albumInfo} />} closeModal={handleCloseModal} /></div>}
      </div>
        : <div className="left-wrapper">
          <div className="viewdetails-top">
            <div className="back-img"><img onClick={() => setViewDetails(false)} src={BackArrowIcon} alt="left arrow" /></div>
            <div className="details-banner">
              Album Details
            </div>
          </div>
          <div className="details-content">
            <p className="sub-content" style={{ marginTop: '8px' }}>{albumInfo.description}</p>
          </div>
          <div className="memory-card">
            <div className="mint-text">Mint</div>
            <div className="mint-number">001</div>
          </div>
        </div>
      }
      {
        isPlayList ? <div className='cd-case'>
          <img src={CdImage} alt='Cd-image' />
        </div> :
          <div className='bg-album-img' />
      }
    </div >
  )
}

export default AlbumModalContent