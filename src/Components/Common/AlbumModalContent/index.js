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
                        <img src={albumInfo.coverArt} alt='' />
                    </div>
                    <div className="album-right">
                        <div className="title">{albumInfo.title}</div>
                        <div className="artist-title">{albumInfo.artist}</div>
                        <div className="view-detail">View Details</div>
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
            <div className="bg-album-img" />
        </div>
    )
}

export default AlbumModalContent