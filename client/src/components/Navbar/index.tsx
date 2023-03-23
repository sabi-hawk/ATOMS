import React, { useEffect, useState } from "react";
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
import socket from "../../utils/socket";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    socket.emit("disconnected");
    dispatch(setUser({}));
    dispatch(setChatsData({}));
    dispatch(setTemplates({}));
    navigate("/");
  };
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(window.location.pathname);
  });
  // useEffect(() => {
  //   dispatch(setUser({}));
  //   dispatch(setChatsData({}));
  //   dispatch(setTemplates({}));
  //   navigate("/");
  // }, []);

  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion justify-content-between"
        id="accordionSidebar"
      >
        {/* Sidebar - Brand */}
        <div className="">
          <li className="nav-item mt-3 mb-4">
            <div className="dropdown avatar-main">
              {/* <p>{prettyName(user.name)}</p> */}
              <button
                className="avatar-btn"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={userAvatar} alt="Profile Avatar" />
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
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
            <ProfileModal />
          </li>

          <li className={`nav-item ${path === "/dashboard" ? "active" : ""}`}>
            <div className="tooltip">
              <Link className="nav-link w-100" to="/dashboard">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                <span className="tooltiptext">Dashboard</span>
              </Link>
            </div>
          </li>

          <li className={`nav-item ${path === "/chat" ? "active" : ""}`}>
            <div className="tooltip">
              <Link className="nav-link w-100" to="/chat">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>

                <span className="tooltiptext">Chat</span>
              </Link>
            </div>
          </li>
          {/* Nav Item - Utilities Collapse Menu */}
          <li
            className={`nav-item ${path === "/mail-templates" ? "active" : ""}`}
          >
            <div className="tooltip">
              <Link className="nav-link w-100" to="/mail-templates">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
                  />
                </svg>

                <span className="tooltiptext">Templates</span>
              </Link>
            </div>
          </li>

          <li className={`nav-item ${path === "/demo" ? "active" : ""}`}>
            <div className="tooltip">
              <Link className="nav-link w-100" to="/demo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <span className="tooltiptext">Demo</span>
              </Link>
            </div>
          </li>
        </div>
        <div className="nav-footer">
          <li className="nav-item">
            <div className="tooltip">
              <button
                onClick={handleLogout}
                className="dropdown-item nav-link w-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </button>
              <span className="tooltiptext">logout</span>
            </div>
          </li>
        </div>
      </ul>
      {/* End of Sidebar */}
    </>
  );
}

export default Navbar;
