import './ThankYou.scss';

function ThankYou(props) {
  const { content } = props;
  return (
    <div className="padding-section-large">
      <div className="padding-global">
        <div className="container-large">
          <div id="thank-you">
            <div className="container center-text">
              <h2 className="large center-text">JOIN <span className="red">US</span></h2>
              <p>Amplified Art is only possible through the support and shared vision of artists, collectors, crypto enthusiasts, and music fans who recognize that the established music industry is broken. Together we will build a fairer system that supports and rewards artists and fans.</p>
              <a href="#" className="btn btn-red join-btn">Join Today</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
