import React, { useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { fetchArtists } from "../../redux/actions/ArtistAction";
import "./Artists.scss";
import defaultProfile from "../../assets/images/default-profile.jpg";
import UserAvatar from "../../Components/Common/UserAvatar/index";

function Artists(props) {
  const { fetchArtists, artists } = props;
  useEffect(() => {
    fetchArtists({
      params: {
        "filter[type]": "artist",
      },
    });
  }, []);
  console.log(artists, "artists");
  return (
    <div id="artists-page" className="left-nav-pad right-player-pad">
      <div className="containerOuter">
        <h2 className="page-title">All Artists</h2>
        <div className="user-block">
          {artists &&
            artists.length &&
            artists.map((artist, index) => (
              <UserAvatar
                avatarImg={artist.avatar || defaultProfile}
                key={index}
                name={artist.name || artist.near_account_id}
                onClick={() =>
                  props.history.push(`/artist/${artist.near_account_id}`)
                }
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default connect(
  (state) => {
    return {
      artists: state.artist.artists,
    };
  },
  (dispatch) => {
    return {
      fetchArtists: (payload) => dispatch(fetchArtists(payload)),
    };
  }
)(withRouter(Artists));
