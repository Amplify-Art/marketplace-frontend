import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useForm } from "react-hook-form";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CurrencyInput from 'react-currency-input-field';
import { addPlaylistAction } from '../../../redux/actions/PlaylistAction';
import { fetchSongsAction } from '../../../redux/actions/SongAction';


import CDImg from '../../../assets/images/cd-img.svg';

import './PurchasedSongs.scss';

function PurchasedSongs(props) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(null);

  const { onSell, showPriceModal, sellingCopy, sellingSong, onListSong, selectedAlbumToken } = props;
  const renderPlayList = () => {
    return props.transfers.filter(f => f.copy_number === selectedAlbumToken.copy_number && !f.bidding_price).map((list, index) => (
      <li><div>Mint #{list.copy_number}</div> <div><button className="remove" onClick={() => onSell(list)}>sell</button></div></li>
    ))
  }

  return (
    <div id="create-playlist">
      <div className="album-info">
        <div className="left">
          <img src={CDImg} />
        </div>
        <div className="right text">
          <span className="large-text">{selectedAlbumToken.album && selectedAlbumToken.album.title}</span>
          <br />
          <span className="small-text">{selectedAlbumToken.album && selectedAlbumToken.album.description}</span>
        </div>
      </div>
      <p>{sellingSong.title}</p>
      {!sellingCopy &&
        <div className="purchase">
          {loading && <Skeleton width={250} height={214} className="case-box" />}
          <ul>
            {renderPlayList()}
          </ul>
        </div>
      }
      {
        sellingCopy &&
        <div>
          <p>Mint #{sellingCopy.copy_number}</p>
          <form onSubmit={(e) => onListSong(e, price)}>
            <CurrencyInput
              name="albumPrice"
              placeholder="Asking Price?"
              // defaultValue={0}
              allowNegativeValue={false}
              prefix="$"
              decimalScale={2}
              decimalsLimit={2}
              onChange={e => setPrice(e.target.value)}
              required
            />
            <button type="submit">List Song</button>
          </form>
        </div>
      }
    </div>
  )
};

export default connect(state => {
  return {
    nfts: state.nfts.nfts,
  }
}, dispatch => {
  return {
    addPlaylist: (data) => dispatch(addPlaylistAction(data)),
    fetchSongs: (data) => dispatch(fetchSongsAction(data))
  }
})(withRouter(PurchasedSongs));