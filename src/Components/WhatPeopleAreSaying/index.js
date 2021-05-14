import './WhatPeopleAreSaying.scss';
import Em from '../../assets/images/em.jpeg';
import TwitterLogo from '../../assets/images/twitter-logo.svg';
import QuoteIcon from '../../assets/images/quote.svg';

function WhatPeopleAreSaying() {
  return (
    <div id="what-people-are-saying">
      <div className="container">
        <div className="line" />
        <h3>What People Are Saying</h3>
      </div>

      <div className="tweets">
        <div className="single-tweet">
          <h5>@username</h5>
          <div className="tweet-image circle"><img src={Em} alt="Eminem" /></div>
          <div className="tweet-content">
            <div className="quote"><img src={QuoteIcon} alt="Quote" /></div>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti soluta consequuntur commodi dolor non</p>
          </div>
          <div className="twitter-logo">
            <img src={TwitterLogo} alt="Twitter" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatPeopleAreSaying;
