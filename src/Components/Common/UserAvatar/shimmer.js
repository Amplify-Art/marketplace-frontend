import React from "react";
import "./UserAvatar.scss";

function UserAvatarShimmer() {
  return (
    <div className="user-avatar">
      <div className="shimmer-custom circle"></div>
      <div className="shimmer-custom title"></div>
    </div>
  );
}

export default UserAvatarShimmer;
