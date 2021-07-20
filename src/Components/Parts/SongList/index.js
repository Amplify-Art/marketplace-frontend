import React from 'react';

import sortIcon from '../../../assets/images/Sort.svg';
import playProgress from '../../../assets/images/play_progress.svg';
import playBtn from '../../../assets/images/play_btn.svg';
import SongLength from '../../Common/SongLength/index';

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

function SongList(props) {
    const {songList} = props

    const handleAudio =(id) => {
        console.log("id----->",id)
    }
    return (
        <div className="song-list">
            <span className="song-title-header">Song Results</span>
            {songHeader()}
            <div>
                {songList && songList.map((songData,index) => (
                    <div className="play-song flex">
                        <div className="flex">
                            <div className="song-icon cursor-pointer">
                                <img src={playProgress} alt="" onClick={(id) => handleAudio(songData.song_cid)} />
                            </div>
                            <label className="song-title">
                                {songData.title} <span>{songData.mint || "#4"}</span> 
                            </label>
                        </div>
                        <div>{songData.artist || 'Blood is Rebel'}</div>
                        <div>{songData.album || 'Oh The Larceny'}</div>
                        <div>{songData.forsale || '14/100 Available'}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SongList;
