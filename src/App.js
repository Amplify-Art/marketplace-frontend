import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Header from './Components/Header/index';
import Home from './Containers/Home/index';
import Player from './Containers/Player/index';

function App() {
  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/player" exact component={Player} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
