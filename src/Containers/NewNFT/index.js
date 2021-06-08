import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import './NewNFT.scss';
import ImageUploadIcon from '../../assets/images/image-upload.svg';
import axios from 'axios';
import { API_ENDPOINT_URL } from '../../constants/default'

function NewNFT(props) {
  const [songFile, setSongFile] = useState(null);
  const [albumCover, setAlbumCover] = useState(null);
  const [albumCoverPreview, setAlbumCoverPreview] = useState(null);
  const [customError, setCustomError] = useState({});

  const { register, handleSubmit, getValues, watch, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    let checkErrors = customError;
    if (!albumCover)
      checkErrors.albumCover = 'Album Cover is required';
    if (!songFile)
      checkErrors.songFile = 'Music file is required';
    console.log(checkErrors, 'checkErrors')
    if (Object.keys(checkErrors).length) {
      setCustomError(checkErrors);
      return
    }
    let albumFormData = new FormData()
    albumFormData.append('cover', albumCover);
    albumFormData.append('name', data.albumName);
    albumFormData.append('description', data.albumDescription);
    const mintAlbum = await axios.post(`${API_ENDPOINT_URL}/uploads/album`, albumFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidHdpdHRlcl9pZCI6IjYwNjg3MTUxMCIsInVzZXJuYW1lIjoiQW5pbEFuaXJhaSIsIm5hbWUiOiJhbmlsIGt1bWFyIiwiYXZhdGFyIjoiaHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzEzODU4NTYzMjYyODMxMzcwMjUvT1FUVEwtNFBfbm9ybWFsLnBuZyIsImJhbm5lciI6Imh0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2Jhbm5lcnMvNjA2ODcxNTEwLzE2MTk0MTYyMjciLCJuZWFyX2Nvbm5lY3RlZCI6dHJ1ZSwibmVhcl9hY2NvdW50X2lkIjoiYW5pbGt1bWFycmFpMTIzNDIzNCIsImlhdCI6MTYyMzE0NzA1MX0.n3FMswZeKikIGcefv5Q5VT1u7rUX7JBtBe1hjBMUd0Q'
      },
    })
    console.log(mintAlbum, 'mintAlbum')
    if (mintAlbum.data.success) {
      let songFormData = new FormData()
      songFormData.append('song', songFile)
      songFormData.append('name', songFile.name)
      songFormData.append('singer', 'Eminem')
      songFormData.append('genre', 'Pop')
      songFormData.append('lyricist', 'Eminem')
      songFormData.append('album_id', mintAlbum.data.album_id)
      const mintSong = await axios.post(`${API_ENDPOINT_URL}/uploads/song`, songFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidHdpdHRlcl9pZCI6IjYwNjg3MTUxMCIsInVzZXJuYW1lIjoiQW5pbEFuaXJhaSIsIm5hbWUiOiJhbmlsIGt1bWFyIiwiYXZhdGFyIjoiaHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzEzODU4NTYzMjYyODMxMzcwMjUvT1FUVEwtNFBfbm9ybWFsLnBuZyIsImJhbm5lciI6Imh0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2Jhbm5lcnMvNjA2ODcxNTEwLzE2MTk0MTYyMjciLCJuZWFyX2Nvbm5lY3RlZCI6dHJ1ZSwibmVhcl9hY2NvdW50X2lkIjoiYW5pbGt1bWFycmFpMTIzNDIzNCIsImlhdCI6MTYyMzE0NzA1MX0.n3FMswZeKikIGcefv5Q5VT1u7rUX7JBtBe1hjBMUd0Q'
        },
      })
      console.log(mintSong, 'mintSong')
    }
  };
  useEffect(() => {
  }, [0]);
  const onSongFileChange = (e) => {
    delete customError.songFile;
    setSongFile(e.target.files[0]);
  }

  const onAlbumCoverChange = (e) => {
    delete customError.albumCover;
    setAlbumCover(e.target.files[0]);
    setAlbumCoverPreview(URL.createObjectURL(e.target.files[0]));
  }
  return (
    // TODO: move this whole component to the parts folder
    <div id="new-nft-modal">
      <div className="cover" />
      <div className="holder">
        <h3>Mint New Album</h3>
        <p>Album is being minted for @2n10se</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="split">
            <div className="left">
              {/* TODO: Move input to its own component */}
              <div className="input-holder">
                <input name="album-title" type="text" placeholder="Album Title" {...register("albumName", { required: true })} />
                {errors.songName && <span>This field is required</span>}
              </div>

              <div className="input-holder">
                <textarea name="album-description" placeholder="Description" {...register("albumDescription", { required: true })} />
                {errors.albumDescription && <span>This field is required</span>}
              </div>

              <div className="input-holder">
                <input name="album-cost" type="text" placeholder="Album Price" {...register("albumPrice", { required: true })} />
                {errors.albumPrice && <span>This field is required</span>}
              </div>

              <div className="input-holder checkbox">
                <label htmlFor="terms">I agree to the Terms and Conditions</label>
                <input type="checkbox" id="terms" name="terms" value="true" />
              </div>

              <div className="input-holder checkbox">
                <label htmlFor="remint">I will not remint this album</label>
                <input type="checkbox" id="remint" name="remint" value="true" />
              </div>

              <div className="input-holder">
                Song Upload<br />
                <input type="file" name="song" onChange={onSongFileChange} accept="audio/mp3,audio/*" />
                <span>{customError && customError.songFile}</span>
              </div>
            </div>

            <div className="right">
              <div className="image-upload">
                <img src={albumCoverPreview ? albumCoverPreview : ImageUploadIcon} alt="Image Upload" />
              </div>
              <input type="file" name="album-cover" onChange={onAlbumCoverChange} accept="image/*" />
              <span>{customError && customError.albumCover}</span>
            </div>
          </div>

          <div className="input-holder">
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewNFT;
