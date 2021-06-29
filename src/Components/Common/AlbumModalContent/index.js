import React from 'react';
import playIcon from '../../../assets/images/play_icon.svg';
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


    return (
        <div id="albums-content">
            <div className="left-wrapper">
                <div className="album-top">
                    <div className="album-img">
                        {albumInfo.cover_cid ? (
                            <img className="album-img" src={`https://hub.textile.io/ipfs/${albumInfo.cover_cid}`} alt='' />
                        ) : <img className="album-img" src={albumInfo.coverArt} alt='' />}
                    </div>
                    <div className="album-right">
                        <div className="title">{albumInfo.title}</div>
                        <div className="artist-title">{albumInfo.artist || 'No Artist'}</div>
                        <div className="view-detail">View Details</div>
                    </div>
                </div>
                <div className="album-bottom">
                    {playListData && playListData.map((playAlbum, index) => (
                        <div className="inner-content-album" key={`al${index}`}>
                            <div className="album-title">
                                <div className="pr-10"><img src={playAlbum.icon} alt="" /></div>
                                <div className="fn-white">{playAlbum.title}</div>
                            </div>
                            <div className="fn-white">{playAlbum.playtime}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-album-img" />
        </div>
    )
}

export default AlbumModalContent