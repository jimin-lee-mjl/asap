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
        <AuthRoute path="/password/change" component={ChangePassword} />
        <AuthRoute path="/user/delete" component={DeleteAccount} />
        <AuthRoute path="/mypage" component={MyPage} />
        <Route path="/select" component={UserSelect} />
        <Route path="/recommend" component={Recommend} />
        <Route path="/result" component={Result} />
        <AuthRoute path="/likes" component={Likes} />
        <AuthRoute path="/cart" component={Cart} />
        <AuthRoute
          exact
          path="/orderhistory/:orderId"
          component={OrderHistory}
        />
        <Route path="/order" component={Order} />
        <Route path="/payment" component={Payment} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}
