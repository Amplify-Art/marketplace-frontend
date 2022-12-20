import React, { useState } from 'react';
import './WeAreFor.scss';
import Em from '../../../assets/images/em.jpeg';

function WeAreFor() {
  const [currentStep, setCurrentStep] = useState(1);

  const renderSectionContent = (currentStep) => {
    switch(currentStep) {
      case 1:
        // code block
        return (
          <div className="right-content">
            <p>Stop chasing streams! We empower you to build deep relationships with your fans, completely bypassing the traditional music industry. You maintain control of your music, pricing, and distribution while keeping 97% of your album sales, and 3% on secondary market (song sales).</p>
            <div className="img circle">
              <img src={Em} alt="Aj" />
            </div>
          </div>
        )
      case 2:
        // code block
        return (
          <div className="right-content">
            <p>22222Stop chasing streams! We empower you to build deep relationships with your fans, completely bypassing the traditional music industry. You maintain control of your music, pricing, and distribution while keeping 97% of your album sales, and 3% on secondary market (song sales).</p>
            <div className="img circle">
              <img src={Em} alt="Aj" />
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
    <div id="we-are-for">
      <div className="container small">
        <h2 className="large center-text">Who <span className="red">We're for</span></h2>
        <div className="bottom">
          <div className="left-nav">
            <div className={`nav-item ${currentStep === 1 && 'active'}`} onClick={() => setCurrentStep(1)}>Musicians</div>
            <div className={`nav-item ${currentStep === 2 && 'active'}`} onClick={() => setCurrentStep(2)}>Collectors + Fans</div>
          </div>

          {renderSectionContent(currentStep)}
        </div>
        <div className="notice">
          <p>For queries involving new artist on-boarding please email us <a href="mailto:contact@amplify.art">here.</a></p>
        </div>
      </div>
    </div>
  );
}

export default WeAreFor;
