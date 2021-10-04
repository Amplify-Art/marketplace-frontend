
import React, { useEffect, useState, useRef } from 'react';
import PaymentForm from './Parts/paymentForm';
import sortIcon from '../../../assets/images/Sort.svg';
import playProgress from '../../../assets/images/play_progress.svg';
import pauseIcon from '../../../assets/images/pause_icon.svg';
import playBtn from '../../../assets/images/play_btn.svg';
import SongLength from '../../Common/SongLength/index';
import GeneralModal from '../../Common/GeneralModal/index';
import './SongList.scss';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { buySongAction, showBuyModalAction, hideBuyModalAction } from '../../../redux/actions/SongAction'

const songHeader = () => (
  <div className="songlist-header flex">
    <div className="header-title">Song Title | Mints owned
      {/* <img src={sortIcon} alt="" /> */}
    </div>
    <div className="header-title">
      album
      {/* <img src={sortIcon} alt="" /> */}
    </div>
    <div className="header-title">Artist
      {/* <img src={sortIcon} alt="" /> */}
    </div>
    <div className="mobile-header-title">
      Song Title &nbsp; | &nbsp; Artist &nbsp; | &nbsp; Mint Owned
    </div>
    <div className="header-title">For sale
      {/* <img src={sortIcon} alt="" /> */}
    </div>
  </div>
)
function SongList(props) {
  const { songList } = props;
  const [playing, setPlaying] = useState(false);
  let audio = useRef();
  // const [audio, setAudioSong] = useState(new Audio(''));
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [buyingSong, setBuyingSong] = useState(null);
  const [songListExpanded, toggleSongListExpansion] = useState(null);

  const expandSongList = (index) => {
    if (songList[index].transfers.length) {
      if (index === songListExpanded) {
        toggleSongListExpansion(null);
      } else {
        toggleSongListExpansion(index);
      }
    }
  }

  const handleAudio = (songId) => {
    if (!playing) {
      audio.current = new Audio(`https://amplify-dev.mypinata.cloud/ipfs/${songId}`)
      audio.current.currentTime = 0;
      setCurrentIndex(songId)
      setPlaying(true)
    }
    else if (playing && currentIndex !== songId) {
      audio.current.pause()
      audio.current = new Audio(`https://amplify-dev.mypinata.cloud/ipfs/${songId}`)
      audio.current.currentTime = 0;
      setCurrentIndex(songId)
      setPlaying(true)
    } else if (!playing && currentIndex === -1) {
      setCurrentIndex(songId)
      setPlaying(true)
    } else {
      audio.current.pause()
      audio.current.currentTime = 0;
      audio.current = new Audio(``)
      // setAudioSong(new Audio(''))
      setCurrentIndex(-1)
      setPlaying(false)
    }
  }
  useEffect(() => {
    if (audio.current)
      playing ? audio.current.play() : audio.current.pause()
  }, [audio, playing, currentIndex]);

  useEffect(() => {
    if (audio.current)
      audio.current.addEventListener("ended", () => {
        audio.current = new Audio(``)
        // setAudioSong(new Audio(''))
        setCurrentIndex(-1)
        setPlaying(false)
      });

    return () => {
      if (audio.current)
        audio.current.removeEventListener("ended", () => {
          audio.current = new Audio(``)
          // setAudioSong(new Audio(''))
          setCurrentIndex(-1)
          setPlaying(false)
        });
    };
  }, [playing, audio]);

  useEffect(() => {
    return () => {
      if (audio.current) {
        audio.current.pause()
      }
    }
  }, [props.history.location])
  const onBuy = () => {
    props.buySong({
      id: buyingSong.id,
      price: buyingSong.bidding_price
    })
  }
  const onModalChange = (song) => {
    props.showBuyModal()
    setBuyingSong(song)
  }
  return (
    <div className="song-list">
      {songHeader()}
      <div>
        {songList && songList?.map((songData, index) => (
          <>
            <div className="play-song flex">
              <div className="flex">
                <div className="song-icon cursor-pointer">
                  <img src={playing && songData.song_cid === currentIndex ? pauseIcon : playBtn} alt="" onClick={(id) => handleAudio(songData.song_cid)} />
                  {/* <div className="audio-time"><SongLength i={index} song={`https://amplify-dev.mypinata.cloud/ipfs/${songData.song_cid}`} /></div> */}
                </div>
                <label className="song-title" onClick={() => expandSongList(index)}>
                  <div>{songData.title} <span>{(songData.mints_owned || []).map(i => `#${i}`).join(' ,')}</span></div>
                  <p className="song-title-mobile">{songData.artist && songData.artist.name}</p>
                </label>
              </div>

              <div className="song-album" onClick={() => expandSongList(index)}>{songData.album && songData.album.title}</div>
              <div className="song-artist" onClick={() => expandSongList(index)}>{songData.artist && songData.artist.name}</div>
              <div className="song-mint-mobile" onClick={() => expandSongList(index)}>{songData.mint || "#4"}</div>
              <div onClick={() => expandSongList(index)}>{songData.transfers.length} / {songData.qty} {' '} Available</div>
            </div>
            <div className={`song-copies ${songListExpanded === index && 'expanded'}`} style={{ backgroundImage: `url(https://amplify-dev.mypinata.cloud/ipfs/${songData.album && songData.album.cover_cid})` }}>
              <div className="copy">
                <div className="headers flex">
                  <div className="item mint">Mint</div>
                  <div className="item date-listed-by">Date Listed/By</div>
                  <div className="item asking-price">Asking Price</div>
                </div>
                {

                }
                <div className="info">
                  {
                    songData.transfers.map(transfer => <div className="singleSong flex">
                      <div className="mint">#{transfer && transfer.copy_number}</div>
                      <div className="date-listed-by"> {moment(transfer && transfer.created_at).format('MM/DD/YYYY')} by @{transfer && transfer.transferTo && transfer.transferTo.name}</div>
                      <div className="asking-price">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(transfer && transfer.bidding_price / 100)}</div>
                      <div className="action"><button onClick={() => onModalChange(transfer)}>Buy Now</button></div>
                    </div>)
                  }
                </div>
              </div>
            </div>

            {props.displayBuyModal && (<div className="buy-modal">
              <GeneralModal
                headline="Buy Album"
                bodyText="Please confirm your purchase"
                // closeModal={() => toggleShowCaseModal(!showShowCaseModal)}
                buttons={[
                  {
                    type: 'button',
                    onClick: () => onBuy(songData),
                    text: 'Confirm',
                    className: 'buy-confirm'
                  },
                  {
                    type: 'button',
                    onClick: () => props.hideBuyModal(),
                    text: 'Cancel',
                    className: 'buy-cancel'
                  }
                ]}
                isCloseButton={true}
              />
            </div>)}
          </>
        ))}
      </div>
    </div>
  )
}
export default connect(state => {
  return {
    displayBuyModal: state.songs.showBuyModal
  }
}, dispatch => {
  return {
    buySong: (data) => dispatch(buySongAction(data)),
    showBuyModal: () => dispatch(showBuyModalAction()),
    hideBuyModal: () => dispatch(hideBuyModalAction())
  }
})(withRouter(SongList));