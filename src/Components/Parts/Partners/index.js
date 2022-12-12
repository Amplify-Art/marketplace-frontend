import './Partners.scss';
import NEAR from '../../../assets/images/near.png';
import Reblock from '../../../assets/images/reblock.png';

function Partners(props) {
  const { partners } = props;
  return (
    <div id="our-partners">
      <div className="container">
        <div className="line" />
        <h2>Our Awesome Partners</h2>
        <div className="partner-list">
          <div className="partner"><img src={NEAR} alt="near" /></div>
          <div className="partner"><img src={Reblock} alt="reblock" /></div>
        </div>
      </div>
    </div>
  );
}

export default Partners;
