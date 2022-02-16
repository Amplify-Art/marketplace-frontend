import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CurrencyInput from "react-currency-input-field";
import { addPlaylistAction } from "../../../redux/actions/PlaylistAction";
import { fetchSongsAction } from "../../../redux/actions/SongAction";
import { getTokens } from "../../../Utils/near";

import CDImg from "../../../assets/images/cd-img.svg";

import "./PurchasedSongs.scss";

function PurchasedSongs(props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(null);
  const [ownedTokenCopies, setOwnedTokenCopies] = useState([]);

  const {
    onSell,
    showPriceModal,
    sellingCopy,
    sellingSong,
    onListSong,
    selectedAlbumToken,
  } = props;

  useEffect(() => {
    fetchTokens();
  }, []);
  const fetchTokens = async () => {
    let tokens = await getTokens(props.wallet);
    console.log(tokens, "tokens");
    console.log(
      tokens,
      "tokens",
      sellingSong.song_cid,
      tokens
        .filter((t) => t.token_id.split(":")[2] === sellingSong.song_cid)
        .map((t) => parseInt(t.token_id.split(":")[1]))
    );
    setOwnedTokenCopies(
      tokens
        .filter((t) => t.token_id.split(":")[2] === sellingSong.song_cid)
        .map((t) => parseInt(t.token_id.split(":")[1]))
    );
  };
  const renderSongs = () => {
    console.log(ownedTokenCopies, "ownedTokens");
    return props.transfers
      .filter((f) =>
        // f.copy_number === selectedAlbumToken.copy_number && !f.bidding_price
        ownedTokenCopies.includes(f.copy_number)
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
          <img src={CDImg} />
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
