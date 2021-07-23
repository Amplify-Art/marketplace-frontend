import React, { useState, useEffect, useRef } from 'react';
import GeneralModal from '../GeneralModal/index.js';
import AlbumModalContent from '../AlbumModalContent/index.js';
import './SingleAlbum.scss';
import cdCover from '../../../assets/images/cd-img.svg';

function SingleAlbum(props) {
  const { albumInfo, isMint = true, isPlayList = false, children } = props;

  const [isOpen, SetModalOpen] = useState(false);
  const [height, setHeight] = useState('');

  const getHeight = () => {
    let width = '300';
    const box = document.querySelector('.art-cover');
    if (box) {
      width = box.clientWidth;
    }
  
    setHeight(width);
  }


  const handleModal = () => { SetModalOpen(true) }

  const handleCloseModal = () => { SetModalOpen(false) }

  useEffect(() => {
    let width;
    const box = document.querySelector('.art-cover');
    if (!height) {
      if (box) {
        width = box.clientWidth;
        setHeight(width);
        console.log('width', width)
      }
    }

    const resizeListener = () => {
      // change width from the state object
      console.log('Fire')
      getHeight();
    };
    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    }
  }, []);

  return (
    <>
      <div className="single-album" onClick={handleModal}>
        <div className="cd-case" style={{ height: `${height}px`}}>
          <div className="art-cover">
            {albumInfo.coverArt ? (
              <img src={albumInfo.coverArt} alt="" />
            ) : (
              albumInfo.cover_cid ?
                <img src={`https://gateway.pinata.cloud/ipfs/${albumInfo.cover_cid}` || cdCover} alt="" />
                :
                <img src={cdCover} alt="cover image" />
            )}
          </div>
          {isMint && albumInfo && albumInfo.forSale !== false && (
            <div className="mint-sticker">
              {/* In my profile, show the copy you own, in other UI, show the available qty to mint */}
              <span>Mint #<br />{albumInfo.copy_number || albumInfo.available_qty}/{albumInfo.qty}</span>
            </div>
          )}
        </div>
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
