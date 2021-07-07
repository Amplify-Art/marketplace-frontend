import React, { useEffect, useState } from 'react';
import AlbumSingleSong from '../AlbumSingleSong/index';
import playIcon from '../../../assets/images/play_icon.svg';
import GeneralModal from '../GeneralModal/index.js';
import BackArrowIcon from '../../../assets/images/left-arrow.png'
import './AlbumModalContent.scss'

// songmodal
import SongModalContent from '../SongModalcontent';


function AlbumModalContent({ albumInfo,isPlayList }) {
  const [viewDetails, setViewDetails] = useState(false)
  const [songModal, setSongModal] = useState(false);

  const handleSongModal = () => {
    setSongModal(true);
  }

  const handleCloseModal = () => { setSongModal(false) }

  const addToPlaylist = () => {
        sessionStorage.setItem('activePlaylist',JSON.stringify(albumInfo.songs.map(song=>song.id)))
  }

  return (
    <div id="albums-content">
      {!viewDetails ? <div className="left-wrapper">
        <div className="album-top">
          <div className="album-img">
            {albumInfo && albumInfo.cover_cid ? (
              <img src={`https://hub.textile.io/ipfs/${albumInfo.cover_cid}`} alt='' />
            ) : <img src={albumInfo.coverArt} alt='' />}
          </div>
          <div className="album-right">
            <div className="title">{albumInfo && albumInfo.title}</div>
            <div className="artist-title">{albumInfo && albumInfo?.user?.name || 'No Artist'}</div>
            <div className="view-detail" onClick={() => setViewDetails(true)}>View Details</div>
          </div>
        </div>
        <div className="album-bottom">
          {albumInfo && albumInfo.songs.map((song, index) => (
            <AlbumSingleSong song={song} index={index} />
          ))}
        </div>
        {isPlayList ? <div className="btn-wrabtn-wrapp input-holder active-playlist">
          <input type="submit" value="Play This Playlist" className="active-playlist-btn" onClick={addToPlaylist}  />
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
      <div className="bg-album-img" />
    </div>
  )
}

export default AlbumModalContent