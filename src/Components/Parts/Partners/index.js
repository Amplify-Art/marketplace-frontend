import './Partners.scss';

import EthLogo from '../../../assets/images/ethereum.svg';
import NearLogo from '../../../assets/images/near.png';
import ReblockLogo from '../../../assets/images/reblock.png';

function Partners() {
  return (
    <div id="our-partners">
        <div className="container">
            <div className="line" />
            <h2>Our Awesome Partners</h2>
            <div className="partner-list">
                <div className="partner"><img src={EthLogo} alt="Ethereum" /></div>
                <div className="partner"><img src={NearLogo} alt="Near" /></div>
                <div className="partner"><img src={ReblockLogo} alt="Reblock" /></div>
            </div>
        </div>
    </div>
  );
}

export default Partners;
