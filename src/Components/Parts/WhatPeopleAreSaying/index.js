import Slider from "react-slick";
import './WhatPeopleAreSaying.scss';
import AdamamcbrideIMG from '../../../assets/images/twitterimgs/adamamcbride.jpg';
import Hello_levesqueIMG from '../../../assets/images/twitterimgs/hello_levesque.jpg';
import Vanguard_TweetsIMG from '../../../assets/images/twitterimgs/Vanguard_Tweets.jpg';
import Donflaquito_IMG from '../../../assets/images/twitterimgs/Donflaquito_.jpg';
import IamjchaseIMG from '../../../assets/images/twitterimgs/iamjchase.jpg';
import TwitterLogo from '../../../assets/images/twitter-logo.svg';
import QuoteIcon from '../../../assets/images/quote.svg';

function WhatPeopleAreSaying() {
  const tweets = [
    {
      handle: "adamamcbride",
      tweet: "Upending the music industry through NFTs 🔥🚀",
      image: AdamamcbrideIMG
    },
    {
      handle: "hello_levesque",
      tweet: "🔥 97%...... That's more like it! #BOOM",
      image: Hello_levesqueIMG
    },
    {
      handle: "Vanguard_Tweets",
      tweet: "🎶 Amplify Art - A NFTmusic platform that will revolutionise the outdated music industry!",
      image: Vanguard_TweetsIMG
    },
    {
      handle: "Donflaquito_",
      tweet: "Join the revolution #NFTmusic",
      image: Donflaquito_IMG
    },
    {
      handle: "iamjchase",
      tweet: "Amplify Art is building an entire ecosystem for the music industry to thrive on-chain.",
      image: IamjchaseIMG
    }
  ];

  const settings = {
      dots: false,
      useTransform: false,
      lazyLoad: true,
      arrows: false,
      autoplay: true,
      infinite: true,
      variableWidth: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };

  return (
          <div id="what-people-are-saying">
          <div className="padding-global">
          <div className="padding-section-top">
            <div className="container-large">
              <div className="line" />
              <h3>What People Are Saying</h3>
            </div>
            </div>
            </div>

            <div className="tweets">
              <Slider {...settings}>
                {tweets.map((tweet) => (
                  <div className="single-tweet">
                    <h5>@{tweet.handle}</h5>
                    <div className="tweet-image circle"><img src={tweet.image} alt="twitter img" /></div>
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
