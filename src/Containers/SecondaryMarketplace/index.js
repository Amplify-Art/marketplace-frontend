import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./SecondaryMarketplace.scss";
import { fetchMarketplaceSongsAction } from "../../redux/actions/MarketplaceSongAction";

import SongList from "../../Components/Parts/SongList";

function SecondaryMarketplace(props) {
  const songs = [];
  useEffect(() => {
    props.fetchMarketplaceSongs({});
  }, []);
  return (
    <div id="secondary-marketplace" className="left-nav-pad mw-1200">
      <div className="">
        {props.songs && props.songs.length > 0 ? (
          <SongList songList={props.songs} />
        ) : (
          <div>
            <h4 className="placeholder-text center-text">
              There are no songs currently listed.
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default connect(
  (state) => {
    return {
      songs: state.marketplace_songs.marketplacesongs,
    };
  },
  (dispatch) => {
    return {
      fetchMarketplaceSongs: (data) =>
        dispatch(fetchMarketplaceSongsAction(data)),
    };
  }
)(withRouter(SecondaryMarketplace));
