import Banner from '../../Components/Banner/index';
import Partners from '../../Components/Partners/index';
import LatestReleases from '../../Components/LatestReleases/index';
import WeAreFor from '../../Components/WeAreFor/index';
import WhatPeopleAreSaying from '../../Components/WhatPeopleAreSaying/index';
import HowItWorks from '../../Components/HowItWorks/index';
import SupportArtists from '../../Components/SupportArtists/index';
import TheTech from '../../Components/TheTech/index';
import TheTeam from '../../Components/TheTeam/index';
import ArtistRegistry from '../../Components/ArtistRegistry/index';
import ThankYou from '../../Components/ThankYou/index';
import '../../Global.scss';

function Home() {
  return (
    <>      
      <Banner />
      <Partners />
      <LatestReleases />
      <WeAreFor />
      <WhatPeopleAreSaying />
      <HowItWorks />
      <SupportArtists />
      <TheTech />
      <TheTeam />
      <ArtistRegistry />
      <HowItWorks hideTitle={true} />
      <ThankYou />
    </>
  );
}

export default Home;
