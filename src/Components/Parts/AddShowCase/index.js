import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchNFTsAction } from '../../../redux/actions/NFTAction';
import { addShowcaseAction } from '../../../redux/actions/ShowcaseAction';
import jwt from 'jsonwebtoken';
import './AddShowCase.scss';
import CDImg from '../../../assets/images/cd-img.svg';

function AddShowCase({ showCaseData, fetchNFTs, nfts, addshowcase, isFetchingNFts, toggleShowCaseModal, isPlayList, addToPlaylist }) {
  const [loading, setLoading] = useState(true);
  const user = jwt.decode(localStorage.getItem('amplify_app_token'));
  console.log(user)
  useEffect(() => {
    console.log('THIS IS CALLED')
    fetchNFTs({
      params: {
        type: isPlayList ? 'song' : undefined
      }
    })
  }, []);
  const onAddingShowcase = (nft) => {
    addshowcase({
      album_id: nft.id
    })
    toggleShowCaseModal()
  }
  const onLoadingImage = (i) => {
    console.log('i', i)
    if (nfts.length - 1 === i) {
      setLoading(false)
    }
  }
  return (
    <div id="addshowcase" >
      <div class="scrollbar" id="style-4">
        {nfts && nfts.length > 0 ? nfts.map((nft, item) => (
          <div className="row">
            <img src={isPlayList && nft.album && nft.album.current_owner !== user.id ? CDImg : `https://hub.textile.io/ipfs/${isPlayList ? nft.album && nft.album.cover_cid : nft.cover_cid}`} onLoad={() => onLoadingImage(item)} className={`cover ${loading && 'hidden'}`} />
            {loading && <Skeleton width={60} height={60} />}
            <div className="row-wrap">
              <div className="row-title">{isPlayList ? nft && nft.title : nft.title}</div>
              <div className="row-desc">{isPlayList ? nft.album && nft.album.description : nft.description}</div>
            </div>
            <button className="add-btn" type="button" onClick={() => isPlayList ? addToPlaylist(nft) : onAddingShowcase(nft)}>Add</button>
          </div>
        ))
          : !isFetchingNFts ?
            <span>No NFts yet!</span>
            :
            <div className="loading-skeleton">
              {[1, 2, 3, 4, 5].map(() => <Skeleton width={`100%`} height={60} />)}
            </div>
        }
      </div>
    </div>
  )
};

export default connect(state => {
  return {
    nfts: state.nfts.nfts,
    isFetchingNFts: state.nfts.loading
  }
}, dispatch => {
  return {
    fetchNFTs: (data) => dispatch(fetchNFTsAction(data)),
    addshowcase: (data) => dispatch(addShowcaseAction(data)),
  }
})(withRouter(AddShowCase));