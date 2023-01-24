import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Banner from '../../Components/Parts/Banner/index';
import Partners from '../../Components/Parts/Partners/index';
import LatestReleases from '../../Components/Parts/LatestReleases/index';
import WeAreFor from '../../Components/Parts/WeAreFor/index';
import WhatPeopleAreSaying from '../../Components/Parts/WhatPeopleAreSaying/index';
import HowItWorks from '../../Components/Parts/HowItWorks/index';
import SupportArtists from '../../Components/Parts/SupportArtists/index';
import TheTech from '../../Components/Parts/TheTech/index';
import TheTeam from '../../Components/Parts/TheTeam/index';
import ArtistRegistry from '../../Components/Parts/ArtistRegistry/index';
import ThankYou from '../../Components/Parts/ThankYou/index';
import '../../Global.scss';

function Home() {
  const [homeContent, setHomeContent] = useState({});

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
      {/* <ArtistRegistry /> */}
      <ThankYou />
    </>
  );
}

export default Home;
