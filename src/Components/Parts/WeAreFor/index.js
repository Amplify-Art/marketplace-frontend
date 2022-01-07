import './WeAreFor.scss';
import Em from '../../../assets/images/em.jpeg';

function WeAreFor() {
  return (
    <div id="we-are-for">
      <div className="container small">
        <h2 className="large center-text">We <span className="red">Are For</span></h2>
        <div className="bottom">
          <div className="left-nav">
            <div className="nav-item active">Musicians</div>
            <div className="nav-item">Collectors + Fans</div>
          </div>

          <div className="right-content">
            <p>Stop chasing streams! We empower you to build deep relationships with your fans, completely bypassing the traditional music industry. You maintain control of your music, pricing, and distribution while keeping 97% of your album sales, and 3% on secondary market (song sales).</p>
            <div className="img circle">
              <img src={Em} alt="Aj" />
            </div>
          </div>
        </div>
        <div className="notice">
          <p>For queries involving new artist on-boarding please email us <a href="mailto:contact@amplify.art">here.</a></p>
        </div>
      </div>
    </div>
  );
}

export default WeAreFor;
