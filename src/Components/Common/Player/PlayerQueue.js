import RemoveIcon from "../../../assets/images/remove-icon.svg";
import CdImage from "../../../assets/images/cd-img.svg";

export default function PayerQueue({
  currentPlaylists,
  songIndex,
  setSongDeletingIndex,
  playlistIndex,
}) {
  return (
    <div className="queue">
      <span className="count">
        Song {songIndex + 1}/{currentPlaylists[playlistIndex]?.songs?.length}
      </span>
      <h4>Music Queue</h4>
      <div>
        <div className="queue-items">
          {currentPlaylists.map((cp, i) => {
            return (
              <div className="queue-item" key={i}>
                <img src={cp?.cover_cid ? `https://gateway.pinata.cloud/ipfs/${cp?.cover_cid}` : CdImage} alt="Album" />
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
            )
          })}
        </div>
      </div>
    </div>
  );
}
