import React, { useState, useEffect, useRef } from 'react';
import GeneralModal from '../GeneralModal/index.js';
import AlbumModalContent from '../AlbumModalContent/index.js';
import './SingleAlbum.scss';
import cdCover from '../../../assets/images/cd-img.svg';

function SingleAlbum(props) {
  const { albumInfo, isMint = true} = props;

  const [isOpen, SetModalOpen] = useState(false)


  const handleModal = () => { SetModalOpen(true) }

  const handleCloseModal = () => { SetModalOpen(false) }

  return (
    <>
      <div className="single-album" onClick={handleModal}>
        <div className="cd-case">
          {/* {albumInfo.coverArt ? (
            <img src={albumInfo.coverArt} alt="" />
          ) :(
            <img src={`https://hub.textile.io/ipfs/${albumInfo.cover_cid}`} alt="" />
          )} */}
          {albumInfo.user_id === null ? (
            <img src={cdCover} alt="cover image" />
          ) :(
            <img src={`https://hub.textile.io/ipfs/${albumInfo.cover_cid}`} alt="cover image" />
          )}
          {console.log("mit--->",isMint)}
          {isMint && albumInfo && albumInfo.forSale !== false && (
            <div className="mint-sticker">
              <span>Mint #<br />{albumInfo.qty}/{albumInfo.qty}</span>
            </div>
          )}
        </div>
        <h3 className="album-title">{albumInfo.title}</h3>
        <h4 className="artist-name">{albumInfo.artist}</h4>
        {albumInfo.own && <h5 className="album-own">Your Own: #{albumInfo.own}</h5>}
      </div>
      
        {isOpen && <div className="modal-album"><GeneralModal isCloseButton="true" bodyChildren={<AlbumModalContent albumInfo={albumInfo} />} closeModal={handleCloseModal} /></div>}
      
    </>
  );
}

export default SingleAlbum;
