import './Banner.scss';
import Triangle from '../../../assets/images/triangle.png';

function Banner(props) {
  const { homeContent } = props;
  return (
    <>
      <div id="banner">
          <div className="lg-text">
            <div className="top">
              <h1>{homeContent.banner_text_line_one}</h1>
              <div className="sub-text">
                <div className="line" />
                <p>{homeContent.banner_sub_text}</p>
              </div>
            </div>
            <h1 className="red">{homeContent.banner_text_line_two}</h1>
          </div>

          <div className="triangle-image"><img src={Triangle} /></div>
      </div>
    </>
  );
}

export default Banner;
