import './LatestReleases.scss';
import AlbumImage from '../../../assets/images/album.png';

function LatestReleases() {
  return (
    <div id="latest-releases">
        <div className="container">
            <div className="headers">
<<<<<<< HEAD
                <h2 className="large white">Demo</h2>
                <h2 className="large red">Album</h2>
=======
                <h2 className="large white">Latest</h2>
                <h2 className="large red">Release</h2>
>>>>>>> 50304867e158f6e08b82e02a08b43782c468fe3f
            </div>

            <div className="album">
                <img src={AlbumImage} alt="Album" />
                <div className="check-all">View Sample</div>
            </div>
        </div>
    </div>
  );
}

export default LatestReleases;
