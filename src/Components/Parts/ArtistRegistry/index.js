import './ArtistRegistry.scss';
import AlbumFive from '../../../assets/images/album5.png';

function ThankYou() {
  return (
    <div className="padding-section-large">
      <div className="padding-global">
        <div className="container-large">
          <div id="artist-registry">
            <div className="container">
              <div className="left">
                <h2 className="large">Artist <span className="red">Registry</span></h2>
              </div>
              <div className="right">
                <div className="top">
                  <a href="#">APPLY HERE</a>
                </div>
                <img src={AlbumFive} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>    
  );
}

export default ThankYou;
