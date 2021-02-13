import React from "react";
import PropTypes from "prop-types";
import "./Header.css";

const Header = ({ children }) => {
  return (
    <header className="Header">
      <div className="Header-wrapper">
        <div className="Header-content">{children}</div>
      </div>
    </header>
  );
};

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
