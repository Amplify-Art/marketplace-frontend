import './HowItWorks.scss';

function HowItWorks(props) {
  return (
    <div id="how-it-works">
      <div className="container">
        {props.hideTitle !== true && <h2 className="large center-text">How It <span className="red">Works</span></h2>}
        <div className="bottom">
          <div className="left">
            <div className="left-nav">
              <div className="count active">01</div>
              <div className="count">02</div>
              <div className="count">03</div>
              <div className="count">04</div>
            </div>

            <div className="content">
              <span className="count">Step 01</span>
              <h3>Artists upload original music</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt soluta eveniet, quaerat adipisci perspiciatis mollitia error minima laborum dicta numquam consequatur rem id voluptatibus est, perferendis, voluptate temporibus impedit quae?</p>
            </div>
          </div>
          {/* End Left */}

          <div className="right">
            <div className="line" />
            <h4>Why it Works</h4>
            <p>Musicians aren't being paid their value. Fans want more variety. We give a solution for the up and coming and the existing star.</p>
          </div>
          {/* End Right */}
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
