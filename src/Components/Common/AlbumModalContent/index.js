import React, { useEffect, useState } from 'react';
import AlbumSingleSong from '../AlbumSingleSong/index';
import playIcon from '../../../assets/images/play_icon.svg';
import GeneralModal from '../GeneralModal/index.js';
import BackArrowIcon from '../../../assets/images/left-arrow.png'
import CdImage from '../../../assets/images/cd-img.svg'
import './AlbumModalContent.scss'
import { usePalette } from 'react-palette';
import { hidePurchaseModalAction } from '../../../redux/actions/GlobalAction'
import { updateCurrentPlaylistAction } from '../../../redux/actions/PlaylistAction'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';

// songmodal
import SongModalContent from '../SongModalcontent';


function AlbumModalContent({ albumInfo, isPlayList, isOpen, updateCurrentPlaylist, onBuy, setViewDetails, viewDetails, history, showPurchaseModal, hidePurchaseModal }) {
  const [songModal, setSongModal] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudioSong] = useState(new Audio(''));
  const [currentIndex, setCurrentIndex] = useState(-1);
  const user = jwt.decode(localStorage.getItem('amplify_app_token'));

  const handleSongModal = () => {
    setSongModal(true);
  }
  const toggle = (songid) => {
    setAudioSong(new Audio(`https://amplify-dev.mypinata.cloud/ipfs/${songid}`))
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



  const handleCloseModal = () => {
    setSongModal(false);
    setViewDetails(false);
  }

  const addToPlaylist = async () => {
    updateCurrentPlaylist(albumInfo.songs)
    const songsWithCoverArt = await albumInfo.songs.map(song => ({ ...song, coverArt: isPlayList ? null : albumInfo?.coverArt ? albumInfo?.coverArt : albumInfo?.cover_cid }))
    sessionStorage.setItem('activePlaylist', JSON.stringify(songsWithCoverArt))
  }
  const { data } = usePalette(`https://amplify-dev.mypinata.cloud/ipfs/${albumInfo.cover_cid}`);

  const onClose = () => {
    hidePurchaseModal();
    history.push('/')
  }
  const zeroPad = (num, places) => String(num).padStart(places, '0')

  return (
    <>
      <div id="albums-content">
        {!viewDetails ? <div className="left-wrapper" style={{ background: `linear-gradient(123.48deg, ${isPlayList ? '#f18180' : data.vibrant} 0%, ${isPlayList ? '#ec5051' : data.muted} 52.12%)` }}>
          <div className="album-top">
            {!isPlayList ? <div className="album-img">
              {albumInfo && albumInfo.cover_cid ? (
                <img src={`https://amplify-dev.mypinata.cloud/ipfs/${albumInfo.cover_cid}`} alt='' />
              ) : <img src={albumInfo.coverArt} alt='' />}
            </div> : null}
            <div className="album-right" style={isPlayList ? { paddingLeft: '0px' } : {}}>
              <div className="title">{albumInfo && albumInfo.title}</div>
              {
                !isPlayList ? <>
                  <div className="artist-title">{albumInfo && albumInfo?.user?.name || 'No Artist'}</div>
                  <div className="view-detail" onClick={() => setViewDetails(true)}>View Details</div>
                </> : null
              }
            </div>
          </div>
          <div className="album-bottom" id="modalScrolling">
            {albumInfo && albumInfo.songs && albumInfo.songs?.sort((a, b) => a.id - b.id).map((song, index) => (
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
              <div className="mint-number">{zeroPad(albumInfo.copy_number || (albumInfo.available_qty === 0 ? albumInfo.available_qty : (albumInfo.qty - albumInfo.available_qty) + 1), 3)}</div>
            </div>
          </div>
        }
        {
          isPlayList ? <div className='cd-case'>
            <img src={CdImage} alt='Cd-image' />
          </div> :
            <div className='bg-album-img' />
        }
      </div>
      {showPurchaseModal && <GeneralModal
        topIcon={playIcon}
        headline="Thank You For Your Purchase!"
        buttons={[
          {
            type: 'outlined',
            text: 'Go Home',
            onClick: () => onClose()
          }
        ]}
        className="centered white-small"
      />}
      {!isPlayList && albumInfo.available_qty && albumInfo.user_id !== user.id ? <button onClick={() => onBuy(albumInfo)} type="button" className="buy-button">Buy This - ${(albumInfo.price / 100).toFixed(2)}</button> : null}
    </>
  )
}

export default connect(state => {
  return {
    showPurchaseModal: state.global && state.global.showPurchaseModal
  }
}, dispatch => {
  return {
    updateCurrentPlaylist: (data) => dispatch(updateCurrentPlaylistAction(data)),
    hidePurchaseModal: () => dispatch(hidePurchaseModalAction())
  }
})(withRouter(AlbumModalContent))
