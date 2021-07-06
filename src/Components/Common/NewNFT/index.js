import React, { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from "react-hook-form";
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import './NewNFT.scss';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import CurrencyInput from 'react-currency-input-field';
import { API_ENDPOINT_URL } from '../../../Constants/default'
import TrashIcon from '../../../assets/images/trash.svg';
import CloseIcon from '../../../assets/images/close.svg';
import UploadIconAlt from '../../../assets/images/upload.svg';
import ImageUploadIcon from '../../../assets/images/image-upload.svg';
import ToolTipIcon from '../../../assets/images/infoicon.svg';
import { getAccessToken } from '../../../Api/index';
import jwt from 'jsonwebtoken'

function NewNFT(props) {
  const [songFile, setSongFile] = useState(null);
  const [albumCover, setAlbumCover] = useState(null);
  const [albumCoverPreview, setAlbumCoverPreview] = useState(null);
  const [customError, setCustomError] = useState({});
  const [songFiles, setSongFiles] = useState([]);

  const user = jwt.decode(localStorage.getItem('amplify_app_token'))
  const { register, handleSubmit, control, getValues, watch, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    let checkErrors = customError;
    if (!albumCover)
      checkErrors.albumCover = 'Album Cover is required';
    if (!songFiles.length) {
      checkErrors.songFiles = 'Atleast one music file is required';
    }
    if (songFiles.length) {
      let withErrors = songFiles.map((song) => {
        if (!song.title) {
          checkErrors.songFile = 'This field is required'
          song.error = 'This field is required'
        } return song;
      })
      if (checkErrors.songFile) {
        checkErrors.songFile = undefined
        setSongFiles(withErrors)
        return
      }
    }

    let albumFormData = new FormData();
    albumFormData.append('cover', albumCover);
    albumFormData.append('name', data.albumName);
    albumFormData.append('description', data.albumDescription);
    albumFormData.append('price', Math.round(data.albumPrice*100));
    albumFormData.append('qty', data.numberOfAlbums);

    props.displayLoadingOverlay();
    try {
      const mintAlbum = await axios.post(`${API_ENDPOINT_URL}/uploads/album`, albumFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + getAccessToken()
        },
      })
      if (mintAlbum.data.success) {
        let songFormData = new FormData()

        songFormData.append('metadata', JSON.stringify(songFiles.map(file => ({
          title: file.title,
        }))));
        songFiles.map(file => {
          songFormData.append('songs', file)
        });
        songFormData.append('qty', data.numberOfAlbums)
        songFormData.append('album_id', mintAlbum.data.album_id)
        const mintSong = await axios.post(`${API_ENDPOINT_URL}/uploads/song`, songFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + getAccessToken()
          },
        });
        if (mintSong.data.success) {
          props.toggleCongratsModal(true)
          props.hideLoadingOverlay();
          props.closeNewNftModal();
        };
      };
    } catch (e) {
      props.hideLoadingOverlay();
      if (store.add !== null) {
        store.addNotification({
          title: "Error",
          message: "Something went wrong, please try again later.",
          type: "danger",
          insert: "top",
          container: "top-left",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      }
    };
  };

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone();

  useEffect(() => {
    setSongFiles(songFiles => [...songFiles, ...acceptedFiles])
    if (customError.songFiles) {
      delete customError.songFiles;
    }
  }, [acceptedFiles]);

  const removeSongFromUploads = (index) => {
    const newSongSet = songFiles.splice(index, 1);
    setSongFile(newSongSet);
  }

  const onSongFileChange = (e) => {
    delete customError.songFile;
    setSongFile(e.target.files[0]);
  }

  const onAlbumCoverChange = (e) => {
    delete customError.albumCover;
    setAlbumCover(e.target.files[0]);
    setAlbumCoverPreview(URL.createObjectURL(e.target.files[0]));
  }

  const onSongTitleChange = (file, index, value) => {
    let songs = songFiles
    file.title = value;
    if (file.title) {
      delete file.error;
    }
    songs.splice(index, 1, file)
    setSongFiles([...songs])
  }
  return (
    // TODO: move this whole component to the parts folder
    <div id="new-nft-modal" className="modal">
      <ReactNotification />
      <div className="cover" onClick={props.closeNewNftModal} />
      <div className="holder">
        <h3>Mint New Album</h3>
        <p>Album is being minted for @{user.username}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="split hide-scroll" id="style-4">
            <div className="left">
              <div className="input-holder">
                <input name="album-title" type="text" placeholder="Album Title" className={errors.albumName && 'error'} {...register("albumName", { required: true })} />
                {errors.albumName && <span className="error-message">This field is required</span>}
              </div>

              <div className="input-holder">
                <textarea name="album-description" placeholder="Description" className={errors.albumDescription && 'error'} {...register("albumDescription", { required: true })} />
                {errors.albumDescription && <span className="error-message">This field is required</span>}
              </div>

              <div className="input-holder">
                <Controller
                  control={control}
                  name="albumPrice"
                  rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <CurrencyInput
                      name="albumPrice"
                      placeholder="Album Cost"
                      // defaultValue={0}
                      allowNegativeValue={false}
                      prefix="$"
                      decimalScale={2}
                      decimalsLimit={2}
                      onValueChange={onChange}
                      className={errors.albumPrice && 'error'}
                    />
                  )}
                />
                {/* <input name="album-cost" type="text" placeholder="Album Cost" {...register("albumPrice", { required: true })} /> */}
                {errors.albumPrice && <span className="error-message">This field is required</span>}
              </div>

              <div className="input-holder">
                <input name="number-of-albums" type="number" placeholder="Number of Albums" className={errors.numberOfAlbums && 'error'} {...register("numberOfAlbums", { required: true })} />
                {errors.numberOfAlbums && <span className="error-message">This field is required</span>}
              </div>

              <div className="song-list">
                {songFiles && songFiles.length > 0 ? songFiles.map((file, index) => (
                  <div className="single-song" key={index}>
                    <div className="left">
                      <div className="track">
                        {/* TODO: limit path length to 15 chars plus extension */}
                        {file.path} <img src={UploadIconAlt} alt="Upload" />
                      </div>
                    </div>
                    <div className="right">
                      <div className="input-holder">
                        <input name={`song-title${index}`} type="text" placeholder="Song Title" className={file.error && 'error'} onChange={(e) => onSongTitleChange(file, index, e.target.value)} />
                        {file.error && <span className="error-message">This field is required</span>}
                      </div>
                    </div>

                    <div className="trash">
                      <img src={TrashIcon} alt="Delete" onClick={() => removeSongFromUploads(index)} />
                    </div>
                  </div>
                )) : null}
              </div>

              <div className="uploader">
                <div {...getRootProps()}>
                  <input {...getInputProps()} accept=".mp3,audio/*" />
                  {
                    isDragActive ? (
                      <div className="upload-dropzone">
                        <img src={UploadIconAlt} alt="Upload" />
                        <h5>Upload Tracks</h5>
                        <p>You can add more than one track at a time</p>
                      </div>
                    ) : (
                      <div className="upload-dropzone">
                        <img src={UploadIconAlt} alt="Upload" />
                        <h5>Upload Tracks</h5>
                        <p>You can add more than one track at a time</p>
                      </div>
                    )
                  }
                </div>
              </div>
              {customError.songFiles && <span className="error-message">{customError.songFiles}</span>}
            </div>

            <div className="right">
              <label htmlFor="albumCover">
                <div className="image-upload">
                  <img src={albumCoverPreview ? albumCoverPreview : ImageUploadIcon} alt="Image Upload" />
                </div>
              </label>
              <input type="file" style={{ display: 'none' }} id="albumCover" name="album-cover" onChange={onAlbumCoverChange} accept="image/*" />
              <span className="error-message">{customError && customError.albumCover}</span>
            </div>
          </div>
          <div className="policy-wrap">
            <div className="input-holder checkbox">
              <label htmlFor="terms" className={errors.terms ? 'error' : ''}>I agree to the Terms and Conditions <img src={ToolTipIcon} /></label>
              <Controller
                control={control}
                name="terms"
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    defaultChecked
                    value={value}
                    onChange={onChange}
                    {...register("terms", { required: true })}
                  />
                )}
              />
            </div>
            <div className="input-holder checkbox">
              <label htmlFor="remint" className={errors.remint ? 'error' : ''}>I will not remint this album <img src={ToolTipIcon} /></label>
              <Controller
                control={control}
                name="terms"
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <input
                    type="checkbox"
                    id="terms"
                    name="remint"
                    defaultChecked
                    value={value}
                    onChange={onChange}
                    {...register("remint", { required: true })}
                  />
                )}
              />
            </div>
          </div>
          <div className="input-holder center-text">
            <input type="submit" />
          </div>
        </form>
      </div>
      <div className="close-icon">
        <img src={CloseIcon} alt="close" onClick={props.closeNewNftModal} />
      </div>
    </div>
  );
}

export default NewNFT;
