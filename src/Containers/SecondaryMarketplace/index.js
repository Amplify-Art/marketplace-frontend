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
          <div className="container">
            <div className="placeholder-text no-mt center-text">
            <i className="fa-duotone fa-music"></i>
              No tracks are currently listed.
            </div>
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
