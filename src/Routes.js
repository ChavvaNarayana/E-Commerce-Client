import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./App";
import Signup from "./Auth/Signup";
import Signin from "./Auth/Signin";
import Cart from "./Pages/Cart"
import Wishlist from "./Pages/Wishlist"
const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={App} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/signin" exact component={Signin} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/wishlist" exact component={Wishlist} />
    </BrowserRouter>
  );
};

export default Routes;
