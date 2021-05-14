import Header from './Components/Header/index';
import Banner from './Components/Banner/index';
import Partners from './Components/Partners/index';
import LatestReleases from './Components/LatestReleases/index';
import WeAreFor from './Components/WeAreFor/index';
import WhatPeopleAreSaying from './Components/WhatPeopleAreSaying/index';
import HowItWorks from './Components/HowItWorks/index';
import SupportArtists from './Components/SupportArtists/index';
import './Global.scss';

function App() {
  return (
    <>
      <Header />
      <Banner />
      <Partners />
      <LatestReleases />
      <WeAreFor />
      <WhatPeopleAreSaying />
      <HowItWorks />
      <SupportArtists />
    </>
  );
}

export default App;
