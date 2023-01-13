import React from "react";
import CdImage from "../../../../../assets/images/cd-img.svg";

function AlbumInfo({ currentPlaylists, playlistIndex, songIndex }) {
  return (
    <div className="album-info large">
      <div className="cover">
        {/* If album is owned, show cover here, else use blank CD */}
        {/* <img src={currentPlaylists[songIndex]?.album && currentPlaylists[songIndex].album?.current_owner === user.id ? `https://gateway.pinata.cloud/ipfs/${currentPlaylists[songIndex]?.album.cover_cid}` : DefaultCover} alt="Cover" /> */}
        {!(
          currentPlaylists[playlistIndex]?.songs?.[songIndex]?.album ||
          currentPlaylists[playlistIndex]?.cover_cid
        ) ? (
          <img src={CdImage} alt="Cover" />
        ) : (
          <img
            src={`https://gateway.pinata.cloud/ipfs/${
              currentPlaylists[playlistIndex]?.songs?.[songIndex]?.album
                ?.cover_cid || currentPlaylists[playlistIndex]?.cover_cid
            }`}
            alt="Cover"
          />
        )}
      </div>
      <div className="details">
          <h5 className="album-title">
            {currentPlaylists[playlistIndex]?.songs?.[songIndex]?.title}
          </h5>
      </div>
    </div>
  );
}

export default AlbumInfo;
