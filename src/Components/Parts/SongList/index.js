import React from 'react';

import sortIcon from '../../../assets/images/Sort.svg';
import playProgress from '../../../assets/images/play_progress.svg';
import playBtn from '../../../assets/images/play_btn.svg';

import './SongList.scss';

const songHeader = () => (
    <div className="songlist-header flex f-jc-space-around">
        <label className="header-title">Song Title | Mints owned
            <img src={sortIcon} alt="" />
        </label>
        <label className="header-title">
            album
            <img src={sortIcon} alt="" />
        </label>
        <label className="header-title">Artist
            <img src={sortIcon} alt="" />
        </label>
        <label className="header-title">For sale
            <img src={sortIcon} alt="" />
        </label>
    </div>
)

function SongList() {

    const songsList = [
        {
            "title":"Another Level",
            "artist":"Blood is Rebel",
            "album":"Oh The Larceny",
            "forsale":"14/100 Available",
            "mint":"#3,#4"
        },
        {
            "title":"Real Good Feeling",
            "artist":"Blood is Rebel",
            "album":"Oh The Larceny",
            "forsale":"14/100 Available",
            "mint":""
        },
        {
            "title":"Moving too fast",
            "artist":"Blood is Rebel",
            "album":"Oh The Larceny",
            "forsale":"14/100 Available",
            "mint":""
        },
        {
            "title":"Can’t stop this feeling",
            "artist":"Blood is Rebel",
            "album":"Oh The Larceny",
            "forsale":"14/100 Available",
            "mint":""
        },
    ];

    return (
        <div className="song-list">
            {songHeader()}
            <div>
                {songsList.map((songData,index) => (
                    <div className="flex f-jc-space-around">
                        <div className="flex f-jc-space-around">
                            <img src={playProgress} alt=""/>
                            <label className="song-data">{songData.title}</label>
                            <label className="song-data">{songData.mint}</label>
                        </div>
                        <div className="song-data">{songData.artist}</div>
                        <div className="song-data">{songData.album}</div>
                        <div className="song-data">{songData.forsale}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SongList;