import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AddShowCase from "../AddShowCase";
import { addPlaylistAction } from "../../../redux/actions/PlaylistAction";
import { fetchSongsAction } from "../../../redux/actions/SongAction";
import { getTokens } from "../../../Utils/near";
import CDImg from "../../../assets/images/cd-img.svg";

import "./CreatePlayList.scss";

function CreatePlayList(props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [hasSelectedSongs, setHasSelectedSongs] = useState(true);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [songTokens, setSongTokens] = useState([]);

  const { showCaseData, addPlaylist, togglePlayListModal } = props;
  const renderPlayList = () => {
    return selectedSongs.length ? (
      selectedSongs.map((list, index) => (
        <div>
          <span style={{ width: "55%" }}>
            {`${index + 1}. ${
              list.title === ""
                ? list?.album && list.album.description
                : list.title
            }`}
          </span>
          <span>
            <button
              className="remove"
              onClick={() => removeSelectedSongs(index)}
            >
              remove
            </button>
          </span>
        </div>
      ))
    ) : (
      <h4 className="no-songs-added">You have not added any songs yet!</h4>
    );
  };

  const removeSelectedSongs = (i) => {
    setSelectedSongs(selectedSongs.filter((f, index) => index !== i));
  };

  const onSubmit = (data) => {
    if (!selectedSongs.length) {
      setHasSelectedSongs(false);
      return;
    }
    addPlaylist({
      title: data.playlistName,
      songs: selectedSongs.map((i) => i.id),
    });
    togglePlayListModal();
  };

  const addToPlaylist = (song) => {
    setHasSelectedSongs(true);
    if (!selectedSongs.map((i) => i.id).includes(song.id))
      setSelectedSongs([...selectedSongs, song]);
  };

  useEffect(() => {
    props.fetchSongs({
      params: {
        related: "album",
        perPage: 1000,
      },
    });
  }, []);

  useEffect(() => {
    getNFTs();
  }, []);

  const getNFTs = async () => {
    let tokens = await getTokens(props.wallet);
    let songtokens = tokens.map((t) => t.token_id.split(":")[2]);
    setSongTokens(songtokens);
  };
  let userOwnedSongs = props.songs.filter((f) =>
    songTokens.includes(f.song_cid)
  );
  return (
    <div id="create-playlist">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="playlist-wrapper">
          <div className="playlist-showcase">
            <div className="input-holder">
              <input
                name="playlist-name"
                type="text"
                placeholder="Playlist Name"
                {...register("playlistName", { required: "This is required" })}
                className={errors?.playlistName && "error"}
              />
              {errors && errors.playlistName && (
                <span className="">{errors.playlistName.message}</span>
              )}
            </div>
            <AddShowCase
              showCaseData={showCaseData}
              isPlayList
              addToPlaylist={addToPlaylist}
              {...{ selectedSongs }}
              songs={userOwnedSongs}
            />
          </div>
          <div className="playlist-CD">
            {loading && (
              <Skeleton width={250} height={214} className="case-box" />
            )}
            <div className={`case-box case-wrapper ${loading && "hidden"}`}>
              <img src={CDImg} alt="" />
            </div>

            <ul>{renderPlayList()}</ul>
          </div>
        </div>
        {!hasSelectedSongs && (
          <span>At least one song should be added to playlist!</span>
        )}
        <div className="btn-wrabtn-wrapp input-holder">
          <input
            type="submit"
            value="Create Playlist"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}

export default connect(
  (state) => {
    return {
      nfts: state.nfts.nfts,
      songs: state.songs.songs,
      wallet: state.global.wallet,
    };
  },
  (dispatch) => {
    return {
      addPlaylist: (data) => dispatch(addPlaylistAction(data)),
      fetchSongs: (data) => dispatch(fetchSongsAction(data)),
    };
  }
)(withRouter(CreatePlayList));
