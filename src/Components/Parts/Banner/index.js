import './Banner.scss';
import Triangle from '../../../assets/images/triangle.png';

function Banner(props) {
  const { homeContent } = props;
  return (
    <>
      <div id="banner">
          <div className="lg-text">
            <div className="top">
              <h1>Test Banner Content</h1>
              <div className="sub-text">
                <div className="line" />
                <p>sub content test</p>
              </div>
            </div>
            <h1 className="red">some cool red text</h1>
          </div>

          <div className="triangle-image"><img src={Triangle} /></div>
      </div>
    </>
  );
}

export default Banner;
