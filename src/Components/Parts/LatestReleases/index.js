import './LatestReleases.scss';
import AlbumImage from '../../../assets/images/album.png';

function LatestReleases() {
  return (
    <div id="latest-releases">
        <div className="container">
            <div className="headers">
                <h2 className="large white">Latest</h2>
                <h2 className="large red">Release</h2>
            </div>

            <div className="album">
                <img src={AlbumImage} alt="Album" />
                <div className="check-all">LISTEN HERE ♫</div>
            </div>
        </div>
    </div>
  );
}

export default LatestReleases;
