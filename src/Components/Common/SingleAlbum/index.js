import React, { useState, useEffect, useRef } from 'react';
import GeneralModal from '../GeneralModal/index.js';
import AlbumModalContent from '../AlbumModalContent/index.js';
import './SingleAlbum.scss';
import cdCover from '../../../assets/images/cd-img.svg';

function SingleAlbum(props) {
  const { albumInfo, isMint = true, isPlayList = false, children } = props;

  const [isOpen, SetModalOpen] = useState(false)


  const handleModal = () => { SetModalOpen(true) }

  const handleCloseModal = () => { SetModalOpen(false) }
  return (
    <>
      <div className="single-album" onClick={handleModal}>
        <div className="cd-case">
          {albumInfo.coverArt ? (
            <img src={albumInfo.coverArt} alt="" />
          ) : (
            albumInfo.cover_cid ?
              <img src={`https://gateway.pinata.cloud/ipfs/${albumInfo.cover_cid}` || cdCover} alt="" />
              :
              <img src={cdCover} alt="cover image" />
          )}
          {isMint && albumInfo && albumInfo.forSale !== false && (
            <div className="mint-sticker">
              {/* In my profile, show the copy you own, in other UI, show the available qty to mint */}
              <span>Mint #<br />{albumInfo.copy_number || albumInfo.available_qty}/{albumInfo.qty}</span>
            </div>
          )}
        </div>
        {console.log("child----->", children)}
        {
          children ? children : (
            <>
              <h3 className="album-title">{albumInfo.title}</h3>
              <h4 className="artist-name">{albumInfo.artist}</h4>
              {albumInfo.own && <h5 className="album-own">Your Own: #{albumInfo.own}</h5>}
            </>
          )
        }
      </div>
      <div className={`modal-album ${!isOpen ? 'd-none' : 'd-block'}`}><GeneralModal isCloseButton="true" bodyChildren={<AlbumModalContent albumInfo={albumInfo} isOpen={isOpen} isPlayList={isPlayList} onBuy={props.onBuy} />} closeModal={handleCloseModal} /></div>
    </>
  );
}

export default SingleAlbum;
