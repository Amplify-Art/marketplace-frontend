import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchArtists } from "../../redux/actions/ArtistAction";
import "./Artists.scss";
import defaultProfile from "../../assets/images/default-profile.svg";
import UserAvatar from "../../Components/Common/UserAvatar/index";
import UserAvatarShimmer from "../../Components/Common/UserAvatar/shimmer";

function Artists(props) {
  const { fetchArtists, artists } = props;
  useEffect(() => {
    fetchArtists({
      params: {
        "filter[type]": "artist",
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div id="artists-page" className="left-nav-pad right-player-pad">
      <div className="containerOuter">
        <h2 className="page-title">All Artists</h2>
        <div className="artists-holder">
          {props.artistsLoading ? (
            [...Array(10)].map((_, index) => (
              <UserAvatarShimmer key={index} />
            ))
          ) : (
            artists &&
            (artists.length ?
              (artists.map((artist, index) => (
                <UserAvatar
                  avatarImg={artist.avatar || defaultProfile}
                  key={index}
                  name={artist.name || artist.near_account_id}
                  onClick={() =>
                    props.history.push(`/artist/${artist.near_account_id}`)
                  }
                />
              ))) : (
                <h4 className="placeholder-text center-text">No Artists to Display</h4>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default connect(
  (state) => {
    return {
      artists: state.artist.artists,
      artistsLoading: state.artist.loading,
    };
  },
  (dispatch) => {
    return {
      fetchArtists: (payload) => dispatch(fetchArtists(payload)),
    };
  }
)(withRouter(Artists));
