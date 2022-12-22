import './TheTeam.scss';
import AmplifyArtIMG from '../../../assets/images/teamimgs/amplifyart.png';
import DonflaquitoIMG from '../../../assets/images/teamimgs/donflaquito.jpg';
import RussIMG from '../../../assets/images/teamimgs/russ.jpg';
import TommyIMG from '../../../assets/images/teamimgs/tommy.png';
import RolandIMG from '../../../assets/images/teamimgs/roland.jpg';
import NoahIMG from '../../../assets/images/teamimgs/noah.png';
import ReblockIMG from '../../../assets/images/teamimgs/reblock.jpg';
import AdamIMG from '../../../assets/images/teamimgs/adam.png';
import CocoIMG from '../../../assets/images/teamimgs/coco.jpg';
import JonathonIMG from '../../../assets/images/teamimgs/jonathon.jpg';
import AjIMG from '../../../assets/images/teamimgs/aj.jpg';
import VzcekIMG from '../../../assets/images/teamimgs/vz.jpg';
import ChaseIMG from '../../../assets/images/teamimgs/chase.jpg';
import SurfIMG from '../../../assets/images/teamimgs/surf.jpg';

function TheTeam() {
  const theTeam = [
    {
      handle: 'amplifyart.near',
      support_cards: 250,
      image: AmplifyArtIMG,
      profile_link: ''
    },
    {
      handle: 'donflaquito.near',
      support_cards: 100,
      image: DonflaquitoIMG,
      profile_link: ''
    },
    {
      handle: 'russ.near',
      support_cards: 50,
      image: RussIMG,
      profile_link: ''
    },
    {
      handle: 'txlin.near',
      support_cards: 50,
      image: TommyIMG,
      profile_link: ''
    },
    {
      handle: 'rologajate.near',
      support_cards: 40,
      image: RolandIMG,
      profile_link: ''
    },
    {
      handle: 'noahgoldstein.near',
      support_cards: 40,
      image: NoahIMG,
      profile_link: ''
    },
    {
      handle: 'bdee.near',
      support_cards: 25,
      image: ReblockIMG,
      profile_link: ''
    },
    {
      handle: 'adammcbride.near',
      support_cards: 20,
      image: AdamIMG,
      profile_link: ''
    },
    {
      handle: 'cocobear.near',
      support_cards: 17,
      image: CocoIMG,
      profile_link: ''
    },
    {
      handle: '2n10se.near',
      support_cards: 10,
      image: JonathonIMG,
      profile_link: ''
    },
    {
      handle: 'itsaj.near',
      support_cards: 10,
      image: AjIMG,
      profile_link: ''
    },
    {
      handle: 'vzcek.near',
      support_cards: 10,
      image: VzcekIMG,
      profile_link: ''
    },
    {
      handle: 'chasel3000.near',
      support_cards: 10,
      image: ChaseIMG,
      profile_link: ''
    },
    {
      handle: 'surf_finance.near',
      support_cards: 10,
      image: SurfIMG,
      profile_link: ''
    }
  ];
  return (
    <div className="padding-section-large">
      <div className="padding-global">
        <div className="container-large">
          <div id="the-team">
            <div className="container">
              <div className="line" />
              <h2>Our Team and Supporters</h2>
              <div className="team-list">
                {theTeam.map(member => (
                  <a href={member.profile_link}>
                  <div className="team-member">
                    <div className="image circle">
                      <img src={member.image} alt="supporter image" />
                    </div>
                    <p>{member.handle}</p>
                    <p className="support-card-count">{member.support_cards} Support Cards</p>
                  </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TheTeam;
