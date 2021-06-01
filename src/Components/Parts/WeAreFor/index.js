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
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur molestiae numquam sint dolorum dolorem ad animi corporis modi incidunt maxime provident aspernatur eos deleniti ipsam quibusdam iusto, repellat libero eveniet.</p>
            <div className="img circle">
              <img src={Em} alt="Eminem" />
            </div>
          </div>
        </div>
        <div className="notice">
          <p>For queries involving new artist on-boarding please email us <a href="#">here.</a></p>
        </div>
      </div>
    </div>
  );
}

export default WeAreFor;
