import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import dataURItoBlob from "../../Utils/covert";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const ImageUploader = ({
  setCropData,
  cropData,
  onBannerChange,
  modalType,
}) => {
  const [image, setImage] = useState();
  const [cropper, setCropper] = useState();
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined" && cropper?.cropped) {
      let file = dataURItoBlob(cropper?.getCroppedCanvas()?.toDataURL());
      setCropData(file);
      onBannerChange(file);
    }
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <br />
        <input
          type="file"
          id="fileUpload"
          onChange={onChange}
          style={{ display: "none" }}
        />
        <label htmlFor="fileUpload" className="uploadButton">
          Choose Image
        </label>
        <br />
        <button
          style={{ float: "center" }}
          className="banner-update-button"
          onClick={getCropData}
        >
          Upload
        </button>
        <br />
        <Cropper
          style={{ width: "100%" }}
          // zoomTo={0.5}
          aspectRatio={modalType === "profile" ? 1 : 2.2}
          preview=".img-preview"
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
          guides={false}
          type={image}
        />
        {/* <br /> */}
        {/* {cropper?.cropped ? ( */}
        {/* ) : null} */}
      </div>
    </>
  );
};

export default ImageUploader;
