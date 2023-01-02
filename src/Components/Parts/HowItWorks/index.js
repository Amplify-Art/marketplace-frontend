import React, { useState } from 'react';
import './HowItWorks.scss';

function HowItWorks(props) {
  const [currentStep, setCurrentStep] = useState(1);

  const renderSectionContent = (currentStep) => {
    switch(currentStep) {
      case 1:
        // code block
        return (
          <div className="content">
            <span className="count">Step 01</span>
            <h3>Decentralized Onboarding</h3>
            <p>To prevent centralized control, we've granted our initial backers —<a className="team-link" href="#the-team">Support Card NFT Holders</a>— exclusive access to the artist onboarding process. These NFTs provide holders the ability to vote once per month on artists in the registry pool. At the end of the month, the two artists with the most votes will gain access to the "Artist Dashboard", which allows them to mint and sell Digital Album NFTs.</p>
          </div>
        )
        break;
      case 2:
        // code block
        return (
          <div className="content">
            <span className="count">Step 02</span>
            <h3>Album Minting</h3>
            <p>Once an artist has been granted access to their dashboard, they can then mint "Digital Album NFTs," which are a collection of songs attached to a single point of sale. This is similar to purchasing a physical CD. In this transaction, the artist receives 97% of the album sale, while the remaining 3% is distributed among the support card NFT holders.</p>
          </div>
        )
        break;
      case 3:
        // code block
        return (
          <div className="content">
            <span className="count">Step 03</span>
            <h3>Secondary (Song) Market</h3>
            <p>While complete albums are only available for purchase directly from the artist, it is still possible to acquire individual tracks on the secondary market. This option may be necessary if you missed the initial release or if you only want to purchase select tracks from the album.</p>
          </div>
        )
        break;
      case 4:
        // code block
        return (
          <div className="content">
            <span className="count">Step 04</span>
            <h3>Custom Playlisting ™</h3>
            <p>Using the “Player Queue” you can populate your own custom made playlists from the tracks you own or discover others in the
“Published Playlist” section (coming soon). Creating and publishing playlists is easy and soon to be lucrative where you can
earn our native token each time the track is played from the ones you created.</p>
          </div>
        )
        break;
      default:
        // code block
        return (
          <p>Something</p>
        )
    }
  }
  return (
    <div className="padding-section-large">
      <div className="padding-global">
        <div className="container-large">
          <div id="how-it-works">
            <div className="container">
              {props.hideTitle !== true && <h2 className="large center-text">How It <span className="red">Works</span></h2>}
              <div className="bottom">
                <div className="left">
                  <div className="left-nav">
                    <div className={`count ${currentStep === 1 && 'active'}`} onClick={() => setCurrentStep(1)}>01</div>
                    <div className={`count ${currentStep === 2 && 'active'}`} onClick={() => setCurrentStep(2)}>02</div>
                    <div className={`count ${currentStep === 3 && 'active'}`} onClick={() => setCurrentStep(3)}>03</div>
                    <div className={`count ${currentStep === 4 && 'active'}`} onClick={() => setCurrentStep(4)}>04</div>
                  </div>

                  {renderSectionContent(currentStep)}
                </div>
                {/* End Left */}

                <div className="right">
                  <div className="line" />
                  <h4>Why it Works</h4>
                  <p>NFTs enable a powerful reward loop between the artist and fans. Where fans promote the artists they love, and artists reward the fans for their support — without gatekeepers.</p>
                </div>
                {/* End Right */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
