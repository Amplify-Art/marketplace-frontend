import './SupportArtists.scss';

import AjJordan from '../../../assets/images/ajjordan.png';
import BrainiacBeats from '../../../assets/images/brainiacbeats.png';
import VjDeliria from '../../../assets/images/vjdeliria.png';
import Glassy from '../../../assets/images/glassy.png';
import Gaurika from '../../../assets/images/gaurika.png';

function SupportArtists() {
  return (
    <div className="support-padding-section">
      <div className="support-padding">
        <div className="container-large">
          <div id="support-artists">

              <h2 className="large center-text"><span className="red">Support</span> Your <br />Favorite Artists</h2>

            <div className="albums">
              <div className="single"><img src={VjDeliria} alt="vjdeliria" /></div>
              <div className="single"><img src={BrainiacBeats} alt="brainiacbeats" /></div>
              <div className="single"><img src={Gaurika} alt="gaurika" /></div>
              <div className="single"><img src={Glassy} alt="glassy" /></div>
              <div className="single"><img src={AjJordan} alt="ajjordan" /></div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportArtists;
