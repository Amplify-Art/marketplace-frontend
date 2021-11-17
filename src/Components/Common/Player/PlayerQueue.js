
import CloseIcon from '../../../assets/images/close-icon.svg';

export default function PayerQueue({ currentPlaylists, songIndex, setSongDeletingIndex }) {
    return <div className="queue">
        <span className="count">Song {songIndex + 1}/{currentPlaylists.length}</span>
        <h4>Album Queue</h4>
        <div className="queue-items">
            {
                currentPlaylists.map(cp =>
                    <div className="queue-item">
                        <img src={`https://amplify-dev.mypinata.cloud/ipfs/${cp?.album?.cover_cid}`} />
                        <div className="title">
                            <span className="song-title">{cp.title}</span>
                            <span className="album-title">{cp?.album?.title}</span>
                        </div>
                        <img src={CloseIcon} className="close" onClick={() => setSongDeletingIndex(songIndex)} />
                    </div>
                )
            }

        </div>
    </div>
}