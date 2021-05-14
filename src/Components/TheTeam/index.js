import './TheTeam.scss';
import Em from '../../assets/images/em.jpeg';

function TheTeam() {
  const theTeam = [
    {
      handle: 'eminem',
      support_cards: 30
    },
    {
      handle: 'eminem',
      support_cards: 30
    },
    {
      handle: 'eminem',
      support_cards: 30
    },
    {
      handle: 'eminem',
      support_cards: 30
    },
    {
      handle: 'eminem',
      support_cards: 30
    },
    {
      handle: 'eminem',
      support_cards: 30
    },
    {
      handle: 'eminem',
      support_cards: 30
    },
    {
      handle: 'eminem',
      support_cards: 30
    },
    {
      handle: 'eminem',
      support_cards: 30
    },
    {
      handle: 'eminem',
      support_cards: 30
    },
    {
      handle: 'eminem',
      support_cards: 30
    },
    {
      handle: 'eminem',
      support_cards: 30
    }
  ];
  return (
    <div id="the-team">
      <div className="container">
        <div className="line" />
        <h2>The Team</h2>
        <div className="team-list">
          {theTeam.map(member => (
            <div className="team-member">
              <div className="image circle">
                <img src={Em} alt="Eminem" />
              </div>
              <p>@{member.handle}</p>
              <p className="support-card-count">{member.support_cards} Support Cards</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TheTeam;
