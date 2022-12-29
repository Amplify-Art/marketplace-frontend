import './SupportArtists.scss';

import AjJordan from '../../../assets/images/ajjordan.png';
import BrainiacBeats from '../../../assets/images/brainiacbeats.png';
import VjDeliria from '../../../assets/images/vjdeliria.png';
import Glassy from '../../../assets/images/glassy.png';
import Gaurika from '../../../assets/images/gaurika.png';

function SupportArtists() {
  return (
    <div id="support-artists">
      <div className="container">
        <h2 className="large center-text"><span className="red">Support</span> Your Favorite Artists</h2>
      </div>

      <div className="albums">
        <div className="single"><img src={VjDeliria} alt="vjdeliria" /></div>
        <div className="single"><img src={BrainiacBeats} alt="brainiacbeats" /></div>
        <div className="single"><img src={Gaurika} alt="gaurika" /></div>
        <div className="single"><img src={Glassy} alt="glassy" /></div>
        <div className="single"><img src={AjJordan} alt="ajjordan" /></div>
      </div>
    </div>
  );
}

export default SupportArtists;
