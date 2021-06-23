import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchNFTsAction } from '../../../redux/actions/NFTAction';
import { addShowcaseAction } from '../../../redux/actions/ShowcaseAction';
import './AddShowCase.scss';

function AddShowCase({ showCaseData, fetchNFTs, nfts, addshowcase, isFetchingNFts, toggleShowCaseModal }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNFTs()
  }, []);
  const onAddingShowcase = (nft) => {
    addshowcase({
      album_id: nft.id
    })
    toggleShowCaseModal()
  }
  return (
    <div id="addshowcase" >
      <div class="scrollbar" id="style-4">
        {nfts && nfts.length > 0 ? nfts.map((nft, item) => (
          <div className="row">
            <img src={nft.image} className={`${loading && 'hidden'}`} />
            {loading && <Skeleton width={60} height={60} />}
            <div className="row-wrap">
              <div className="row-title">{nft.title}</div>
              <div className="row-desc">{nft.description}</div>
            </div>
            <button className="add-btn" onClick={() => onAddingShowcase(nft)}>Add</button>
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