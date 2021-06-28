import React, { useState, useEffect } from 'react';

import { Switch, Route, useLocation,Redirect, useHistory } from "react-router-dom";
import jwt_decode from 'jwt-decode';

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
import Nominate from './Containers/Nominate'

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

function App(props) {
  let history = useHistory();
  let location = useLocation();
  const [path, setPath] = useState('');
  const [showLeftSidebar, toggleLeftSidebar] = useState(false);
  const [showPlayer, togglePlayer] = useState(false);
  const [bannerImage, setBannerImage] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [userName, setUserName] = useState('');
  const user = localStorage.getItem('amplify_app_token')
  useEffect(() => {
    setPath(location.pathname);
    if(location.pathname === "/logout") {
      localStorage.removeItem('amplify_app_token')
      history.push("/") 
    }
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
  }, [path]);

  useEffect(() => {
    const token = localStorage.getItem('amplify_app_token');
    if (token) {
      const decodedToken = jwt_decode(token);
      setBannerImage(decodedToken.banner);
      setProfileImage(decodedToken.avatar);
      setUserName(decodedToken.username);
    }
  }, []);

  return (
    <>
      <GloablLoader >
        <Header path={path} />
        <SideSocialNav />
        {showLeftSidebar && <MainSideNav />}
        <Switch>
          <Route path="/" exact render={() => user ? <Redirect to='/my-profile' /> : <Home />} />
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
          <Route path="/artist-dashboard" exact component={ArtistDashboard} />
          <Route path="/support-card" exact component={SupportCard} />
          <Route path='/nominate' exact component={Nominate} />
          <Route component={PageNotFound} />
        </Switch>
        {showPlayer && <Player avatar={profileImage} />}
      </GloablLoader>
    </>
  );
}

const GrabToken = () => {

}
export default App;
