import React, { useEffect, useState } from 'react';
import Image from '../Image'
import './UserAvatar.scss';
import defaultProfile from '../../../assets/images/default-profile.jpg';
import greyFace from '../../../assets/images/grey_face.gif';

function UserAvatar(props) {
  const { avatarImg, name, onClick } = props;
  const [height, setHeight] = useState('');

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
      <div className="avatar">
        <Image src={avatarImg ? avatarImg : defaultProfile} alt="" fallbackImage={defaultProfile} />
      </div>
      <span className="avatar-name">{name}</span>
    </div>
  )
}

export default UserAvatar;