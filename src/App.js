import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Containers
import Header from './Components/Parts/Header/index';
import Home from './Containers/Home/index';
import SignIn from './Containers/SignIn/index';
import SandBox from './Containers/Sandbox/index';

// Auth Wrapper
import Auth from './Containers/Auth';

//Auth
import Login from './Containers/Login/index';
import NearSuccessLogin from './Containers/Near/Success';

import Albums from './Containers/Albums/index';
import Profile from './Containers/Profile/index';

// Parts
import SideSocialNav from './Components/Common/SideSocialNav/index';
import MainSideNav from './Components/Common/MainSideNav/index';
import Player from './Components/Common/Player/index';

function App() {
  return (
    <>
      <Header />
      <SideSocialNav />
      <MainSideNav />
      <Router>
        <Switch>
          <Route path="/" exact component={Auth(Home)} />
          <Route path="/player" exact component={Auth(Player)} />
          <Route path="/auth/sign-in" exact component={Auth(SignIn)} />
          <Route path="/sandbox" exact component={Auth(SandBox)} />
          <Route path="/auth/login" exact component={Login} />
          <Route path="/near/success" exact component={Auth(NearSuccessLogin)} />
          <Route path="/" exact component={Home} />
          <Route path="/auth/sign-in" exact component={SignIn} />
          <Route path="/sandbox" exact component={SandBox} />
          <Route path="/albums" exact component={Albums} />
          <Route path="/profile" exact component={Profile} />
        </Switch>
      </Router>
      <Player />
    </>
  );
}

export default App;
