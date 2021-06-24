import React, { useState, useEffect, useRef } from 'react';
import GeneralModal from '../GeneralModal/index.js';
import AlbumModalContent from '../AlbumModalContent/index.js';
import './SingleAlbum.scss';

function SingleAlbum(props) {
  const { albumInfo } = props;

  const [isOpen, SetModalOpen] = useState(false)

  const handleModal = (albumInfo) => {
    console.log('albumInfo', albumInfo)
    SetModalOpen(true)
  }

  const handleCloseModal = () => { SetModalOpen(false) }

  return (
    <>
      <div className="single-album" onClick={(albumInfo) => handleModal(albumInfo)}>
        <div className="cd-case">
          <img src={`https://hub.textile.io/ipfs/${albumInfo.cover_cid}`} alt="" />
          {albumInfo && albumInfo.forSale !== false && (
            <div className="mint-sticker">
              <span>Mint #<br />{albumInfo.qty}/{albumInfo.qty}</span>
            </div>
          )}
        </div>
        <h3 className="album-title">{albumInfo.title}</h3>
        <h4 className="artist-name">{albumInfo.artist}</h4>
      </div>
      <div className="modal-album">
      {isOpen && <GeneralModal isCloseButton="true" bodyChildren={<AlbumModalContent albumInfo={albumInfo}/>} closeModal={handleCloseModal} />}
      </div>
    </>
  );
}

export default SingleAlbum;
