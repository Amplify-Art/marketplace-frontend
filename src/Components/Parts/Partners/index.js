import './Partners.scss';

function Partners(props) {
  const { partners } = props;
  return (
    <div id="our-partners">
      <div className="container">
        <div className="line" />
        <h2>Our Awesome Partners</h2>
        <div className="partner-list">
          {partners && partners.map((partner, index) => (
            <div className="partner" key={index}><img src={`https://cms.amplify.art${partner.url}`} alt={partner && partner.alternativeText ? partner.alternativeText : partner.name} /></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Partners;
