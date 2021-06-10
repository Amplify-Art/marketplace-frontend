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
