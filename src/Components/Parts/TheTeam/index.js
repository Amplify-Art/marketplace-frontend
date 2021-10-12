import './TheTeam.scss';
import Em from '../../../assets/images/em.jpeg';

function TheTeam() {
  const theTeam = [
    {
      handle: 'Donflaquito_',
      support_cards: 310,
      image: 'https://pbs.twimg.com/profile_images/1435794075605606400/ZhjK_Ihh_400x400.jpg',
      profile_link: 'https://twitter.com/Donflaquito_'
    },
    {
      handle: 'AmplifyArt',
      support_cards: 215,
      image: 'https://pbs.twimg.com/profile_images/1434934893318918145/9aGgDqA5_400x400.jpg',
      profile_link: 'https://twitter.com/AmplifyArt'
    },
    {
      handle: 'Russfranky',
      support_cards: 50,
      image: 'https://pbs.twimg.com/profile_images/1445860539113033728/vlGQpVuz_400x400.jpg',
      profile_link: 'https://twitter.com/Russfranky'
    },
    {
      handle: 'TLin1990',
      support_cards: 50,
      image: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
      profile_link: 'https://twitter.com/TLin1990'
    },
    {
      handle: 'Reblock_Digital',
      support_cards: 25,
      image: 'https://pbs.twimg.com/profile_images/1352359723627130881/s4JeLdWk_400x400.jpg',
      profile_link: 'https://twitter.com/Reblock_Digital'
    },
    {
      handle: 'adamamcbride',
      support_cards: 20,
      image: 'https://pbs.twimg.com/profile_images/1444671362904248326/aH7B1clE_400x400.jpg',
      profile_link: 'https://twitter.com/adamamcbride'
    },
    {
      handle: 'Coco__Bear',
      support_cards: 17,
      image: 'https://pbs.twimg.com/profile_images/1427229055586291718/_s0WPqGK_400x400.jpg',
      profile_link: 'https://twitter.com/Coco__Bear'
    },
    {
      handle: 'iamjchase',
      support_cards: 15,
      image: 'https://pbs.twimg.com/profile_images/1311641398840627200/yR42Ugw8_400x400.jpg',
      profile_link: 'https://twitter.com/iamjchase'
    },
    {
      handle: 'vzcek',
      support_cards: 10,
      image: 'https://pbs.twimg.com/profile_images/1442530769805717507/FEp_01tv_400x400.jpg',
      profile_link: 'https://twitter.com/vzcek'
    },
    {
      handle: 'arc4g',
      support_cards: 15,
      image: 'https://pbs.twimg.com/profile_images/1195946508006412293/ZKddKyho_400x400.jpg',
      profile_link: 'https://twitter.com/arc4g'
    },
    {
      handle: 'chasel3000',
      support_cards: 15,
      image: 'https://pbs.twimg.com/profile_images/1417554823495442436/kN5pey33_400x400.jpg',
      profile_link: 'https://twitter.com/chasel3000'
    },
    {
      handle: 'surf_defi',
      support_cards: 10,
      image: 'https://pbs.twimg.com/profile_images/1357348242225156096/AUcBUHxq_400x400.jpg',
      profile_link: 'https://twitter.com/surf_defi'
    }
  ];
  return (
    <div id="the-team">
      <div className="container">
        <div className="line" />
        <h2>The Team & Supporters</h2>
        <div className="team-list">
          {theTeam.map(member => (
            <a href={member.profile_link}>
            <div className="team-member">
              <div className="image circle">
                <img src={member.image} alt="Eminem" />
              </div>
              <p>@{member.handle}</p>
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
