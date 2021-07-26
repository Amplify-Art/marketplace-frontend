import React, { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from "react-hook-form";
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import { sortableContainer, SortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
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
import jwt from 'jsonwebtoken';
import dataURItoBlob from '../../../Utils/covert';

function NewNFT(props) {
  const [songFile, setSongFile] = useState(null);
  const [albumCover, setAlbumCover] = useState(null);
  const [albumCoverPreview, setAlbumCoverPreview] = useState(null);
  const [customError, setCustomError] = useState({});
  const [songFiles, setSongFiles] = useState([]);
  const [focusedInputIndex, setFocusedInputIndex] = useState(0);
  const [image, setImage] = useState('https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg');
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const [showCropper, setShowCropper] = useState(false);
  const [albumUploadingIndex, setAlbumUploadingIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const user = jwt.decode(localStorage.getItem('amplify_app_token'))
  const { register, handleSubmit, control, getValues, watch, formState: { errors } } = useForm();

  const uploadFile = async (fileInfo, type) => {
    let file = fileInfo;
    setIsUploading(true)
    file.is_uploading = true
    let songFormData = new FormData()
    songFormData.append('file', file)
    songFormData.append('name', 'test name')
    const mintSong = await axios.post(`${API_ENDPOINT_URL}/uploads`, songFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + getAccessToken()
      },
      onUploadProgress: (e) => onUploadProgress(e, file, type),
    }).catch(error => {
      setIsUploading(false)
      console.error(error)
    });
    if (type === 'song') {
      console.log(songFiles, file, 'songFiles')
      // let songFilesClone = [...songFiles.filter(f => f.title !== file.title)]
      // console.log([...songFilesClone], 'HERE')
      file.uploaded = true
      file.is_uploading = false
      file.hash = mintSong.data.IpfsHash
      // songFilesClone.push(file)
      // setSongFiles([...songFilesClone, {...JSON.parse(file.toString())}])
    } else {
      setAlbumCover(mintSong.data.IpfsHash)
    }
    return mintSong;
  }
  const onUploadProgress = (progressEvent, file, type) => {
    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
    file.progress = percentCompleted
    if (percentCompleted === 100) {
      setIsUploading(false)
      customError.songFiles = null
      return
    }
    if (type === 'album') {
      setAlbumUploadingIndex(percentCompleted)
    } else {
      file.progress = percentCompleted
      let songFilesClone = [...songFiles.filter(f => f.title !== file.title)]
      // songFilesClone.push(file)
      setSongFiles([...songFilesClone, JSON.parse(file.toString())])
    }
  }
  const onSubmit = async (data) => {
    let checkErrors = customError;
    if (!albumCover) {
      checkErrors.albumCover = 'Album Cover is required';
      return
    }
    if (!songFiles.length) {
      checkErrors.songFiles = 'Atleast one music file is required';
      return
    }
    if (isUploading) {
      checkErrors.songFiles = 'Files are uploading, please wait...';
      return
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

    let albumBody = {}
    albumBody.cover = albumCover;
    albumBody.name = data.albumName;
    albumBody.description = data.albumDescription;
    albumBody.price = Math.round(data.albumPrice * 100);
    albumBody.qty = data.numberOfAlbums;

    props.displayLoadingOverlay();
    try {
      const mintAlbum = await axios.post(`${API_ENDPOINT_URL}/uploads/album`, albumBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getAccessToken()
        },
      })
      if (mintAlbum.data.success) {
        let songBody = {}

        songBody.metadata = songFiles.map(file => ({
          title: file.title,
          hash: file.hash
        }));

        songBody.qty = data.numberOfAlbums
        songBody.album_id = mintAlbum.data.album_id
        const mintSong = await axios.post(`${API_ENDPOINT_URL}/uploads/song`, songBody, {
          headers: {
            'Content-Type': 'application/json',
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
    // when next file is added, input focus should be to this song title
    if (!acceptedFiles.length) {
      setFocusedInputIndex(focusedInputIndex + 1);
    }
  }, [acceptedFiles]);

  useEffect(() => {
    let notUploaded = songFiles.find(file => !file.uploaded && !file.is_uploading)
    if (notUploaded) {
      console.log(notUploaded, 'notUploaded')
      uploadFile(notUploaded, 'song')
    }
  }, [songFiles])

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
    const files = e.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
    setImage(e.target.files[0])
    setShowCropper(true);
  }

  const onSongTitleChange = (file, index, value) => {
    let songs = songFiles
    file.title = value;
    if (file.title) {
      delete file.error;
    }
    songs.splice(index, 1, file)
    setSongFiles([...songs])
    // if typying on other song title field, change autofocus to that index
    if (focusedInputIndex !== index) {
      setFocusedInputIndex(index);
    }
  }
  const DragHandle = sortableHandle(() => <span className="drag">::</span>);
  const SortableItem = SortableElement(({ name, value, songIndex, file }) => {
    return (
      <div className="single-song"  >
        <DragHandle />
        <div className="left">
          <div className="track">
            {/* TODO: limit path length to 15 chars plus extension */}
            {file.path} <img src={UploadIconAlt} alt="Upload" />
          </div>
        </div>
        <div className="right">
          <div className="input-holder">
            <input type="text" placeholder="Song Title" className={file.error && 'error'} onChange={(e) => onSongTitleChange(file, songIndex, e.target.value)} tabIndex={0} value={value} autoFocus={focusedInputIndex === songIndex} />
            {
              file.progress ? <span className="upload-holder">
                <span className="upload-progress" style={{ width: `${file.progress}%` }}></span>
                <span>{(file.progress || 0)}%</span>
              </span> : null
            }
            {file.error && <span className="error-message">This field is required</span>}
          </div>
        </div>

        <div className="trash" >
          <img src={TrashIcon} alt="Delete" onClick={() => removeSongFromUploads(songIndex)} />
        </div>
      </div>
      // </li>
    )
  });

  const SortableList = sortableContainer(({ songFiles }) => (
    <ul>
      {songFiles && songFiles.length > 0 ? songFiles.map((file, index) => (
        <SortableItem key={`item-${index}`} songIndex={index} value={file.title || ''} name={`song-title${index}`} file={file} />
      )
      ) : null}
    </ul>
  ));

  const OnSortEnd = ({ oldIndex, newIndex }) => {
    const updateSongFiles = arrayMove(songFiles, oldIndex, newIndex)
    setSongFiles(updateSongFiles)
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      let file = dataURItoBlob(cropper.getCroppedCanvas().toDataURL())
      uploadFile(file, 'album')
      setCropData(cropper.getCroppedCanvas().toDataURL());
      setAlbumCover(cropper.getCroppedCanvas().toDataURL());
    }
    setShowCropper(false)
  };
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
                <SortableList helperClass="sortableHelper" distance={2} songFiles={songFiles} onSortEnd={OnSortEnd} />
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
                  <img src={cropData !== "#" ? cropData : ImageUploadIcon} alt="Image Upload" />
                </div>
              </label>
              <input type="file" style={{ display: 'none' }} id="albumCover" name="album-cover" onChange={onAlbumCoverChange} accept="image/*" />
              <span className="error-message">{customError && customError.albumCover}</span>
              {albumUploadingIndex ? <div className="album-uploader">
                <span className="upload-progress" style={{ width: `${albumUploadingIndex}%` }}></span>
                <span>{albumUploadingIndex}%</span>
              </div> : null
              }
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

      {showCropper && albumCover && (
        <>
          <div className="crop-modal">
            <Cropper
              style={{ height: 500, width: "100%" }}
              // zoomTo={0.5}
              initialAspectRatio={1}
              aspectRatio={1}
              // preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              guides={true}
            />

            <div className="bottom">
              <button className="btn btn-black" onClick={getCropData}>Apply Crop</button>
            </div>
          </div>
          <div className="crop-cover" />
        </>
      )}
    </div>
  );
}

export default NewNFT;
