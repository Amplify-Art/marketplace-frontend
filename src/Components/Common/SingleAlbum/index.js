import React, { useState, useEffect, useRef } from 'react';
import './SingleAlbum.scss';

function SingleAlbum(props) {
  const { albumInfo } = props;

  return (
    <div className="single-album">
      <div className="cd-case">
        <img src={albumInfo.coverArt} alt="" />
        {albumInfo && albumInfo.forSale !== false && (
          <div className="mint-sticker">
            <span>Mint #<br/>{albumInfo.editionNumber}/{albumInfo.totalAvailable}</span>
          </div>
        )}
      </div>
      <h3 className="album-title">{albumInfo.title}</h3>
      <h4 className="artist-name">{albumInfo.artist}</h4>
    </div>
  );
}

export default SingleAlbum;
