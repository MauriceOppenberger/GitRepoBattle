import React from "react";
import { ThemeConsumer } from "../contexts/Theme";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import ThemeContext from "../contexts/ThemeContext";

const activeStyle = {
  color: "rgb(187,46,31)"
};
export default function Nav(props) {
  const { theme } = React.useContext(ThemeContext);
  return (
    <nav className="row space-between">
      <ul className="row nav">
        <li>
          <NavLink to="/" exact activeStyle={activeStyle} className="nav-link">
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink to="/battle" activeStyle={activeStyle} className="nav-link">
            Battle
          </NavLink>
        </li>
      </ul>
      <button
        className="btn-clear"
        style={{ fontSize: 30 }}
        onClick={props.toggleTheme}
      >
        {theme === "light" ? "🔦" : "💡"}
      </button>
    </nav>
  );
}
Nav.propTypes = {
  toggleTheme: PropTypes.func.isRequired
};
