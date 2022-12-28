import React, { useState } from "react";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import './playerNew.scss'

function PlayerNew() {
  const [playIndex, setPlayIndex] = useState(0);
  const [audio, setAudio] = useState(null);
  const audioList = [
    {
      name: "Despacito",
      singer: "Luis Fonsi",
      cover:
        "http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg",
      musicSrc:
        "http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3"
    },
    {
      name: "Bedtime Stories",
      singer: "Jay Chou",
      cover:
        "http://res.cloudinary.com/alick/image/upload/v1502375978/bedtime_stories_bywggz.jpg",
      musicSrc:
        "http://res.cloudinary.com/alick/video/upload/v1502375674/Bedtime_Stories.mp3"
    },
    {
      name: "Dorost Nemisham",
      singer: "Sirvan Khosravi",
      cover:
        "https://res.cloudinary.com/ehsanahmadi/image/upload/v1573758778/Sirvan-Khosravi-Dorost-Nemisham_glicks.jpg",
      musicSrc:
        "https://res.cloudinary.com/ehsanahmadi/video/upload/v1573550770/Sirvan-Khosravi-Dorost-Nemisham-128_kb8urq.mp3"
    }
  ];  
  return (
    <div>
      <ReactJkMusicPlayer
        playIndex={playIndex}
        audioLists={audioList}
        getAudioInstance={(audio) => {
          setAudio(audio);
        }}
        autoPlay={false}
        onPlayIndexChange={(playIndex) => {
          setPlayIndex(playIndex);
        }}
        defaultPosition={{
          right: "20px",
          bottom: "20px"
        }}
        mode="full"
        showPlay={true}
        showDownload={false}
      />      
    </div>
  )
}

export default PlayerNew