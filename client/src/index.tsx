import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import StateProvider from "./providers/stateProvider";
import "./style.css";
// @ts-ignore
const appRoot = ReactDOM.createRoot(document.getElementById("root"));

appRoot.render(
  <StateProvider>
    <App />
  </StateProvider>
);
