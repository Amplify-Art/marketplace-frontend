import React, { useState, useEffect } from 'react';

import { Switch, Route, useLocation } from "react-router-dom";

// Containers
import Header from './Components/Parts/Header/index';
import Home from './Containers/Home/index';
import SignIn from './Containers/SignIn/index';
import SandBox from './Containers/Sandbox/index';
import ArtistProfile from './Containers/ArtistProfile/index';
import SecondaryMarketplace from './Containers/SecondaryMarketplace'
import ArtistDashboard from './Containers/ArtistDashbord';
import SupportCard from './Containers/SupportCard';
import PageNotFound from './Containers/PageNotFound';

// Auth Wrapper
import Auth from './Containers/Auth';

//Auth
import Login from './Containers/Login/index';
import NearSuccessLogin from './Containers/Near/Success';

import Albums from './Containers/Albums/index';
import MyProfile from './Containers/MyProfile/index';

// Parts
import SideSocialNav from './Components/Common/SideSocialNav/index';
import MainSideNav from './Components/Common/MainSideNav/index';
import Player from './Components/Common/Player/index';

// Global Loader
import GloablLoader from './Components/Common/Loading/index';

function App() {
  const [path, setPath] = useState('');
  const [showLeftSidebar, toggleLeftSidebar] = useState(false);
  const [showPlayer, togglePlayer] = useState(false);
  let location = useLocation();
  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  useEffect(() => {
    if (!path)
      return
    if (!["/", "/auth/login"].includes(path)) {
      toggleLeftSidebar(true);
      togglePlayer(true);
    } else {
      toggleLeftSidebar(false);
      togglePlayer(false);
    }
  }, [path])

  return (
    <>
      <GloablLoader >
        <Header path={path} />
        <SideSocialNav />
        {showLeftSidebar && <MainSideNav />}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/player" exact component={Auth(Player)} />
          <Route path="/auth/redirect" exact component={Auth(() => <></>)} />
          <Route path="/wallet" exact component={Auth(SignIn)} />
          <Route path="/sandbox" exact component={Auth(SandBox)} />
          <Route path="/auth/login" exact component={Login} />
          <Route path="/near/success" exact component={Auth(NearSuccessLogin)} />
          <Route path="/albums" exact component={Albums} />
          {/* <Route path="/profile" exact component={Profile} /> */}
          <Route path="/my-profile" exact component={MyProfile} />
          <Route path="/artist/:slug" exact component={ArtistProfile} />
          <Route path="/marketplace" exact component={SecondaryMarketplace} />
          <Route path="/artist-dashboard/:slug" exact component={ArtistDashboard} />
          <Route path="/support-card" exact component={SupportCard} />
          <Route component={PageNotFound} />
        </Switch>
        {showPlayer && <Player />}
      </GloablLoader>
    </>
  );
}

const GrabToken = () => {

}
export default App;
