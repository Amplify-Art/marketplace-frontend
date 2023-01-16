import React, { useEffect, useState } from 'react';
import Image from '../Image'
import './UserAvatar.scss';
import defaultProfile from '../../../assets/images/default-profile.svg';
import greyFace from '../../../assets/images/grey_face.gif';

function UserAvatar(props) {
  const { avatarImg, name, onClick } = props;
  const [height, setHeight] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);

  const getHeight = () => {
    let width = '300';
    const box = document.querySelector('.avatar');
    if (box) {
      width = box.clientWidth;
    }

    setHeight(width);
  }

  useEffect(() => {
    let width;
    const box = document.querySelector('.avatar');
    if (!height) {
      if (box) {
        width = box.clientWidth;
        setHeight(width);
      }
    }

    const resizeListener = () => {
      // change width from the state object
      getHeight();
    };
    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    }
  }, []);

  return (
    <div className="user-avatar" onClick={onClick}>
      <img src={avatarImg ? avatarImg : defaultProfile} onLoad={() => setImageLoaded(true)} style={{ display: 'none' }} />
      {imageLoaded ? (
        <div className="avatar">
          <Image src={avatarImg ? avatarImg : defaultProfile} alt="" fallbackImage={defaultProfile} />
        </div>
      ) : (
        <div className="shimmer-custom circle"></div>
      )}
      <span className="avatar-name">{name}</span>
    </div>
  )
}

export default UserAvatar;