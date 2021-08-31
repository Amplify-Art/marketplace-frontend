import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchNFTsAction } from '../../../redux/actions/NFTAction';
import { addShowcaseAction, updateShowcaseAction } from '../../../redux/actions/ShowcaseAction';
import jwt from 'jsonwebtoken';
import './AddShowCase.scss';
import CDImg from '../../../assets/images/cd-img.svg';

function AddShowCase({ showCaseData, songs, fetchNFTs, nfts, selectedSongs, addShowcase, isFetchingNFts, toggleShowCaseModal, isPlayList, addToPlaylist, updateShowcase, setFetchShowCases, fetchShowCases }) {
  const [loading, setLoading] = useState(true);
  const user = jwt.decode(localStorage.getItem('amplify_app_token'));

  useEffect(() => {
    fetchNFTs({
      params: {
        type: isPlayList ? 'song' : 'album',
        showcase: true
      }
    })
  }, []);

  const onAddingShowcase = async (nft) => {
    let wasFound = nft.currentOwner.showcases.find(f => f.user_id === user.id && nft.id === f.album_id)
    if (wasFound) {
      updateShowcase({
        album_id: null,
        user_id: null,
        is_deleted: true,
        id: wasFound.id
      })
      setFetchShowCases(!fetchShowCases)
    } else {
      addShowcase({
        album_id: nft.id
      })
      setFetchShowCases(!fetchShowCases)
    }
    toggleShowCaseModal()
  }
  let data = []
  const mappedSelectedIds = (selectedSongs || []).map(s => s.id)
  if (isPlayList) {
    data = songs.filter(f => !mappedSelectedIds.includes(f.id))
  } else {
    data = nfts
  }
  const onLoadingImage = (i) => {
    console.log(data.length, i)
    if (data.length - 1 === i) {
      setLoading(false)
    }
  }
  console.log(data, 'data')

  return (
    <div id="addshowcase">
      <div class="scrollbar" id="style-4">
        {data && data.length > 0 ? data.map((nft, item) => (
          <div className="row">
            <div className="playlist-cover-holder">
              <img src={isPlayList && nft.album && nft.album.current_owner !== user.id ? CDImg : `https://amplify-dev.mypinata.cloud/ipfs/${isPlayList ? nft.album && nft.album.cover_cid : nft.cover_cid}`} onLoad={() => onLoadingImage(item)} className={`cover ${loading && 'hidden'}`} onError />
              {loading && <Skeleton width={60} height={60} />}
            </div>
            <div className="row-wrap">
              <div className="row-title">{isPlayList ? nft && nft.title : nft.title}</div>
              <div className="row-desc">{isPlayList ? nft.album && nft.album.description && nft.album.description.substring(0, 50) : nft.description && nft.description.substring(0, 50)}...</div>
            </div>
            {/* Button for playlist  */}
            {isPlayList && <button className="add-btn" type="button" onClick={() => addToPlaylist(nft)}>{selectedSongs.map(i => i.id).includes(nft.id) ? 'Remove' : 'Add'}</button>}
            {/* button for showcase */}
            {!isPlayList && <button className="add-btn" type="button" onClick={() => onAddingShowcase(nft)}>{nft.currentOwner && nft.currentOwner.showcases?.find(f => f.user_id === user.id && nft.id === f.album_id) ? 'Remove' : 'Add'}</button>}
          </div>
        ))
          : songs.length ?
            <></>
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
    songs: state.songs.songs,
    isFetchingNFts: state.nfts.loading || state.songs.loading
  }
}, dispatch => {
  return {
    fetchNFTs: (data) => dispatch(fetchNFTsAction(data)),
    addShowcase: (data) => dispatch(addShowcaseAction(data)),
    updateShowcase: (data) => dispatch(updateShowcaseAction(data)),
  }
})(withRouter(AddShowCase));