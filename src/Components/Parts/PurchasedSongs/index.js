import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useForm } from "react-hook-form";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPlaylistAction } from '../../../redux/actions/PlaylistAction';
import { fetchSongsAction } from '../../../redux/actions/SongAction';


import CDImg from '../../../assets/images/cd-img.svg';

import './PurchasedSongs.scss';

function PurchasedSongs(props) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [loading, setLoading] = useState(false);
  const [hasSelectedSongs, setHasSelectedSongs] = useState(true);
  const [selectedSongs, setSelectedSongs] = useState([
    {
      title: 'Mint #1'
    },
    {
      title: 'Mint #2'
    },
    {
      title: 'Mint #3'
    },
    {
      title: 'Mint #4'
    }
  ]);

  const { showCaseData, addPlaylist, togglePlayListModal } = props;
  const renderPlayList = () => {
    return selectedSongs.map((list, index) => (
      <li><div>{list.title}</div> <div><button className="remove" onClick={() => removeSelectedSongs(index)}>remove</button></div></li>
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
    if (!selectedSongs.map(i => i.id).includes(song.id))
      setSelectedSongs(
        [...selectedSongs, song]
      )
  }

  useEffect(() => {
    props.fetchSongs({
      params: {
        related: 'album'
      }
    });
  }, []);
  return (
    <div id="create-playlist">
      <div className="album-info">
        <div className="left">
          <img src={CDImg} />
        </div>
        <div className="right text">
          <span className="large-text">Oh The Latency</span>
          <br />
          <span className="small-text">Oh The Latency</span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="purchase">
          {loading && <Skeleton width={250} height={214} className="case-box" />}
          <ul>
            {renderPlayList()}
          </ul>
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
    fetchSongs: (data) => dispatch(fetchSongsAction(data))
  }
})(withRouter(PurchasedSongs));