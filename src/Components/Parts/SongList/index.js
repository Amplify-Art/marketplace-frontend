
import React, { useEffect, useState } from 'react';
import PaymentForm from './Parts/paymentForm';
import sortIcon from '../../../assets/images/Sort.svg';
import playProgress from '../../../assets/images/play_progress.svg';
import playBtn from '../../../assets/images/play_btn.svg';
import SongLength from '../../Common/SongLength/index';
import GeneralModal from '../../Common/GeneralModal/index';
import './SongList.scss';
import { some } from 'lodash';
const songHeader = () => (
  <div className="songlist-header flex">
    <div className="header-title">Song Title | Mints owned
      <img src={sortIcon} alt="" />
    </div>
    <div className="header-title">
      album
      <img src={sortIcon} alt="" />
    </div>
    <div className="header-title">Artist
      <img src={sortIcon} alt="" />
    </div>
    <div className="header-title">For sale
      <img src={sortIcon} alt="" />
    </div>
  </div>
)
function SongList(props) {
  const { songList } = props;
  const [playing, setPlaying] = useState(false);
  const [audio, setAudioSong] = useState(new Audio(''));
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [showBuyModal, toggleBuyModal] = useState(false);
  const [songListExpanded, toggleSongListExpansion] = useState(null);

  const expandSongList = (index) => {
    toggleSongListExpansion(index);
  }

  const handleAudio = (songId) => {
    setAudioSong(new Audio(`https://amplify-dev.mypinata.cloud/ipfs/${songId}`))
    if (playing && currentIndex !== songId) {
      audio.pause()
      audio.currentTime = 0;
      setCurrentIndex(songId)
      setPlaying(true)
    } else if (!playing && currentIndex === -1) {
      setCurrentIndex(songId)
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
    playing ? audio.play() : audio.pause()
  }, [audio, playing, currentIndex]);

  useEffect(() => {
    audio.addEventListener("ended", () => {
      setAudioSong(new Audio(''))
      setCurrentIndex(-1)
      setPlaying(false)
    });

    return () => {
      audio.removeEventListener("ended", () => {
        setAudioSong(new Audio(''))
        setCurrentIndex(-1)
        setPlaying(false)
      });
    };
  }, [playing, audio]);

  return (
    <div className="song-list">
      {songHeader()}
      <div>
        {songList && songList?.map((songData, index) => (
          <>
            <div className="play-song flex">
              <div className="flex">
                <div className="song-icon cursor-pointer">
                  <img src={playing && currentIndex === songData.song_cid ? playProgress : playBtn} alt="" onClick={(id) => handleAudio(songData.song_cid)} />
                  {/* <div className="audio-time"><SongLength i={index} song={`https://amplify-dev.mypinata.cloud/ipfs/${songData.song_cid}`} /></div> */}
                </div>
                <label className="song-title" onClick={() => expandSongList(index)}>
                  {songData.title} <span>{songData.mint || "#4"}</span>
                </label>
              </div>
              
              <div onClick={() => expandSongList(index)}>{songData.album && songData.album.title}</div>
              <div onClick={() => expandSongList(index)}>{songData.artist && songData.artist.name}</div>
              <div onClick={() => expandSongList(index)}>{songData.available_qty} / {songData.qty} {' '} Available</div>
            </div>
            <div className={`song-copies ${songListExpanded === index && 'expanded'}`} style={{ backgroundImage: `url(https://amplify-dev.mypinata.cloud/ipfs/${songList[0].album.cover_cid})` }}>
              <div className="copy">
                <div className="headers flex">
                  <div className="item mint">Mint</div>
                  <div className="item date-listed-by">Date Listed/By</div>
                  <div className="item asking-price">Asking Price</div>
                </div>
                <div className="info">
                  <div className="singleSong flex">
                    <div className="mint">#3</div>
                    <div className="date-listed-by">10/22/2020 by @2n10se</div>
                    <div className="asking-price">$100.00</div>
                    <div className="action"><button onClick={() => toggleBuyModal(true)}>Buy Now</button></div>
                  </div>
                  <div className="singleSong flex">
                    <div className="mint">#5</div>
                    <div className="date-listed-by">10/22/2020 by @2n10se</div>
                    <div className="asking-price">$125.00</div>
                    <div className="action"><button onClick={() => toggleBuyModal(true)}>Buy Now</button></div>
                  </div>
                  <div className="singleSong flex">
                    <div className="mint">#9</div>
                    <div className="date-listed-by">10/22/2020 by @2n10se</div>
                    <div className="asking-price">$99.00</div>
                    <div className="action"><button onClick={() => toggleBuyModal(true)}>Buy Now</button></div>
                  </div>
                  <div className="singleSong flex">
                    <div className="mint">#74</div>
                    <div className="date-listed-by">10/22/2020 by @2n10se</div>
                    <div className="asking-price">$159.00</div>
                    <div className="action"><button onClick={() => toggleBuyModal(true)}>Buy Now</button></div>
                  </div>
                  <div className="singleSong flex">
                    <div className="mint">#85</div>
                    <div className="date-listed-by">10/22/2020 by @2n10se</div>
                    <div className="asking-price">$250.00</div>
                    <div className="action"><button onClick={() => toggleBuyModal(true)}>Buy Now</button></div>
                  </div>
                  <div className="singleSong flex">
                    <div className="mint">#121</div>
                    <div className="date-listed-by">10/22/2020 by @2n10se</div>
                    <div className="asking-price">$1,100.00</div>
                    <div className="action"><button onClick={() => toggleBuyModal(true)}>Buy Now</button></div>
                  </div>  
                </div>
              </div>
            </div>

            {showBuyModal && (<div className="buy-modal">
              <GeneralModal
                headline="Buy Album"
                bodyText="Enter your payment details below."
                // closeModal={() => toggleShowCaseModal(!showShowCaseModal)}
                bodyChildren={<PaymentForm />}
                // buttons={[
                //   {
                //     type: 'button',
                //     onClick: () => toggleBuyModal(false),
                //     text: 'Cancel',
                //     className: 'buy-cancel'
                //   }
                // ]}
                isCloseButton={true}
              />
            </div>)}
          </>
        ))}
      </div>
    </div>
  )
}
export default SongList;