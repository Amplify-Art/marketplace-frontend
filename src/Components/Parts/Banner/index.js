import './Banner.scss';
import Triangle from '../../../assets/images/triangle.png';

function Banner() {
  return (
    <>
      <div id="banner">
          <div className="lg-text">
            <div className="top">
              <h1>By Creators</h1>
              <div className="sub-text">
                <div className="line" />
                <p>Lorem ipsum dolor sit amet, consecte-tur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
              </div>
            </div>
            <h1 className="red">For Creators</h1>
          </div>

          <div className="triangle-image"><img src={Triangle} /></div>
      </div>
    </>
  );
}

export default Banner;
