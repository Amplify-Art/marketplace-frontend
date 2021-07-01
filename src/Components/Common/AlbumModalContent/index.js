import React, { useEffect, useState } from 'react';
import playIcon from '../../../assets/images/play_icon.svg';
import GeneralModal from '../GeneralModal/index.js';
import BackArrowIcon from '../../../assets/images/left-arrow.png'
import './AlbumModalContent.scss'

// songmodal
import SongModalContent from '../SongModalcontent';

function AlbumModalContent({ albumInfo }) {

    const playListData = [
        { icon: playIcon, title: "What is love", Playtime: "3:43" },
        { icon: playIcon, title: "What is love", Playtime: "3:43" },
        { icon: playIcon, title: "What is love", playtime: "3:43" },
        { icon: playIcon, title: "What is love", playtime: "3:43" },
        { icon: playIcon, title: "What is love", playtime: "3:43" },
        { icon: playIcon, title: "What is love", playtime: "3:43" },
    ]

    const [viewDetails, setViewDetails] = useState(false)

    const [songModal,setSongModal] = useState(false);

    const handleSongModal = () => {
        setSongModal(true);
    }

    const handleCloseModal = () => { setSongModal(false) }

    
    return (
        <div id="albums-content">
            {!viewDetails ? <div className="left-wrapper">
                <div className="album-top">
                    <div className="album-img">
                        {albumInfo.cover_cid ? (
                            <img className="album-img" src={`https://hub.textile.io/ipfs/${albumInfo.cover_cid}`} alt='' />
                        ) : <img className="album-img" src={albumInfo.coverArt} alt='' />}
                    </div>
                    <div className="album-right">
                        <div className="title">{albumInfo.title}</div>
                        <div className="artist-title">{albumInfo.user.name || 'No Artist'}</div>
                        <div className="view-detail" onClick={()=>setViewDetails(true)}>View Details</div>
                    </div>
                </div>
                <div className="album-bottom">
                    {playListData && playListData.map((playAlbum, index) => (
                        <div className="inner-content-album" key={`al${index}`} onClick={handleSongModal} >
                            <div className="album-title">
                                <div className="pr-10"><img src={playAlbum.icon} alt="" /></div>
                                <div className="fn-white">{playAlbum.title}</div>
                            </div>
                            <div className="fn-white">{playAlbum.playtime}</div>
                        </div>
                    ))}
                </div>
                {songModal && <div className="modal-album"><GeneralModal isCloseButton="true" bodyChildren={<SongModalContent albumInfo={albumInfo} />} closeModal={handleCloseModal} /></div>}
            </div>
                : <div className="left-wrapper">
                    <div className="viewdetails-top">
                        <div className="back-img" ><img onClick={() => setViewDetails(false)} src={BackArrowIcon} alt="left arrow" /></div>
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