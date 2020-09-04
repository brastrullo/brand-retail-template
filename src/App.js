// **** Look into adding GraphQL into Redux

import React, { useEffect } from 'react';
import { Cart } from './features/cart/Cart';
import { Details } from './features/details/Details';
import { Header } from './features/header/Header';
import { Home } from './features/home/Home';
import { Footer } from './features/footer/Footer';
import ScrollToTop from './utils/ScrollToTop';
import { useDispatch } from 'react-redux';
import { fetchAsync } from './features/api/dataSlice';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsync())
  })
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/checkout">
            <h3>Checkout</h3>
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/details/:id">
            <Details />
          </Route>
          <Route path="/shop">
            <h3>Shop</h3>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
        <ScrollToTop />
      </Router>
    </div>
  );
}

export default App;
