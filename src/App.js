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
import Login from './Containers/Login/index';
import NearSuccessLogin from './Containers/Near/Success';

// Auth Wrapper
import Auth from './Containers/Auth';

function App() {
  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route path="/" exact component={Auth(Home)} />
          <Route path="/player" exact component={Auth(Player)} />
          <Route path="/auth/sign-in" exact component={Auth(SignIn)} />
          <Route path="/sandbox" exact component={Auth(SandBox)} />
          <Route path="/auth/login" exact component={Login} />
          <Route path="/near/success" exact component={Auth(NearSuccessLogin)} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
