import './Banner.scss';
import Triangle from '../../../assets/images/triangle.png';

function Banner(props) {
  const { homeContent } = props;
  return (
    <>
      <div id="banner">
          <div className="lg-text">
            <div className="top">
              <h1>A Music</h1>
              <div className="sub-text">
                <div className="line" />
                <p>Own music for the first time by purchasing exclusive  NFTs  from your favorite artists.</p>
              </div>
            </div>
            <h1 className="red">Marketplace</h1>
          </div>

          <div className="triangle-image"><img src={Triangle} /></div>
      </div>
    </>
  );
}

export default Banner;
