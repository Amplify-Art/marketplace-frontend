import './TheTech.scss';

function TheTech() {
  return (
    <div className="padding-section-large">
      <div className="padding-global">
        <div className="container-large">
          <div id="the-tech">
            <div className="container">
              <div className="line" />
              <h2>The Tech</h2>
              <div className="content">
                <div className="left">
                  <h3>Blockchain secured.</h3>
                  <h3>Trustless system.</h3>
                  <h3>Distributed ownership.</h3>
                </div>

                <div className="right">
                  <p>Launch, buy, and sell NFTs with complete confidence and security. Amplify Art is built on top of the <a className="red-link" href="https://near.org/">NEAR Blockchain</a>, ensuring you the highest level of ownership and provenance for your NFTs. </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TheTech;
