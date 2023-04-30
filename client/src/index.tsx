import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import StateProvider from "./providers/stateProvider";
import { PersistGate } from "redux-persist/integration/react";
import "./style.css";
import { persister } from "./flux/store";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
// @ts-ignore
const appRoot = ReactDOM.createRoot(document.getElementById("root"));

appRoot.render(
  <StateProvider>
    <PersistGate persistor={persister}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </PersistGate>
  </StateProvider>
);
