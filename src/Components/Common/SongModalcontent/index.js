import React, { useState } from 'react';
import playIcon from '../../../assets/images/play_icon.svg';
import BackArrowIconWhite from '../../../assets/images/left-arrow-white.png'
import './SongModalContent.scss'

function SongModalContent({ albumInfo }) {

  const playListData = [
    { icon: playIcon, title: "Another Level", length: "3:43", mints: "#3,#4" },
    { icon: playIcon, title: "One more time", length: "3:23", mints: "#5" },
    { icon: playIcon, title: "Everyone now", length: "3:59", mints: "#4" },
    { icon: playIcon, title: "Just can’t", length: "2.43", mints: "#4" },
  ]

  const [viewDetails, setViewDetails] = useState(false)
  const zeroPad = (num, places) => String(num).padStart(places, '0')

  return (
    <div id="albums-content">
      {!viewDetails ? <div className="left-sec-wrapper">
        <div className="album-top">
          <div className="album-img">
            {albumInfo && albumInfo.cover_cid ? (
              <img src={`https://gateway.pinata.cloud/ipfs/${albumInfo.cover_cid}`} alt='' />
            ) : <img src={albumInfo.coverArt} alt='' />}
          </div>
          <div className="album-right">
            <div className="title">{albumInfo && albumInfo.title}</div>
            <div className="artist-title">{albumInfo && albumInfo.user.name || 'No Artist'}</div>
            <div className="view-detail-sec" onClick={() => setViewDetails(true)}>View Details</div>
          </div>
        </div>
        <div className="album-bottom" id="modalScrolling">
          <table className="album_song">
            <tr>
              <th className="first-td">Track Title</th>
              <th className="second-td">length</th>
              <th className="third-td">Mints</th>
            </tr>


            {playListData && playListData.map((playAlbum, index) => (
              <tr>
                <td className="first-td pointer"><div className="album_wrap"><img src={playAlbum.icon} alt="" />{playAlbum.title}  </div></td>
                <td className="second-td"><div className="album_wrap"> {playAlbum.length} </div></td>
                <td className="third-td"><div className="album_wrap"> {playAlbum.mints}</div></td>
              </tr>
            ))}
          </table>
        </div>
      </div>
        : <div className="left-sec-wrapper">
          <div className="viewdetails-top">
            <div className="back-img" ><img onClick={() => setViewDetails(false)} src={BackArrowIconWhite} alt="left arrow" /></div>
            <div className="details-banner">
              Song Details
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
      <div className="bg-song-img" />
    </div>
  )
}

export default SongModalContent
