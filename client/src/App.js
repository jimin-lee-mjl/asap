import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import UserInfo from './components/UserInfo';
import MyPage from './components/MyPage';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/info" component={UserInfo} />
        <Route path="/mypage" component={MyPage} />
      </Switch>
    </Router>
  );
}
