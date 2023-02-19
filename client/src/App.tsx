import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import memories from "./images/memories.jpg";
import useStyles from "./style";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./flux/reducers/posts/index";
import { fetchPosts } from "./api";
import { extractEmails } from "./api/python";
import { getEmailRecords } from "./flux/reducers/scrappedData";
import Demo from "./components/Demo";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes, // Switch
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Composer from "./allPages/composer";
import Chat from "./allPages/chat";
import Authentication from "./allPages/auth";
import { AtomState } from "./flux/store";
import path from "path";
import ClientAuthentication from "./allPages/client/auth";

const App = () => {
  const user = useSelector((state: AtomState) => state?.auth?.user);

  if (user) {
    if (!user.isClient) {
      return (
        <>
          <div className="main">
            <Navbar />
            <div className="blur" style={{ top: "-18%", right: "0" }}></div>
            <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
            <Routes>
              <Route
                path="/"
                element={
                  user ? <Navigate to="dashboard" /> : <Navigate to="auth" />
                }
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="../auth" />}
              />
              <Route
                path="/auth"
                element={
                  user ? <Navigate to="../dashboard" /> : <Authentication />
                }
              />
              <Route
                path="/mail-templates"
                element={user ? <Composer /> : <Navigate to="../auth" />}
              />
              <Route
                path="/about"
                element={user ? <About /> : <Navigate to="../auth" />}
              />
              <Route
                path="/demo"
                element={user ? <Demo /> : <Navigate to="../auth" />}
              />
              <Route
                path="/chat"
                element={user ? <Chat /> : <Navigate to="../auth" />}
              />
            </Routes>
          </div>

          <ToastContainer />
        </>
      );
    }

    // for client
    return (
      <>
        <div className="main">
          <Navbar />
          <div className="blur" style={{ top: "-18%", right: "0" }}></div>
          <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
          <Routes>
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>

        <ToastContainer />
      </>
    );
  }

  return (
    <>
      <div className="main">
        <Navbar />
        <div className="blur" style={{ top: "-18%", right: "0" }}></div>
        <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<Authentication />} />
          <Route
            path="/provider/:provider_id/chat"
            element={<ClientAuthentication />}
          />
        </Routes>
      </div>

      <ToastContainer />
    </>
  );
};
export default App;
// http://localhost:3000/provider/63ecf7d9a557f89d27373622/chat
{
  /* <Route path="/" element={<Authentication />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/mail-templates" element={<Composer />} />
              <Route path="/about" element={<About />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/chat" element={<Chat />} /> */
}
