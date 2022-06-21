import './TheTeam.scss';
import Em from '../../../assets/images/em.jpeg';

function TheTeam() {
  const theTeam = [
    {
      handle: 'Donflaquito_',
      support_cards: 310
    },
    {
      handle: 'AmplifyArt',
      support_cards: 215
    },
    {
      handle: 'Russfranky',
      support_cards: 50
    },
    {
      handle: 'TLin1990',
      support_cards: 50
    },
    {
      handle: 'Reblock_Digital',
      support_cards: 25
    },
    {
      handle: 'adamamcbride',
      support_cards: 20
    },
    {
      handle: 'iamjchase',
      support_cards: 15
    },
    {
      handle: 'vzcek',
      support_cards: 10
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
