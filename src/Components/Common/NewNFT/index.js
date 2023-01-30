import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import arrayMove from "array-move";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./NewNFT.scss";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import CurrencyInput from "react-currency-input-field";
import { API_ENDPOINT_URL } from "../../../Constants/default";
import TrashIcon from "../../../assets/images/trash.svg";
import CloseIcon from "../../../assets/images/closeicon.svg";
import UploadIconAlt from "../../../assets/images/upload.svg";
import ImageUploadIcon from "../../../assets/images/image-upload.svg";
import ToolTipIcon from "../../../assets/images/infoicon.svg";
import { getAccessToken } from "../../../Api/index";
import jwt from "jsonwebtoken";
import dataURItoBlob from "../../../Utils/covert";
import _ from "lodash";
import * as nearAPI from "near-api-js";

const {
  utils: {
    format: { parseNearAmount },
  },
} = nearAPI;

function NewNFT(props) {
  const [songFile, setSongFile] = useState(null);
  const [albumCover, setAlbumCover] = useState(null);
  const [albumCoverPreview, setAlbumCoverPreview] = useState(null);
  const [customError, setCustomError] = useState({});
  const [songFiles, setSongFiles] = useState([]);
  const [focusedInputIndex, setFocusedInputIndex] = useState(-1);
  const [image, setImage] = useState(
    "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
  );
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const [showCropper, setShowCropper] = useState(false);
  const [albumUploadingIndex, setAlbumUploadingIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [currentUploadingFile, setCurrentUploadingFile] = useState(null);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [uploadedIpfs, setUploadedIpfs] = useState([]);
  const [fileDuration, setFileDuration] = useState({});

  const user = jwt.decode(localStorage.getItem("amplify_app_token"));
  const {
    register,
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const uploadFile = async (
    fileInfo,
    type,
    uploadingFiles,
    songFiles,
    setIsUploading
  ) => {
    let file = fileInfo;
    let songFormData = new FormData();
    songFormData.append("file", file);
    songFormData.append("name", file.path);
    songFormData.append("type", type);
    const mintSong = await axios
      .post(`${API_ENDPOINT_URL}/uploads`, songFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getAccessToken(),
        },
        onUploadProgress: (e) =>
          onUploadProgress(e, file, type, uploadingFiles, songFiles),
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
    if (mintSong && type === "song") {
      setCurrentUploadingFile(
        Object.assign(
          { progress: 100, is_uploading: false, is_uploaded: true },
          currentUploadingFile
        )
      );
      setIsUploading(false);
      setUploadedIpfs([...uploadedIpfs, mintSong.data.IpfsHash]);
    } else if (mintSong) {
      setAlbumCover(mintSong.data.IpfsHash);
    } else {
      setIsUploading(false);
    }
    return mintSong;
  };
  const onUploadProgress = (progressEvent, file, type, uploadingFiles) => {
    var percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    if (percentCompleted === 100 && type === "song") {
      customError.songFiles = null;
      return;
    }
    if (type === "album") {
      setAlbumUploadingIndex(percentCompleted);
      setIsUploading(false);
    } else {
      setCurrentUploadingFile(
        Object.assign(
          { progress: percentCompleted, is_uploading: true },
          currentUploadingFile
        )
      );
      if (!currentUploadingFile.is_uploading) {
        let songFilesClone = [...uploadingFiles];
        const index = uploadingFiles.findIndex(
          (f) => f.path === currentUploadingFile.path
        );
        songFilesClone.splice(
          index,
          1,
          Object.assign({ is_uploading: true }, currentUploadingFile)
        );
        setUploadingFiles(songFilesClone);
      }
    }
  };
  const onSubmit = async (data) => {
    let checkErrors = customError;
    if (!albumCover) {
      checkErrors.albumCover = "Album Cover is required";
      return;
    }
    if (!songFiles.length) {
      checkErrors.songFiles = "Atleast one music file is required";
      return;
    }
    if (isUploading) {
      checkErrors.songFiles = "Files are uploading, please wait...";
      return;
    }
    if (songFiles.length) {
      let withErrors = songFiles.map((song) => {
        if (!song.title) {
          checkErrors.songFile = "This field is required";
          song.error = "This field is required";
        }
        return song;
      });
      if (checkErrors.songFile) {
        checkErrors.songFile = undefined;
        setSongFiles(withErrors);
        return;
      }
    }

    let albumBody = {};
    albumBody.cover = albumCover;
    albumBody.name = data.albumName;
    albumBody.description = data.albumDescription;
    albumBody.price = Math.round(data.albumPrice * 100);
    albumBody.qty = data.numberOfAlbums;

    props.displayLoadingOverlay();
    try {
      let yocto_near_price = parseNearAmount(
        `${data.albumPrice / props.nearPrice}`
      );
      let gasMultiplies = Math.ceil(parseInt(data.numberOfAlbums) / 25);
      let approximate_storage_deposit =
        0.2 * gasMultiplies * (0.8 * songFiles.length);

      let minting_info = {
        cover: albumCover,
        title: data.albumName,
        description: data.albumDescription,
        price: Math.round(data.albumPrice * 100),
        qty: data.numberOfAlbums,
        yocto_near_price,
        songs: songFiles.map((file, index) => ({
          title: file.title,
          hash: uploadedIpfs[index],
          duration: fileDuration[file.name],
        })),
        minting_cost: approximate_storage_deposit,
      };
      localStorage.setItem("minting_info", JSON.stringify(minting_info));

      await props.wallet.account().functionCall(
        process.env.REACT_APP_NFT_CONTRACT || "nft.aa-1-test.testnet",
        "add_token_types",
        {
          album_hash: albumCover,
          cover_songslist: _.uniq(uploadedIpfs),
          number_of_album_copies: parseInt(data.numberOfAlbums),
          price: yocto_near_price,
          songs_metadatalist: minting_info.songs.map((song) => ({
            title: song.title,
            media: `https://gateway.pinata.cloud/ipfs/${albumCover}`, //TODO: should change the params to have actual song media
          })),
        },
        300000000000000,
        parseNearAmount(`${approximate_storage_deposit}`)
      );
    } catch (e) {
      props.hideLoadingOverlay();
      toast.error("Something has went wrong. Please try again later.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone();

  const getDuration = async (file) => {
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function () {
      audioContext.decodeAudioData(reader.result, function (buffer) {
        setFileDuration({
          ...fileDuration,
          [file.name]: Math.ceil(buffer.duration),
        });
      });
    };
  };
  useEffect(() => {
    if (acceptedFiles.length) {
      // acceptedFiles.forEach(file => getDuration(file))
      // getDuration(acceptedFileÎs, setFileDuration)
      setSongFiles((songFiles) => [
        ...songFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(
            { content: file, path: file.path, name: file.name },
            file
          )
        ),
      ]);
      setUploadingFiles([
        ...uploadingFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(
            { content: file, path: file.path, name: file.name },
            file
          )
        ),
      ]);
      if (customError.songFiles) {
        delete customError.songFiles;
      }
      // when next file is added, input focus should be to this track title
      if (acceptedFiles.length) {
        setFocusedInputIndex(focusedInputIndex + 1);
      }
    }
  }, [acceptedFiles]);

  useEffect(() => {
    let inQueue = uploadingFiles.find((f) => !f.is_uploaded && !f.is_uploading);
    if (uploadingFiles.length && !isUploading && inQueue) {
      getDuration(inQueue.content);
      setCurrentUploadingFile(inQueue);
      setIsUploading(true);
    }
  }, [uploadingFiles.length, isUploading]);

  useEffect(() => {
    if (
      currentUploadingFile &&
      !currentUploadingFile.is_uploaded &&
      !currentUploadingFile.is_uploading
    ) {
      uploadFile(
        currentUploadingFile.content,
        "song",
        uploadingFiles,
        songFiles,
        setIsUploading
      );
    }
  }, [currentUploadingFile]);

  const removeSongFromUploads = (index) => {
    let tobeRemoved = songFiles.find((f, i) => i === index);
    const newSongSet = songFiles.splice(index, 1);
    setSongFile(newSongSet);
    let newFileDuration = fileDuration;
    delete newFileDuration[tobeRemoved.name];
    setFileDuration({
      ...newFileDuration,
    });
  };

  const onSongFileChange = (e) => {
    delete customError.songFile;
    setSongFile(e.target.files[0]);
  };

  const onAlbumCoverChange = (e) => {
    if (!e.target.files[0]) return;

    delete customError.albumCover;
    const files = e.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
    setImage(e.target.files[0]);
    setShowCropper(true);
  };

  const onSongTitleChange = (file, index, value) => {
    let songs = songFiles;
    file.title = value;
    if (file.title) {
      delete file.error;
    }
    songs.splice(index, 1, file);
    setSongFiles([...songs]);
    // if typying on other track title field, change autofocus to that index
    if (focusedInputIndex !== index) {
      setFocusedInputIndex(index);
    }
  };
  const DragHandle = SortableHandle(() => <span className="drag">::</span>);
  const SortableItem = SortableElement(({ name, value, songIndex, file }) => {
    return (
      <div className="single-song" tabIndex={songIndex}>
        {!isUploading && <DragHandle />}
        <div className="left">
          <div className="track">
            {/* TODO: limit path length to 15 chars plus extension */}
            {file.path} <img src={UploadIconAlt} alt="Upload" />
            {currentUploadingFile &&
            currentUploadingFile.path === file.path &&
            currentUploadingFile.progress &&
            currentUploadingFile.progress !== 100 ? (
              <span className="upload-holder">
                <span
                  className="upload-progress"
                  style={{ width: `${currentUploadingFile.progress}%` }}
                ></span>
                <span>{currentUploadingFile.progress || 0}%</span>
              </span>
            ) : null}
          </div>
        </div>
        <div className="right">
          <div className="input-holder">
            <input
              type="text"
              placeholder="Track Title"
              className={file.error && "error"}
              onChange={(e) =>
                onSongTitleChange(file, songIndex, e.target.value)
              }
              value={value}
              autoFocus={focusedInputIndex === songIndex}
            />

            {file.error && (
              <span className="error-message">This field is required</span>
            )}
          </div>
        </div>

        <div className="trash">
          <img
            src={TrashIcon}
            alt="Delete"
            onClick={() => removeSongFromUploads(songIndex)}
          />
        </div>
      </div>
      // </li>
    );
  });
  const SortableList = SortableContainer(({ songFiles }) => (
    <ul>
      {songFiles && songFiles.length > 0
        ? songFiles.map((file, index) => (
            <SortableItem
              key={`item-${index}`}
              songIndex={index}
              index={index}
              value={file.title || ""}
              name={`song-title${index}`}
              file={file}
              disabled={isUploading}
            />
          ))
        : null}
    </ul>
  ));

  const OnSortEnd = ({ oldIndex, newIndex }) => {
    const updateSongFiles = arrayMove(songFiles, oldIndex, newIndex);
    const sortIpfsHashes = arrayMove(uploadedIpfs, oldIndex, newIndex);
    setSongFiles(updateSongFiles);
    setUploadedIpfs(sortIpfsHashes);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      let file = dataURItoBlob(cropper.getCroppedCanvas().toDataURL());
      uploadFile(file, "album", uploadingFiles, songFiles, setIsUploading);
      setCropData(cropper.getCroppedCanvas().toDataURL());
      setAlbumCover(cropper.getCroppedCanvas().toDataURL());
    }
    setShowCropper(false);
  };

  return (
    // TODO: move this whole component to the parts folder
    <div id="new-nft-modal" className="modal">
      <div className="cover" onClick={props.closeNewNftModal} />
      <div className="holder">
        <h3>Mint Album</h3>
        <p>Album is being minted for @{user.name || user.near_account_id}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="split hide-scroll" id="style-4">
            <div className="left">
              <div className="input-holder">
                <input
                  name="album-title"
                  type="text"
                  placeholder="Album Title"
                  className={errors.albumName && "error"}
                  {...register("albumName", { required: true })}
                />
                {errors.albumName && (
                  <span className="error-message">This field is required</span>
                )}
              </div>

              <div className="input-holder">
                <textarea
                  name="album-description"
                  placeholder="Description"
                  className={errors.albumDescription && "error"}
                  {...register("albumDescription", { required: true })}
                />
                {errors.albumDescription && (
                  <span className="error-message">This field is required</span>
                )}
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
                      maxLength={9}
                      className={errors.albumPrice && "error"}
                    />
                  )}
                />
                {/* <input name="album-cost" type="text" placeholder="Album Cost" {...register("albumPrice", { required: true })} /> */}
                {errors.albumPrice && (
                  <span className="error-message">This field is required</span>
                )}
              </div>

              <div className="input-holder">
                <input
                  name="number-of-albums"
                  type="number"
                  placeholder="Number of Albums"
                  className={errors.numberOfAlbums && "error"}
                  {...register("numberOfAlbums", { required: true })}
                />
                {errors.numberOfAlbums && (
                  <span className="error-message">This field is required</span>
                )}
              </div>

              {songFiles.length > 0 && (
                <div className="song-list">
                  <SortableList
                    helperClass="sortableHelper"
                    distance={1}
                    songFiles={songFiles}
                    onSortEnd={OnSortEnd}
                  />
                </div>
              )}

              <div className="uploader">
                <div {...getRootProps()}>
                  <input
                    {...getInputProps()}
                    accept=".mp3,audio/*"
                    disabled={isUploading}
                  />

                  <div
                    className={`upload-dropzone ${isUploading && "disabled"}`}
                  >
                    <img src={UploadIconAlt} alt="Upload" />
                    {isUploading ? (
                      <h5>Song Uploading(s)...</h5>
                    ) : (
                      <>
                        <h5>Upload Tracks</h5>
                        <p>You can add more than one track at a time</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {customError.songFiles && (
                <span className="error-message">{customError.songFiles}</span>
              )}
            </div>

            <div className="right">
              <label htmlFor="albumCover">
                <div className="image-upload">
                  <img
                    src={cropData !== "#" ? cropData : ImageUploadIcon}
                    alt="Image Upload"
                  />
                </div>
              </label>
              <input
                type="file"
                style={{ display: "none" }}
                id="albumCover"
                name="album-cover"
                onChange={onAlbumCoverChange}
                accept="image/*"
              />
              <span className="error-message">
                {customError && customError.albumCover}
              </span>
              {albumUploadingIndex ? (
                <div className="album-uploader">
                  <span
                    className="upload-progress"
                    style={{ width: `${albumUploadingIndex}%` }}
                  ></span>
                  <span>{albumUploadingIndex}%</span>
                </div>
              ) : null}
            </div>
          </div>
          <div className="policy-wrap">
            <div className="input-holder checkbox">
              <label htmlFor="terms" className={errors.terms ? "error" : ""}>
                I agree to the Terms and Conditions <img src={ToolTipIcon} />
              </label>
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
              <label htmlFor="remint" className={errors.remint ? "error" : ""}>
                I will not remint this album <img src={ToolTipIcon} />
              </label>
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
            <input type="submit" disabled={isUploading} />
          </div>
        </form>
        <div className="close-icon">
          <img src={CloseIcon} alt="close" onClick={props.closeNewNftModal} />
        </div>
      </div>

      {showCropper && (
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
              <button className="btn btn-black" onClick={getCropData}>
                Apply Crop
              </button>
            </div>
          </div>
          <div className="crop-cover" />
        </>
      )}
    </div>
  );
}

export default connect((state) => {
  return {
    wallet: state.global && state.global.wallet,
    nearPrice: state.global.nearPrice,
  };
})(withRouter(NewNFT));
