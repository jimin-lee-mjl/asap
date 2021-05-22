import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Recommend from './components/Recommend';
import Result from './components/Result';
import UserInfo from './components/UserInfo';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/info" component={UserInfo} />
        <Route path="/recommend" component={Recommend} />
        <Route path="/result" component={Result} />
      </Switch>
    </Router>
  );
}
