import React, { useState, useEffect, useRef } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Link
} from "react-router-dom";

// Containers
import Header from './Components/Parts/Header/index';
import Home from './Containers/Home/index';
import SignIn from './Containers/SignIn/index';
import SandBox from './Containers/Sandbox/index';
import ArtistProfile from './Containers/ArtistProfile/index';
<<<<<<< HEAD
import ShowCase from './Containers/ShowCase';
=======
// import ShowCase from './Containers/ShowCase';
>>>>>>> 4fe69052e5a1266e609f01f9ec36450bb67c18b4
import PlayList from './Containers/PlayList';
import SecondaryMarketplace from './Containers/SecondaryMarketplace'

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
    if (!(location.pathname === '/' || location.pathname === '/auth/login')) {
      toggleLeftSidebar(true);
      togglePlayer(true);
    }
  }, [location]);

  return (
    <>
<<<<<<< HEAD
      <GloablLoader >
        <Header path={path} />
        <SideSocialNav />
        {showLeftSidebar && <MainSideNav />}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/player" exact component={Auth(Player)} />
          <Route path="/auth/redirect" exact component={Auth(() => <></>)} />
          <Route path="/auth/sign-in" exact component={Auth(SignIn)} />
          <Route path="/sandbox" exact component={SandBox} />
          <Route path="/auth/login" exact component={Login} />
          <Route path="/near/success" exact component={Auth(NearSuccessLogin)} />
          <Route path="/albums" exact component={Albums} />
          {/* <Route path="/profile" exact component={Profile} /> */}
          <Route path="/my-profile" exact component={MyProfile} />
          <Route path="/artist/:slug" exact component={ArtistProfile} />
          {/* <Route path="/profile" exact component={Profile} /> */}
          <Route path="/showcase" exact component={ShowCase} />
          <Route path="/create-playlist" exact component={PlayList} />
          <Route path="/marketplace" exact component={SecondaryMarketplace} />
        </Switch>
        {showPlayer && <Player />}
      </GloablLoader>
=======
      <Header path={path} />
      <SideSocialNav />
      {showLeftSidebar && <MainSideNav />}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/player" exact component={Auth(Player)} />
        <Route path="/auth/sign-in" exact component={Auth(SignIn)} />
        <Route path="/sandbox" exact component={SandBox} />
        <Route path="/auth/login" exact component={Login} />
        <Route path="/near/success" exact component={Auth(NearSuccessLogin)} />
        <Route path="/albums" exact component={Albums} />
        {/* <Route path="/profile" exact component={Profile} /> */}
        <Route path="/my-profile" exact component={MyProfile} />
        <Route path="/artist/:slug" exact component={ArtistProfile} />
        {/* <Route path="/profile" exact component={Profile} /> */}
        {/* <Route path="/showcase" exact component={ShowCase} /> */}
        <Route path="/create-playlist" exact component={PlayList} />
        <Route path="/marketplace" exact component={SecondaryMarketplace} />
      </Switch>
      {showPlayer && <Player />}
>>>>>>> 4fe69052e5a1266e609f01f9ec36450bb67c18b4
    </>
  );
}

const GrabToken = () => {

}
export default App;
