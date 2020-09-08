// **** Look into adding GraphQL into Redux

import React, { useEffect } from 'react';
import { Layout } from './features/layout/Layout';
import { Cart } from './features/cart/Cart';
import { Details } from './features/details/Details';
import { NewArrivals } from './features/shop/NewArrivals';
import { Shop } from './features/shop/Shop';
import { Contact } from './features/contact/Contact';
import { Home } from './features/home/Home';
import ScrollToTop from './utils/ScrollToTop';
import { useDispatch } from 'react-redux';
import { fetchAsync } from './features/api/dataSlice';

import {
  Switch,
  Route
} from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsync())
  })
  return (
    <div className="App">
      <Switch>
        <Route path="/checkout">
          <h3>Checkout</h3>
        </Route>
        <Route path="/contact">
          <Layout component={Contact} />
        </Route>
        <Route path="/cart">
          <Layout component={Cart} />
        </Route>
        <Route path="/details/:id">
          <Layout component={Details} />
        </Route>
        <Route path="/shop/new-arrivals">
          <Layout component={NewArrivals} />
        </Route>
        <Route path="/shop">
          <Layout component={Shop} />
        </Route>
        <Route path="/">
          <Layout component={Home} />
        </Route>
      </Switch>
      <ScrollToTop />
    </div>
  );
}

export default App;
