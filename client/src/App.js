import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './components/Home';
import Result from './components/Result';
import Recommend from './components/Recommend';
import {
  Register,
  Login,
  ChangePassword,
  DeleteAccount,
} from './components/Auth';
import UserSelect from './components/UserSelect';
import MyPage from './components/MyPage';
import NotFound from './components/NotFound';
import AuthRoute from './components/AuthRoute';
import Likes from './components/Likes';
import Cart from './components/Cart';
import OrderHistory from './components/OrderHistory';
import Order from './components/Order';
import Payment from './components/Payment';

export default function App() {
  const [user, setUser] = useState(null); // 로그인 된 사용자 정보
  const authenticated = user != null; // 로그인 된 사용자가 존재하는지, 인증 여부를 저장
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <AuthRoute
          authenticated={isAuthenticated}
          path="/changepassword"
          component={ChangePassword}
        />
        <AuthRoute
          authenticated={isAuthenticated}
          path="/deleteaccount"
          component={DeleteAccount}
        />
        <AuthRoute
          authenticated={isAuthenticated}
          path="/mypage"
          render={(props) => <MyPage user={user} {...props} />}
        />
        <Route path="/select" component={UserSelect} />
        <Route path="/recommend" component={Recommend} />
        <Route path="/result" component={Result} />
        <Route path="/likes" component={Likes} />
        <Route path="/cart" component={Cart} />
        <Route exact path="/orderhistory/:orderId" component={OrderHistory} />
        <Route path="/order" component={Order} />
        <Route path="/payment" component={Payment} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
