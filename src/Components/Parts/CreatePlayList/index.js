import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useForm } from "react-hook-form";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AddShowCase from '../AddShowCase';
import { addPlaylistAction } from '../../../redux/actions/PlaylistAction';
import { fetchAlbumsAction } from '../../../redux/actions/AlbumAction';


import CDImg from '../../../assets/images/cd-img.svg';

import './CreatePlayList.scss';

function CreatePlayList({ showCaseData, fetchAlbums, albums }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlbums({})
  }, []);

  const playlistData = [
    { title: "What is Love" },
    { title: "What is Love" },
    { title: "What is Love" },
    { title: "What is Love" }
  ];

  const renderPlayList = () => {
    return [].map((list, index) => (
      <div>{`${index + 1}. ${list.title}`}</div>
    ))
  }

  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <div id="create-playlist">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="playlist-wrapper">
          <div className="playlist-showcase">
            <div className="input-holder">
              <input name="playlist-name" type="text" placeholder="Playlist Name" {...register("playlistName", { required: true })} />
            </div>
            <AddShowCase showCaseData={showCaseData} />
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
        <div className="btn-wrabtn-wrapp input-holder">
          <input type="submit" value="Create PlayList" />
        </div>
      </form>
    </div>
  )
};

export default connect(state => {
  return {
    albums: state.albums.albums
  }
}, dispatch => {
  return {
    fetchAlbums: (data) => dispatch(fetchAlbumsAction(data))
  }
})(withRouter(CreatePlayList));