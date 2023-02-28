import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
//
import { setUser } from "../../flux/reducers/auth";
import { setChatsData } from "../../flux/reducers/chats";
import { logout } from "../../flux/reducers";
import useActions from "../../hooks";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../UserProfile";
import { AtomState } from "../../flux/store";
// import { Button, Dropdown, Modal } from "react-bootstrap";
import userAvatar from "../../images/user.png";
import "./index.css";
import { setTemplates } from "../../flux/reducers/extras";
import { prettyName } from "../../utils";

function Navbar() {
  const {
    auth: { user },
  } = useSelector((state: AtomState) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    setShow(false);
    dispatch(setUser({}));
    dispatch(setChatsData({}));
    dispatch(setTemplates({}));
    navigate("/");
  };
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  return (
    <>
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
              <Link className="nav-link" to="/dashboard">
                Dashboard <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/chat">
                Chat
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/mail-templates">
                Templates
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/demo">
                Demo
              </Link>
            </li>
          </ul>
        </div>

        <div className="dropdown avatar-main">
          <p>{prettyName(user.name)}</p>
          <button
            className="avatar-btn"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src={userAvatar} alt="Profile Avatar" />
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li data-bs-toggle="modal" data-bs-target="#exampleModal">
              <button className="dropdown-item">Edit Profile</button>
            </li>
            <li>
              <hr className="dropdown-divider"></hr>
            </li>
            <li>
              <button onClick={handleLogout} className="dropdown-item">
                Logout
              </button>
            </li>
          </ul>
        </div>
        <ProfileModal setOpen={setShow} />
      </nav>
    </>
  );
}

{
  /* <li className="nav-item active dropdown">
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
          </li> */
}
export default Navbar;

{
  /* <button
                  className="btn btn-secondary btn-lg dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Edit Profile
                </button> */
}

{
  /* {user && (
        <> */
}
{
  /* <Dropdown>
            <Dropdown.Toggle
              variant="secondary"
              id="profile-dropdown"
              onClick={() => {
                setShow(true);
              }}
              className="btn-user-avatar"
            >
              <img src={userAvatar} alt="Profile Avatar" />
            </Dropdown.Toggle>
            <Dropdown.Menu show={show}>
              <Dropdown.Item>
                <ProfileModal setOpen={setShow} />
              </Dropdown.Item>
              <Dropdown.Item
                className="btn stn-secondary"
                onClick={handleLogout}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> 

        {/* <Button className="btn-user-avatar" onClick={handleShow}>
            <img src={userAvatar} alt="" />
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header
              closeButton
            >{`${user.name.first} ${user.name.last}`}</Modal.Header>
            <Modal.Body>
              <div>
                <ProfileModal setOpen={setShow} />

                <Button
                  className="btn btn-primary my-2 my-sm-0"
                  type="button"
                  onClick={handleLogout}
                >
                  {" "}
                  logout
                </Button>
              </div>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal> */
}
{
  /* </> */
}
{
  /* )} */
}
