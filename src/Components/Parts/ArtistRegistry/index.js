import './ArtistRegistry.scss';
import AlbumFive from '../../../assets/images/album5.png';

function ThankYou() {
  return (
    <div id="artist-registry">
      <div className="container">
        <div className="left">
          <h2 className="large">Artist <span className="red">Registry</span></h2>
        </div>
        <div className="right">
          <div className="top">
            <a href="#">Register Today</a>
          </div>
          <img src={AlbumFive} />
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
