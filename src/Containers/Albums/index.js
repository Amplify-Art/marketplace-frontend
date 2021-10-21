import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import * as nearAPI from 'near-api-js';
import { store } from 'react-notifications-component';
import q from 'querystring';
import { fetchAlbumsAction } from '../../redux/actions/AlbumAction';
import './Albums.scss';
import { addTokenTransferAction } from '../../redux/actions/TokenTransferAction'
import { buyAlbumBundleNFTAction } from '../../redux/actions/NFTAction';
import SingleAlbum from '../../Components/Common/SingleAlbum/index';

const { utils: { format: { parseNearAmount } } } = nearAPI;

function Albums(props) {
  useEffect(() => {
    props.fetchAlbums({
      params: {
        'orderBy': '-id',
        'related': 'songs,user'
      }
    });
  }, [])

  const user = jwt.decode(localStorage.getItem('amplify_app_token'));

  // check for mint transactions from URL
  useEffect(() => {
    let albumBundleInfo = JSON.parse(localStorage.getItem('album_bundle_info'))
    if (props.history.location.search.includes('errorCode')) {
      let message = decodeURIComponent(q.parse(props.history.location.search).errorMessage)
      store.addNotification({
        title: "Error",
        message: message,
        type: "danger",
        insert: "top",
        container: "top-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    } else if (props.history.location.search.includes('transactionHashes')) {
      let txtId = decodeURIComponent(q.parse(props.history.location.search)['?transactionHashes'])
      albumBundleInfo.hash = txtId
      props.buyAlbumBundleNFT(albumBundleInfo)
    }
    localStorage.removeItem('album_bundle_info')
    props.history.push('/albums')
  }, [])

  const onBuy = async (album) => {
    if (user.near_account_type === 'connected') {
      let album_bundle_info = {
        token_id: album.id
      }
      let copy_no = album.qty - album.available_qty + 1

      localStorage.setItem('album_bundle_info', JSON.stringify(album_bundle_info))
      await (props.wallet.account()).functionCall(
        process.env.MARKET_NFT_CONTRACT || 'market.dev-1633963337441-72420501486968',
        'offer_album',
        {
          nft_contract_id: process.env.NFT_CONTRACT || 'nft.dev-1633963337441-72420501486968',
          albumipfs_hash_copy: `${album.cover_cid}:${copy_no}`,
        },
        200000000000000,
        album.yocto_near_price,
      )
    } else {
      props.addTokenTransfer({
        type: 'album',
        "token_id": album.id,
      });
    }

  }
  return (
    <div id="albums" className={`left-nav-pad ${props.playerActive ? 'right-player-pad' : 'normal-right-pad'}`}>
      <div className="container">
        <div className="album-grid">
          {props?.albums && props.albums?.length > 0 && props.albums.map((album, index) => (
            <SingleAlbum key={index} albumInfo={album} onBuy={onBuy} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default connect(state => {
  return {
    albums: state.albums.albums,
    wallet: state.global.wallet
  }
},
  dispatch => {
    return {
      fetchAlbums: (data) => dispatch(fetchAlbumsAction(data)),
      addTokenTransfer: (data) => dispatch(addTokenTransferAction(data)),
      buyAlbumBundleNFT: (data) => dispatch(buyAlbumBundleNFTAction(data))
    }
  })(withRouter(Albums));
