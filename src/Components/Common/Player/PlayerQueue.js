import RemoveIcon from "../../../assets/images/remove-icon.svg";
import CdImage from "../../../assets/images/cd-img.svg";

export default function PayerQueue({
  currentPlaylists,
  songIndex,
  setSongDeletingIndex,
  playlistIndex,
}) {
  console.log('[playlistIndex]', playlistIndex)
  return (
    <div className="queue">
      <span className="count">
        Song {songIndex + 1}/{currentPlaylists[playlistIndex]?.songs?.length}
      </span>
      <h4>Album Queue</h4>
      <div className="queue-items">
        {currentPlaylists.map((cp, i) => {
          return (
          <div className="queue-item">
            <img src={CdImage} alt="Album" />
            <div className="title">
              <span className="song-title">{cp.title}</span>
              <span className="album-title">
                {cp?.songs?.length} {cp?.songs?.length > 1 ? "songs" : "song"}
              </span>
            </div>
            <img
              src={RemoveIcon}
              className="close"
              onClick={() => setSongDeletingIndex(i)}
              alt="Remove"
            />
          </div>
        )})}
      </div>
    </div>
  );
}
