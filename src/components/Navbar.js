import { Button } from "evergreen-ui";
import { useState } from "react";
import { Link } from "react-router-dom";
import hamburger from "../assets/hamburger.png";
import logo from "../assets/logo.png";

import "../styles/Navbar.css";

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navigation">
      <Link to="/">
        <img className="brand" src={logo} alt="logo" />
      </Link>

      <img
        className="hamburger"
        src={hamburger}
        alt="menu"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      />
      <div className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/">Contact</Link>
          </li>
          <li>
            <Link to="/signin">
              <Button id="cta" intent="success" size="large">
                Sign In
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
