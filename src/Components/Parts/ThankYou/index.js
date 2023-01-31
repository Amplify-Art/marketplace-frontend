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
              <p>Amplify Art is only possible through the support and shared vision of artists, collectors, crypto enthusiasts, and music fans who recognize that the established industry is broken. Together we will build a fairer system that supports and rewards artists and fans.</p>
              <div className="join-buttons">
              <a href="https://amplify.art/artists" className="btn btn-white join-btn">Visit App</a>
              <a href="#" className="btn btn-red join-btn">Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
