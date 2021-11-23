
import CloseIcon from '../../../assets/images/close-icon.svg';

export default function PayerQueue({ currentPlaylists, songIndex, setSongDeletingIndex, playlistIndex }) {
    return <div className="queue">
        <span className="count">Song {songIndex + 1}/{currentPlaylists[playlistIndex]?.songs?.length}</span>
        <h4>Album Queue</h4>
        <div className="queue-items">
            {
                currentPlaylists.map(cp =>
                    <div className="queue-item">
                        <img src={`https://amplify-dev.mypinata.cloud/ipfs/${cp?.album?.cover_cid}`} />
                        <div className="title">
                            <span className="song-title">{cp.title}</span>
                            <span className="album-title">{cp?.songs?.length} {cp?.songs?.length > 1 ? 'songs' : 'song'}</span>
                        </div>
                        <img src={CloseIcon} className="close" onClick={() => setSongDeletingIndex(playlistIndex)} />
                    </div>
                )
            }

        </div>
    </div>
}