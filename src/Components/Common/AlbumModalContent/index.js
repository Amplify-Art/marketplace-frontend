import React, { useState } from 'react';
import playIcon from '../../../assets/images/play_icon.svg';
import BackArrowIcon from '../../../assets/images/left-arrow.png'
import './AlbumModalContent.scss'

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

    return (
        <div id="albums-content">
            {!viewDetails ? <div className="left-wrapper">
                <div className="album-top">
                    <div className="album-img">
                        <img src={albumInfo.coverArt} alt='' />
                    </div>
                    <div className="album-right">
                        <div className="title">{albumInfo.title}</div>
                        <div className="artist-title">{albumInfo.artist}</div>
                        <div className="view-detail" onClick={() => setViewDetails(true)} >View Details</div>
                    </div>
                </div>
                <div className="album-bottom">
                    {playListData && playListData.map((playAlbum, index) => (
                        <div className="inner-content-album" key={`al${index}`}>
                            <div className="album-title">
                                <div className="pr-10"><img src={playAlbum.icon} alt="" /></div>
                                <div>{playAlbum.title}</div>
                            </div>
                            <div>{playAlbum.playtime}</div>
                        </div>
                    ))}
                </div>
            </div>
                : <div className="left-wrapper">
                    <div className="viewdetails-top">
                        <div className="back-img" ><img onClick={() => setViewDetails(false)} src={BackArrowIcon} alt="left arrow" /></div>
                        <div className="details-banner">
                            Album Details
                        </div>
                    </div>
                    <div className="details-content">
                        <p className="sub-content" style={{ marginTop: '8px' }}>Nullah Lorem mollit cupidatat irure.Laborum magna nulla duis ullamco cillum dolor.Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.</p>
                        <p className="sub-content">Nullah Lorem mollit cupidatat irure.Laborum magna nulla duis ullamco cillum dolor.Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.</p>
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