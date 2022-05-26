import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./SecondaryMarketplace.scss";
import { fetchMarketplaceSongsAction } from "../../redux/actions/MarketplaceSongAction";
import jwt from "jsonwebtoken";
import SongList from "../../Components/Parts/SongList";

function SecondaryMarketplace(props) {
  const songs = [];
  useEffect(() => {
    props.fetchMarketplaceSongs({});
  }, []);

  let user = jwt.decode(localStorage.getItem("amplify_app_token"));

  return (
    <div id="secondary-marketplace" className="left-nav-pad right-player-pad">
      <div className="container">
        {props.songs && props.songs.length > 0 ? (
          <SongList
            songList={props.songs.filter((f) => f.user_id !== user?.id)}
          />
        ) : (
          <div>
            <h4 className="large-white center-text">
              No songs are currently for sale
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
