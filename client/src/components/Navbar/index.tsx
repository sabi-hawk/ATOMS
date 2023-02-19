import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
//
import { setUser } from "../../flux/reducers/auth";
import { setChatsData } from "../../flux/reducers/chats";
import { logout } from "../../flux/reducers";
import useActions from "../../hooks";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../UserProfile";
function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setUser({}));
    dispatch(setChatsData({}));
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light app-nav">
      <a className="navbar-brand" href="/">
        <img className="header-logo" src={logo} alt="Logo" />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="/navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/demo">
              Demo
            </Link>
          </li>
          <li className="nav-item active dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="/"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Utils
            </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/">
                Action
              </a>
              <a className="dropdown-item" href="/">
                Another action
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="/">
                Something else here
              </a>
            </div>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-primary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
        <button
          className="btn btn-primary my-2 my-sm-0"
          type="button"
          onClick={handleLogout}
        >
          {" "}
          logout
        </button>
      </div>
      <div>
        <ProfileModal />
      </div>
    </nav>
  );
}

export default Navbar;
