import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchNFTsAction } from '../../../redux/actions/NFTAction';
import { addShowcaseAction, updateShowcaseAction } from '../../../redux/actions/ShowcaseAction';
import jwt from 'jsonwebtoken';
import './AddShowCase.scss';
import CDImg from '../../../assets/images/cd-img.svg';

function AddShowCase({ showCaseData, fetchNFTs, nfts, selectedSongs, addshowcase, isFetchingNFts, toggleShowCaseModal, isPlayList, addToPlaylist, updateShowcase,setFetchShowCases,fetchShowCases }) {
  const [loading, setLoading] = useState(true);
  const user = jwt.decode(localStorage.getItem('amplify_app_token'));
  const [addnfts, setAddNfts] = useState([])
  useEffect(() => {
    let song = [...nfts]
    let ss = [...(selectedSongs || [])].map(item => {
      return item.id
    })
    const result = song.filter(item => !ss.includes(item.id))
    setAddNfts(result)
  }, [selectedSongs])
  useEffect(() => {
    fetchNFTs({
      params: {
        type: isPlayList ? 'song' : 'album',
        showcase: true
      }
    })
  }, []);

  useEffect(() => {
    setAddNfts(nfts)  
  }, [nfts])

  const onAddingShowcase = async(nft) => {
    let wasFound = nft.currentOwner.showcases.find(f => f.user_id === user.id && nft.id === f.album_id)
    if (wasFound) {
      await updateShowcase({
        album_id: null,
        user_id: null,
        is_deleted: true,
        id: wasFound.id
      })
      setFetchShowCases(!fetchShowCases)
    } else {
      await addshowcase({
        album_id: nft.id
      })
      setFetchShowCases(!fetchShowCases)
    }
    toggleShowCaseModal()
  }
  const onLoadingImage = (i) => {
    if (nfts.length - 1 === i) {
      setLoading(false)
    }
  }
  return (
    <div id="addshowcase">
      <div class="scrollbar" id="style-4">
        {addnfts && addnfts.length > 0 ? addnfts.map((nft, item) => (
          <div className="row">
            <div className="playlist-cover-holder">
              <img src={isPlayList && nft.album && nft.album.current_owner !== user.id ? CDImg : `https://gateway.pinata.cloud/ipfs/${isPlayList ? nft.album && nft.album.cover_cid : nft.cover_cid}`} onLoad={() => onLoadingImage(item)} className={`cover ${loading && 'hidden'}`} />
            </div>
            {loading && <Skeleton width={60} height={60} />}
            <div className="row-wrap">
              <div className="row-title">{isPlayList ? nft && nft.title : nft.title}</div>
              <div className="row-desc">{isPlayList ? nft.album && nft.album.description : nft.description}</div>
            </div>
            <button className="add-btn" type="button" onClick={() => isPlayList ? addToPlaylist(nft) : onAddingShowcase(nft)}>{nft.currentOwner && nft.currentOwner.showcases?.find(f => f.user_id === user.id && nft.id === f.album_id) ? 'Remove' : 'Add'}</button>
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
    updateShowcase: (data) => dispatch(updateShowcaseAction(data)),
  }
})(withRouter(AddShowCase));