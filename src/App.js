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
import NewNFT from './Containers/NewNFT/index';

function App() {
  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/player" exact component={Player} />
          <Route path="/auth/sign-in" exact component={SignIn} />
          <Route path="/song/new" exact component={NewNFT} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
