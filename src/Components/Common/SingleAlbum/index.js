import React, { useState, useEffect, useRef } from 'react';
import './SingleAlbum.scss';

function SingleAlbum(props) {
  const { albumInfo } = props;

  return (
    <div className="single-album">
      <div className="cd-case">
        <img src={`https://hub.textile.io/ipfs/${albumInfo.cover_cid}`} alt="" />
        {albumInfo && albumInfo.forSale !== false && (
          <div className="mint-sticker">
            <span>Mint #<br/>{albumInfo.qty}/{albumInfo.qty}</span>
          </div>
        )}
      </div>
      <h3 className="album-title">{albumInfo.title}</h3>
      <h4 className="artist-name">{albumInfo.artist}</h4>
    </div>
  );
}

export default SingleAlbum;
