import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import './NewNFT.scss';
import ImageUploadIcon from '../../assets/images/image-upload.svg';

function NewNFT(props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  useEffect(() => {
  }, [0]);

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
                <input name="album-title" type="text" placeholder="Album Title" {...register("albumName" , { required: true })} />
                {errors.songName && <span>This field is required</span>}
              </div>

              <div className="input-holder">
                <textarea name="album-description" placeholder="Description" {...register("albumDescription" , { required: true })} />
                {errors.albumDescription && <span>This field is required</span>}
              </div>

              <div className="input-holder">
                <input name="album-cost" type="text" placeholder="Album Price" {...register("albumPrice" , { required: true })} />
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
                Song Upload<br/>
                <input type="file" name="song" />
              </div>
            </div>

            <div className="right">
              <div className="image-upload">
                <img src={ImageUploadIcon} alt="Image Upload" />
              </div>
              <input type="file" name="album-cover" />
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
