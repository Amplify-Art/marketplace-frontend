import './ThankYou.scss';

function ThankYou(props) {
  const { content } = props;
  return (
    <div id="thank-you">
      <div className="container center-text">
        <h2 className="large center-text">JOIN <span className="red">NOW</span></h2>
        <p>{content}</p>
        <a href="#" className="btn btn-red">Join Today</a>
      </div>
    </div>
  );
}

export default ThankYou;
