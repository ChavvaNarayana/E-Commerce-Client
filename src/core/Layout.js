import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children, match, history }) => {
  const nav = () => (
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link to="/" className="nav-link" style={{ color: "#fff" }}>
          Home
        </Link>
      </li>
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
