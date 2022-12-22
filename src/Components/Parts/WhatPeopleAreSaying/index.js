import Slider from "react-slick";
import './WhatPeopleAreSaying.scss';
import Em from '../../../assets/images/em.jpeg';
import TwitterLogo from '../../../assets/images/twitter-logo.svg';
import QuoteIcon from '../../../assets/images/quote.svg';

function WhatPeopleAreSaying() {
  const tweets = [
    {
      handle: "adamamcbride",
      tweet: "Upending the music industry through NFTs 🔥🚀",
      image: "https://pbs.twimg.com/profile_images/1557794495927812097/d32deKcy_400x400.png"
    },
    {
      handle: "hello_levesque",
      tweet: "🔥 97%...... That's more like it! #BOOM",
      image: "https://pbs.twimg.com/profile_images/1435313316667199490/nchdOw8-_400x400.jpg"
    },
    {
      handle: "Vanguard_Tweets",
      tweet: "🎶 Amplify Art! A NFT music platform that will revolutionise the outdated music industry!",
      image: "https://pbs.twimg.com/profile_images/1521601422466371584/yKKeaE90_400x400.jpg"
    },
    {
      handle: "Donflaquito_",
      tweet: "Join the revolution #NFTmusic",
      image: "https://pbs.twimg.com/profile_images/1476740998365548545/PsSJjVgS_400x400.jpg"
    },
    {
      handle: "eminem",
      tweet: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti soluta consequuntur commodi dolor non",
      image: "https://globalnews.ca/wp-content/uploads/2015/12/nwa.jpg"
    }
  ];

  const settings = {
    dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
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
            slidesToScroll: 1
          }
        }
      ]
  };

  return (
    <div className="padding-section-large">
      <div className="padding-global">
        <div className="container-large">
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
                    <div className="tweet-image circle"><img src={tweet.image} alt="Eminem" /></div>
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
        </div>
      </div>
    </div>
  );
}

export default WhatPeopleAreSaying;
