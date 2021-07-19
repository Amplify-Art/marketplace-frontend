import React from 'react';

import sortIcon from '../../../assets/images/Sort.svg';
import playProgress from '../../../assets/images/play_progress.svg';
import playBtn from '../../../assets/images/play_btn.svg';

import './SongList.scss';

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
            <span className="song-title-header">Song Results</span>
            {songHeader()}
            <div>
                {songsList.map((songData,index) => (
                    <div className="play_song flex">
                        <div className="song-data song_maindata flex">
                            <div className="song-icon">
                            <img src={playProgress} alt="" />
                            </div>
                            <label className="song-data song-title">{songData.title} <span>{songData.mint}</span> </label>
                        </div>
                        <div className="song-data">{songData.artist}</div>
                        <div className="song-data">{songData.album}</div>
                        <div className="song-data forsale">{songData.forsale}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SongList;
