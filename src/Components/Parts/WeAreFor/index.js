import React, { useState } from 'react';
import './WeAreFor.scss';
import Aj from '../../../assets/images/aj.jpg';

function WeAreFor() {
  const [currentStep, setCurrentStep] = useState(1);

  const renderSectionContent = (currentStep) => {
    switch(currentStep) {
      case 1:
        // code block
        return (
          <div className="right-content">
            <p>Stop chasing streams! We empower you to build deep relationships with your fans, completely bypassing the traditional music industry. You maintain control of your music, pricing, and distribution while keeping 97% of your digital album sales.</p>
            <div className="img circle">
              <img src={Aj} alt="Aj" />
            </div>
          </div>
        )
      case 2:
        // code block
        return (
          <div className="right-content">
            <p>Own, buy and sell the music you love, and participate in the success of your favorite artists through fan rewards, airdrops, NFT price appreciation, and more!</p>
            <div className="img circle">
              <img src={Aj} alt="Aj" />
            </div>
          </div>
        )
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
          <div id="we-are-for">
            <div className="">
              <h2 className="medium">Who <span className="red">We're for</span></h2>
                <div className="bottom">
                  <div className="left-nav">
                    <div className={`nav-item ${currentStep === 1 && 'active'}`} onClick={() => setCurrentStep(1)}>Musicians</div>
                      <div className={`nav-item ${currentStep === 2 && 'active'}`} onClick={() => setCurrentStep(2)}>Collectors</div>
                  </div> {renderSectionContent(currentStep)}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeAreFor;
