import './Partners.scss';
import NEAR from '../../../assets/images/near.svg';
import Reblock from '../../../assets/images/reblock.svg';
import Mintbase from '../../../assets/images/mintbase.svg';
import Pinata from '../../../assets/images/pinata.svg';
import RefFinance from '../../../assets/images/reffinance.svg';

function Partners(props) {
  const { partners } = props;
  return (
  <div id="our-partners" className="partner-section">
    <div className="partner-section-padding">
      <div className="padding-global">
      <div className="container-large">
        <div className="section-header">
          <div className="line" />
            <h2>Our Awesome Partners</h2>
          </div>
        <div className="partner-logo-list">
          <a href="https://near.org/" className="logo"><img src={NEAR} alt="near" /></a>
          <a href="https://reblock.ventures/" className="logo"><img src={Reblock} alt="reblock" /></a>
          <a href="https://www.mintbase.io/" className="logo"><img src={Mintbase} alt="mintbase" /></a>
          <a href="https://www.pinata.cloud/" className="logo"><img src={Pinata} alt="pinata" /></a>
          <a href="https://www.ref.finance/" className="logo"><img src={RefFinance} alt="reffinance" /></a>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Partners;
