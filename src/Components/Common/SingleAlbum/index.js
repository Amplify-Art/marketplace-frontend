import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GeneralModal from '../GeneralModal/index.js';
import AlbumModalContent from '../AlbumModalContent/index.js';
import SingleAlbumModal from '../SingleAlbumModal/index.js';
import { setIsAlbumSelected, storeSelectedAlbum } from '../../../redux/actions/SearchResAction.js';
import { hidePurchaseModalAction } from '../../../redux/actions/GlobalAction';
import './SingleAlbum.scss';
import cdCover from '../../../assets/images/cd-img.svg';
import ConfettiImage from '../../../assets/images/confetti.png';

function SingleAlbum(props) {
  const { albumInfo, isMint = true, isPlayList = false, children, history, hidePurchaseModal, showPurchaseModal } = props;
  const [isOpen, SetModalOpen] = useState(false);
  const [height, setHeight] = useState('');
  const [albumCover, setAlbumCover] = useState(cdCover);
  const [showSticker, setShowSticker] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  const dispatch = useDispatch();

  const getHeight = () => {
    let width = '300';
    const box = document.querySelector('.art-cover');
    if (box) {
      width = box.clientWidth;
    }

    setHeight(width);
  }


  const handleModal = () => { SetModalOpen(true) }

  const handleCloseModal = () => {
    SetModalOpen(false)
    setViewDetails(false)
    dispatch(setIsAlbumSelected({ isAlbumSelected: false }));
    dispatch(storeSelectedAlbum({ albumData: {} }));
  }

  const checkImage = (url) => {
    console.log('CALL2')
    // Trying to check if image exists here. If it doesn't, we should show some backup image.
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onload = function () {
      const theStatus = request.status;
      if (request.status == 200) //if(statusText == OK)
      {
        console.log("image exists");
      } else {
        console.log("image doesn't exist");
      }
    }
  }

  const onClose = () => {
    hidePurchaseModal();
    history.push('/')
  }

  const handleBuy = (albumInfo) => {
    props.onBuy(albumInfo)
    SetModalOpen(false);
  }

  useEffect(() => {
    let width;
    const box = document.querySelector('.art-cover');
    if (!height) {
      if (box) {
        width = box.clientWidth;
        setHeight(width);
      }
    }

    const resizeListener = () => {
      // change width from the state object
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

  // checkImage(`https://amplify-dev.mypinata.cloud/ipfs/${albumInfo.cover_cid}`);

  useEffect(() => {
    // if this is rendered for playlist, we dont have cover for playlist, show CD cover

    if (isPlayList) {
      setAlbumCover(cdCover);
    }
    else if (albumInfo.cover_cid) {
      setAlbumCover(`https://amplify-dev.mypinata.cloud/ipfs/${albumInfo.cover_cid}`);
    } else if (albumInfo && albumInfo.token && albumInfo.token.album && albumInfo.token.album.cover_cid) {
      setAlbumCover(`https://amplify-dev.mypinata.cloud/ipfs/${albumInfo.token.album.cover_cid}`);
    } else {
      setAlbumCover(cdCover);
    }
    if (props.albumInfo.hideSticker) {
      setShowSticker(false);
    } else
      if (albumInfo && albumInfo.token && albumInfo.token.is_owner) {
        setShowSticker(false);
      } else if (isMint && albumInfo && albumInfo.forSale !== false) {
        setShowSticker(true);
      }
  }, [albumInfo]);

  return (
    <>
      <div className="single-album" onClick={props.onClick ? props.onClick : handleModal}>
        <div className="cd-case" style={{ height: `${height}px` }}>
          <div className="art-cover">
            <img src={albumCover} alt="cover image" />
          </div>
          {showSticker && (
            <div className={`mint-sticker ${albumInfo.available_qty === 0 ? 'sold' : 'available'}`}>
              {/* In my profile, show the copy you own, in other UI, show the available qty to mint */}
              <span>Mint #<br />{albumInfo.copy_number || (albumInfo.available_qty === 0 ? albumInfo.available_qty : (albumInfo.qty - albumInfo.available_qty) + 1)}/{albumInfo.qty}</span>
            </div>
          )}
        </div>
        {
          children ? children : (
            <>
              <div className={`the-title ${isPlayList && 'playlist-title'}`}><h3 className="album-title">{albumInfo.title}</h3></div>
              <h4 className="artist-name">{albumInfo.user && albumInfo.user.name}</h4>
              {albumInfo.own && <h5 className="album-own">Your Own: #{albumInfo.own}</h5>}
            </>
          )
        }
      </div>
      <div className={`modal-album ${!props.isAlbumSelected ? 'd-none' : 'd-block'}`}>
        <GeneralModal
          isCloseButton="true"
          bodyChildren={
            <SingleAlbumModal
              isOpen={props.isAlbumSelected}
              albumData={props.selectedAlbum}
            />}
          closeModal={handleCloseModal}
        />
      </div>
      {showPurchaseModal && <GeneralModal
        topIcon={ConfettiImage}
        headline="Thank You For Your Purchase!"
        buttons={[
          {
            type: 'solid go-home',
            text: 'Go Home',
            onClick: () => onClose()
          }
        ]}
        className="centered"
      />}
      <div className={`modal-album ${!isOpen ? 'd-none' : 'd-block'}`}><GeneralModal isCloseButton="true" bodyChildren={<AlbumModalContent albumInfo={albumInfo.hasOwnProperty('copy_number') ? albumInfo.token.album : albumInfo} isOpen={isOpen} isPlayList={isPlayList} onBuy={handleBuy} viewDetails={viewDetails} setViewDetails={setViewDetails} onSingleSongClick={props.onSingleSongClick} token={albumInfo.token} />} closeModal={handleCloseModal} /></div>
    </>
  );
}

export default connect(state => {
  return {
    isAlbumSelected: state.searchRes?.isAlbumSelected || false,
    selectedAlbum: state.searchRes?.selectedAlbum || {},
    showPurchaseModal: state.global && state.global.showPurchaseModal
  }
}, dispatch => {
  return {
    hidePurchaseModal: () => dispatch(hidePurchaseModalAction())
  }
})(withRouter(SingleAlbum));
