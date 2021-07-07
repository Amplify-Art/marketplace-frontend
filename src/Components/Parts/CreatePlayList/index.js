import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { store } from 'react-notifications-component';
import { useForm } from "react-hook-form";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AddShowCase from '../AddShowCase';
import { addPlaylistAction } from '../../../redux/actions/PlaylistAction';
import { fetchSongsAction } from '../../../redux/actions/SongAction';


import CDImg from '../../../assets/images/cd-img.svg';

import './CreatePlayList.scss';

function CreatePlayList(props) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [loading, setLoading] = useState(false);
  const [hasSelectedSongs, setHasSelectedSongs] = useState(true);
  const [selectedSongs, setSelectedSongs] = useState([]);

  const { showCaseData, addPlaylist, togglePlayListModal } = props;
  console.log('selectedSongs',selectedSongs)
  const renderPlayList = () => {
    return selectedSongs.map((list, index) => (
      <div>{`${index + 1}. ${list.title}`} <button className="remove" onClick={() => removeSelectedSongs(index)}>remove</button></div>
    ))
  }

  const removeSelectedSongs = (i) => {
    setSelectedSongs(selectedSongs.filter((f, index) => index !== i))
  }

  const onSubmit = (data) => {
    if (!selectedSongs.length) {
      setHasSelectedSongs(false);
      return
    }
    addPlaylist({
      title: data.playlistName,
      songs: selectedSongs.map(i => i.id)
    })
    togglePlayListModal()
  };

  const addToPlaylist = (song) => {
    setHasSelectedSongs(true)
    setSelectedSongs(
      [...selectedSongs, song]
    )
  }

  const showMessage = () => {
    store.addNotification({
      title: "Success",
      message: "Playlist has been created successfully",
      type: "success",
      insert: "top",
      container: "top-left",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
          duration: 2000,
          onScreen: true
      }
    });
  }

  useEffect(() => {
    props.fetchSongs();
  }, []);
  return (
    <div id="create-playlist">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="playlist-wrapper">
          <div className="playlist-showcase">
            <div className="input-holder">
              <input name="playlist-name" type="text" placeholder="Playlist Name" {...register("playlistName", { required: 'This is required' })} />
              {errors && errors.playlistName && <span className="">{errors.playlistName.message}</span>}
            </div>
            <AddShowCase showCaseData={showCaseData} isPlayList addToPlaylist={addToPlaylist} {...{selectedSongs}} />
          </div>
          <div className="playlist-CD">
            {loading && <Skeleton width={250} height={214} className="case-box" />}
            <div className={`case-box case-wrapper ${loading && 'hidden'}`}>
              <img src={CDImg} alt="" />
            </div>

            <ul>
              {renderPlayList()}
            </ul>
          </div>
        </div>
        {console.log('songs',props.songs)}
        {console.log('nfts',props.nfts)}
        {!hasSelectedSongs && <span>Alteast one song should be added to playlist!</span>}
        <div className="btn-wrabtn-wrapp input-holder">
          <input type="submit" value="Create PlayList" disabled={isSubmitting} />
        </div>
      </form>
    </div>
  )
};

export default connect(state => {
  return {
    nfts: state.nfts.nfts,
    songs: state.songs.songs
  }
}, dispatch => {
  return {
    addPlaylist: (data) => dispatch(addPlaylistAction(data)),
    fetchSongs: () => dispatch(fetchSongsAction())
  }
})(withRouter(CreatePlayList));