import './SupportArtists.scss';

import Album2 from '../../../assets/images/album2.png';
import Album3 from '../../../assets/images/album3.png';
import Album4 from '../../../assets/images/album4.png';

function SupportArtists() {
  return (
    <div id="support-artists">
      <div className="container">
        <div className="line" />
        <h2 className="large center-text"><span className="red">Support</span> Your Favorite Artists</h2>
      </div>

      <div className="albums">
        <div className="single"><img src={Album2} alt="" /></div>
        <div className="single"><img src={Album3} alt="" /></div>
        <div className="single"><img src={Album4} alt="" /></div>
        <div className="single"><img src={Album2} alt="" /></div>
        <div className="single"><img src={Album3} alt="" /></div>
      </div>
    </div>
  );
}

export default SupportArtists;
