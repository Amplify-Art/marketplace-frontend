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
            <h3>Artist Onboarding</h3>
            <p>To avoid centralized gatekeeping, we've given our early backers <a>(Support Card NFT Holders)</a> exclusive access to the artist on-boarding process. These Support Card NFTs have embedded utility - giving holders the ability to vote once per month on Artists in the registry pool. At the end of the month, the top two users with the most votes gain access to the “Artist Dashboard” which gives them This is ONE</p>
          </div>
        )
        break;
      case 2:
        // code block
        return (
          <div className="content">
            <span className="count">Step 02</span>
            <h3>Artist Onboarding</h3>
            <p>To avoid centralized gatekeeping, we've given our early backers <a>(Support Card NFT Holders)</a> exclusive access to the artist on-boarding process. These Support Card NFTs have embedded utility - giving holders the ability to vote once per month on Artists in the registry pool. At the end of the month, the top two users with the most votes gain access to the “Artist Dashboard” which gives them the ability to mint and sell Digital Album NFTs.
    
            *To be included in the monthly Registry Pool, please connect your Near wallet and look for “Nominate” link in the menu.</p>
          </div>
        )
        break;
      case 3:
        // code block
        return (
          <div className="content">
            <span className="count">Step 03</span>
            <h3>Artist Onboarding</h3>
            <p>To avoid centralized gatekeeping, we've given our early backers <a>(Support Card NFT Holders)</a> exclusive access to the artist on-boarding process. These Support Card NFTs have embedded utility - giving holders the ability to vote once per month on Artists in the registry pool. At the end of the month, the top two users with the most votes gain access to the “THIStal Album NFTs.
    
            *To be included in the monthly Registry Pool, please connect your Near wallet and look for “Nominate” link in the menu.</p>
          </div>
        )
        break;
      case 4:
        // code block
        return (
          <div className="content">
            <span className="count">Step 04</span>
            <h3>Artist Onboarding</h3>
            <p>To avoid centralized gatekeeping, we've given our early backers <a>(Support Card NFT Holders)</a> exclusive access to the artist on-boarding process. These Support Card NFTs have embedded utility - giving holders the ability to vote once per month on Artists in the registry pool. At the end of the month, the top two users with the most votes gain access to the “Artist Dashboard” which gives them the ability to mint and sell Digital Album NFTs.
    
            *To be included in the monthly Registry Pool, please connect your Near wallet and look for “Nominate” link in the menu.</p>
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
            <p>Musicians aren't being paid their value. Fans want more variety. We give a solution for the up and coming and the existing star.</p>
          </div>
          {/* End Right */}
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
