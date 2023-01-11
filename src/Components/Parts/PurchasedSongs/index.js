import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CurrencyInput from "react-currency-input-field";
import { addPlaylistAction } from "../../../redux/actions/PlaylistAction";
import { fetchSongsAction } from "../../../redux/actions/SongAction";
import CDImg from "../../../assets/images/cd-img.svg";

import "./PurchasedSongs.scss";

function PurchasedSongs(props) {
  const [loading, ] = useState(false);
  const [price, setPrice] = useState(null);

  const {
    onSell,
    sellingCopy,
    sellingSong,
    onListSong,
    selectedAlbumToken,
  } = props;

  const renderSongs = () => {
    return props.transfers
      .filter(
        (f) => props.ownedTokenCopies.includes(f.copy_number) 
        && !f.is_for_sale
        &&
        // f.transfer_to === props.user.id &&
        f.is_owner
      )
      .map((list, index) => (
        <div className="song">
          <div>Mint #{list.copy_number}</div>{" "}
          <div>
            <button className="sellButton" onClick={() => onSell(list)}>
              Sell
            </button>
          </div>
        </div>
      ));
  };

  return (
    <div id="create-playlist">
      <div className="album-info">
        <div className="sellSongImg">
          <img
            src={
              selectedAlbumToken.cover_cid
                ? `https://gateway.pinata.cloud/ipfs/${selectedAlbumToken?.cover_cid}`
                : CDImg
            }
            alt=""
          />
        </div>
        <div className="sellSongRight">
          <div className="title">
            {selectedAlbumToken.album && selectedAlbumToken.album.title}
          </div>
          <div className="artist-title">
            {selectedAlbumToken.album && selectedAlbumToken.album.description}
          </div>
        </div>
      </div>
      <div className="sellSongTittle">{sellingSong.title}</div>
      {!sellingCopy && (
        <div className="purchase">
          {loading && (
            <Skeleton width={250} height={214} className="case-box" />
          )}
          {renderSongs()}
        </div>
      )}

      {sellingCopy && (
        <>
          <div className="sellSongTittle">Mint #{sellingCopy.copy_number}</div>
          <form className="sellForPrice" onSubmit={(e) => onListSong(e, price)}>
            <CurrencyInput
              name="albumPrice"
              placeholder="Asking Price?"
              // defaultValue={0}
              allowNegativeValue={false}
              prefix="$"
              decimalScale={2}
              decimalsLimit={2}
              onChange={(e) => setPrice(e.target.value)}
              className="currencyInput"
              required
              maxLength={9}
            />
            <button className="sellButton" type="submit">
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default connect(
  (state) => {
    return {
      nfts: state.nfts.nfts,
      wallet: state.global.wallet,
    };
  },
  (dispatch) => {
    return {
      addPlaylist: (data) => dispatch(addPlaylistAction(data)),
      fetchSongs: (data) => dispatch(fetchSongsAction(data)),
    };
  }
)(withRouter(PurchasedSongs));
