import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Recommend from './components/Recommend';
import Result from './components/Result';
import Login from './components/Login';
import Register from './components/Register';
import UserInfo from './components/UserInfo';
import MyPage from './components/MyPage';
import NotFound from './components/NotFound';
import AuthRoute from './components/AuthRoute';


export default function App() {
  const [user, setUser] = useState(null); // 로그인 된 사용자 정보
  const authenticated = user != null; // 로그인 된 사용자가 존재하는지, 인증 여부를 저장

  console.log(authenticated);

  // const login = ({ email, password }) => setUser(signIn({ email, password }));
  const login = () => {};
  const logout = () => setUser(null);

  // backend 통신 테스트 코드
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/hello')
      .then((response) => console.log(response.data));
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <AuthRoute
          authenticated={authenticated}
          path="/mypage"
          render={(props) => <MyPage user={user} {...props} />}
        />
        <Route path="/info" component={UserInfo} />
        <Route path="/mypage" component={MyPage} />
        <Route path="/recommend" component={Recommend} />
        <Route path="/result" component={Result} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
