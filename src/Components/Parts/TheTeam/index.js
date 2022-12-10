import './TheTeam.scss';

function TheTeam() {
  const theTeam = [
    {
      handle: 'donflaquito.near',
      support_cards: 310,
      image: '',
      profile_link: 'https://amplify.art/user/donflaquito'
    },
    {
      handle: 'amplifyart.near',
      support_cards: 215,
      image: '',
      profile_link: 'https://amplify.art/user/amplifyart'
    },
    {
      handle: 'russ.near',
      support_cards: 50,
      image: '',
      profile_link: 'https://amplify.art/user/russ'
    },
    {
      handle: 'txlin.near',
      support_cards: 50,
      image: '',
      profile_link: 'https://amplify.art/user/txlin'
    },
    {
      handle: 'bdee.near',
      support_cards: 25,
      image: '',
      profile_link: 'https://amplify.art/user/bdee'
    },
    {
      handle: 'adammcbride.near',
      support_cards: 20,
      image: '',
      profile_link: 'https://amplify.art/user/adammcbride'
    },
    {
      handle: 'cocobear.near',
      support_cards: 17,
      image: '',
      profile_link: 'https://amplify.art/user/cocobear'
    },
    {
      handle: 'itsaj.near',
      support_cards: 15,
      image: '',
      profile_link: 'https://amplify.art/user/itsaj'
    },
    {
      handle: 'vzcek.near',
      support_cards: 10,
      image: '',
      profile_link: 'https://amplify.art/user/vzcek'
    },
    {
      handle: 'rainfall.near',
      support_cards: 15,
      image: '',
      profile_link: 'https://amplify.art/user/rainfall'
    },
    {
      handle: 'chasel3000.near',
      support_cards: 15,
      image: '',
      profile_link: 'https://amplify.art/user/chasel3000'
    },
    {
      handle: 'surf_finance.near',
      support_cards: 10,
      image: '',
      profile_link: 'https://amplify.art/user/surf_finance'
    }
  ];
  return (
    <div id="the-team">
      <div className="container">
        <div className="line" />
        <h2>The Team and Supporters</h2>
        <div className="team-list">
          {theTeam.map(member => (
            <a href={member.profile_link}>
            <div className="team-member">
              <div className="image circle">
                <img src={member.image} alt="UserName" />
              </div>
              <p>{member.handle}</p>
              <p className="support-card-count">{member.support_cards} Support Cards</p>
            </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TheTeam;
