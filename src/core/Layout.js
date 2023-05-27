import React from "react";
import { Link } from "react-router-dom";
import { isAuth, signout } from "../auth/helpers";

const Layout = ({ children, match, history }) => {
  const nav = () => (
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link to="/" className="nav-link" style={{ color: "#fff" }}>
          Home
        </Link>
      </li>

      {!isAuth() && (
        <>
          <li className="nav-item">
            <Link to="/signin" className="nav-link" style={{ color: "#fff" }}>
              Signin
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link" style={{ color: "#fff" }}>
              Signup
            </Link>
          </li>
        </>
      )}

      {isAuth() && (
        <>
          <li className="nav-item">
            <Link to="/cart" className="nav-link" style={{ color: "#fff" }}>
              Cart
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/wishlist" className="nav-link" style={{ color: "#fff" }}>
              Wishlist
            </Link>
          </li>
          <li className="nav-item">
            <span
              className="nav-link"
              style={{ cursor: "pointer", color: "#fff" }}
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              Signout
            </span>
          </li>
        </>
      )}
    </ul>
  );

  return (
    <>
      {nav()}
      <div className="container">{children}</div>
    </>
  );
};

export default Layout;
