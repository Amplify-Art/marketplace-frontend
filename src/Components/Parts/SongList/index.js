
import React, { useEffect, useState } from 'react';
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
    const { songList } = props;
    const [playing, setPlaying] = useState(false);
    const [audio, setAudioSong] = useState(new Audio(''));
    const [currentIndex, setCurrentIndex] = useState(-1)
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
                {songList && songList?.map((songData,index) => (
                    <div className="play-song flex">
                        <div className="flex">
                            <div className="song-icon cursor-pointer">
                                <img src={playing && currentIndex === songData.song_cid ? playProgress : playBtn} alt="" onClick={(id) => handleAudio(songData.song_cid)} />
                                {/* <div className="audio-time"><SongLength i={index} song={`https://amplify-dev.mypinata.cloud/ipfs/${songData.song_cid}`} /></div> */}
                            </div>
                            <label className="song-title">
                                {songData.title} <span>{songData.mint || "#4"}</span>
                            </label>
                        </div>
                        <div>{songData.artist && songData.artist.name}</div>
                        <div>{songData.album && songData.album.title}</div>
                        <div>{songData.available_qty} / {songData.qty} {' '} Available</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default SongList;