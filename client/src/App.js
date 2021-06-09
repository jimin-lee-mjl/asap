import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from './actions/auth';

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
import Footer from './components/Footer';

export default function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <AuthRoute
          authenticated={isAuthenticated}
          path="/password/change"
          component={ChangePassword}
        />
        <AuthRoute
          authenticated={isAuthenticated}
          path="/user/delete"
          component={DeleteAccount}
        />
        <AuthRoute
          authenticated={isAuthenticated}
          path="/mypage"
          render={(props) => <MyPage />}
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
      <Footer />
    </Router>
  );
}
