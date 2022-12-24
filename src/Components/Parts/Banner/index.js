import './Banner.scss';
import Triangle from '../../../assets/images/triangle.png';

function Banner(props) {
  const { homeContent } = props;
  return (
    <>
      <div  id="banner" className="padding-section-fullheight">
        <div className="padding-banner">
          <div className="container-large">
            <div className="hero_section">

                <div className="top">
                  <h1 className="hero-heading">A Music</h1>
                    <div className="paragraph-text">
                      <div className="line" />
                        <p>Own music for the first time by purchasing exclusive  NFTs  from your favorite artists!</p>
                      </div>
                    </div>
                    <div className="bottom">
                  <h1 className="red">Marketplace</h1>
                  <div className="mobile-paragraph-text">
                  <p>Own music for the first time by purchasing exclusive  NFTs  from your favorite artists!</p>
                  </div>
                  </div>

              </div>
            <div className="triangle-image"><img src={Triangle} /></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
