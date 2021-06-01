import Slider from "react-slick";
import './WhatPeopleAreSaying.scss';
import Em from '../../../assets/images/em.jpeg';
import TwitterLogo from '../../../assets/images/twitter-logo.svg';
import QuoteIcon from '../../../assets/images/quote.svg';

function WhatPeopleAreSaying() {
  const tweets = [
    {
      handle: "eminem",
      tweet: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti soluta consequuntur commodi dolor non"
    },
    {
      handle: "eminem",
      tweet: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti soluta consequuntur commodi dolor non"
    },
    {
      handle: "eminem",
      tweet: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti soluta consequuntur commodi dolor non"
    },
    {
      handle: "eminem",
      tweet: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti soluta consequuntur commodi dolor non"
    },
    {
      handle: "eminem",
      tweet: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti soluta consequuntur commodi dolor non"
    }
  ];

  const settings = {
    dots: false,
    arrows: false,
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        }
      }
    ]
  };

  return (
    <div id="what-people-are-saying">
      <div className="container">
        <div className="line" />
        <h3>What People Are Saying</h3>
      </div>

      <div className="tweets">
        <Slider {...settings}>
          {tweets.map((tweet) => (
            <div className="single-tweet">
              <h5>@{tweet.handle}</h5>
              <div className="tweet-image circle"><img src={Em} alt="Eminem" /></div>
              <div className="tweet-content">
                <div className="quote"><img src={QuoteIcon} alt="Quote" /></div>
                <p>{tweet.tweet}</p>
              </div>
              <div className="twitter-logo">
                <img src={TwitterLogo} alt="Twitter" />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default WhatPeopleAreSaying;
