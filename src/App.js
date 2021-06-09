import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Header from './Components/Parts/Header/index';
import Home from './Containers/Home/index';
import Player from './Containers/Player/index';
import SignIn from './Containers/SignIn/index';
import SandBox from './Containers/Sandbox/index';
import SideSocialNav from './Components/Common/SideSocialNav/index';
import MainSideNav from './Components/Common/MainSideNav/index';

function App() {
  return (
    <>
      <Header />
      <SideSocialNav />
      <MainSideNav />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/player" exact component={Player} />
          <Route path="/auth/sign-in" exact component={SignIn} />
          <Route path="/sandbox" exact component={SandBox} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
