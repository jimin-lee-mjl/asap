import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import UserInfo from './components/UserInfo';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/info" component={UserInfo} />
      </Switch>
    </Router>
  );
}
